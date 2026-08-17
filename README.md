<p align="center">
  <img src="icon.png" alt="Fedimint Gateway Logo" width="21%">
</p>

# Fedimint Gateway on StartOS

> Everything not listed in this document should behave the same as upstream
> Fedimint Gateway. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Fedimint](https://github.com/fedimint/fedimint)'s gateway bridges Lightning and a federation's ecash: it takes Lightning payments in and out on behalf of federation members. This package lets you choose what it uses underneath — an integrated Lightning node or your own LND, your own Bitcoin node or a remote Esplora — and declares only the dependencies your choice actually needs.

- **Upstream repo:** <https://github.com/fedimint/fedimint>
- **Wrapper repo:** <https://github.com/Start9-Community/fedimint-gateway-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One image, built here from upstream source.

| Property      | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| Image         | Built from this repo's `Dockerfile`                           |
| Architectures | x86_64, aarch64                                               |
| Command       | `gatewayd`, given the selected Lightning mode as its argument |

| Subcontainer   | Purpose                                  |
| -------------- | ---------------------------------------- |
| `gatewayd-sub` | The only daemon — the one to `attach` to |

**The Lightning backend is a command-line mode, not a setting the daemon reads.** The package passes `ldk` or `lnd` as an argument, so switching backends is a different invocation of the same binary rather than a configuration change — which is why that choice requires the service to be stopped.

## Volume and Data Layout

Two volumes, and what is _not_ backed up is the significant part.

| Volume                | Mount Point    | Purpose                                            |
| --------------------- | -------------- | -------------------------------------------------- |
| `main`                | —              | The package store                                  |
| `gatewayd`            | `/gatewayd`    | The gateway's own state, including LDK's           |
| Bitcoin's `main` (ro) | `/mnt/bitcoin` | The RPC cookie — only when using a local node      |
| LND's `main` (ro)     | `/mnt/lnd`     | TLS certificate and macaroon — only when using LND |

The two dependency mounts are **conditional**: they are added only when the corresponding backend is selected, so a gateway running on LDK and Esplora mounts neither.

**`/gatewayd` holds Lightning channel state when running on LDK**, which is why nothing here is backed up — see [Backups and Restore](#backups-and-restore).

## File Models

One model, holding three choices.

| File         | Format | Modelled                | Written by           |
| ------------ | ------ | ----------------------- | -------------------- |
| `store.json` | JSON   | Yes — `FileHelper.json` | Init and the actions |

- **`lightningBackend`** — LDK with an alias, or LND. **Deliberately has no default**, and stays undefined until the user chooses.
- **`bitcoinBackend`** — a local Bitcoin node, or an Esplora URL. Same: no default.
- **`passwordHash`** — the admin password, stored only as a bcrypt hash.

**The absent defaults are the design, not an oversight.** The declared dependencies are derived from these fields, so defaulting either one would make LND or Bitcoin show up as a dependency of a gateway the user has not yet configured — demanding they install a service they may not want.

All three are read reactively, so a change restarts the gateway with the new wiring.

Everything the gateway itself persists — federation registrations, LDK's channel state — is its own, under its volume, and is not modelled.

## Dependencies

Two are declared optional, and **whether either is required is entirely a function of your choices**.

| Dependency | Required when                       | Health checks required      |
| ---------- | ----------------------------------- | --------------------------- |
| Bitcoin    | The Bitcoin backend is a local node | `bitcoind`, `sync-progress` |
| LND        | The Lightning backend is LND        | `sync-progress`             |

Choose Esplora and LDK, and this package has no dependencies at all — it runs against a remote block source with its own integrated Lightning node.

**A local Bitcoin node needs its wallet RPC enabled**, and the package raises a recurring task for it on Bitcoin's own page. It is recurring rather than one-time, so turning the setting back off brings the task back.

**Both backends' addresses are resolved over the internal bridge**, and both are strict: if the address does not resolve, the service **refuses to start** with an explanatory error rather than coming up misconfigured. The Bitcoin RPC lookup pins the plaintext leg, since that binding publishes both.

**Bitcoin's cookie is read directly and watched**, so the gateway restarts when Bitcoin rotates it. A missing or malformed cookie is a hard error, not a fallback.

## Network Access and Interfaces

One interface always, and a second only in one configuration.

| Interface          | Id     | Type | Port  | Description                                | When         |
| ------------------ | ------ | ---- | ----- | ------------------------------------------ | ------------ |
| Gateway Interface  | `ui`   | ui   | 8176  | The gateway dashboard and its API          | Always       |
| LDK Peer Interface | `peer` | p2p  | 10010 | Inbound Lightning channels to the LDK node | **LDK only** |

**The peer interface exists only when the Lightning backend is LDK**, because only then is there a Lightning node here to open channels against. On LND, channels belong to LND and are reached at LND's own peer address — so the interface is not merely unused, it is not exported at all.

The gateway also binds an internal port for its peer-to-peer transport, which is not exported.

## Installation and First-Run Flow

Install seeds an empty store and raises **three** critical tasks. The service cannot start until all three are done, and that is deliberate: there is no default that would be right for everyone.

1. **Choose a Lightning backend** — the integrated LDK node, or your LND.
2. **Choose a Bitcoin backend** — your own node, or a remote Esplora.
3. **Set the admin password.**

The password task is **reactive** — raised on any init that finds no password — while the two backend tasks are raised on install only. If a backend selection were somehow cleared, the service would refuse to start rather than prompt.

**The choice between LDK and LND is the consequential one.** LDK gives the gateway its own Lightning node, with its own channels, its own peer address, and its own funds to manage. LND puts the gateway in front of a node you already run. They are not interchangeable after the fact — see [Limitations](#limitations-and-differences).

## Actions

Three actions.

### Lightning Configuration — hidden

**Not user-facing in the Actions list.** It is `visibility: 'hidden'` and reachable only through the critical task that raises it, so a user is never told to go and find it.

- **When to run it:** only while stopped — the selection is a command-line mode, applied at start.
- **What it changes:** the Lightning backend in the store, and with it the LND dependency, the peer interface, and how the daemon is invoked.
- **Repeat safety:** idempotent as a setting, but **switching backends does not migrate anything**. LDK's channels are not LND's.
- **On LDK it also takes the node alias**, which is what other Lightning nodes will see.

### Bitcoin Configuration

Chooses a local Bitcoin node or a remote Esplora endpoint.

- **When to run it:** any status, though the change applies on restart.
- **What it changes:** the Bitcoin backend in the store, the Bitcoin dependency, and whether the autoconfig task exists.
- **Repeat safety:** idempotent; switching is a genuine swap, since neither holds state.
- **Esplora is a remote service**, so choosing it means block data comes from a third party rather than from your own node.

### Reset Password

Sets the gateway's admin password.

- **When to run it:** **only while stopped** — the hash is read into the daemon's environment at start.
- **What it changes:** the stored hash. Only a bcrypt hash is kept; the plaintext is not.
- **Repeat safety:** each run replaces the password.

## Tasks

Three, all `critical`.

| Task                     | Severity   | Raised when                           | Cleared when       |
| ------------------------ | ---------- | ------------------------------------- | ------------------ |
| Lightning Configuration  | `critical` | At install                            | The action runs    |
| Bitcoin Configuration    | `critical` | At install                            | The action runs    |
| Reset Password           | `critical` | Any init that finds no password       | The action runs    |
| Bitcoin's Auto-Configure | `critical` | Using a local node without wallet RPC | Bitcoin is changed |

The last appears on **Bitcoin's** page, raised by this package, with nothing there explaining which service asked for it. It is recurring.

`critical` blocks the service from starting and suspends the ordinary controls, so a fresh install shows only its tasks.

## Health Checks

One check, on the only daemon.

| Check      | Displayed as        | Method                 |
| ---------- | ------------------- | ---------------------- |
| `gatewayd` | "Gateway Interface" | Port 8176 is listening |

It reports that the dashboard is serving. It says nothing about whether the gateway is registered with a federation, whether its Lightning backend has channels, or whether it has liquidity — all of which are visible in the dashboard itself.

A service that will not start at all, with no failing check, is most likely a backend address that did not resolve; the error names which one.

## Backups and Restore

**Nothing is backed up, deliberately.** The package declares no volumes for backup at all.

This is a considered refusal rather than an omission. On LDK, `/gatewayd` holds Lightning **channel monitors**, and restoring stale channel state is how a node gets penalised and loses funds — a backup that is safe to take is not safe to restore. Federation registrations are equally cheap to recreate.

So the recovery story is reconfiguration, not restore: choose the backends again, set a password, re-register with federations. On LDK, treat channel funds as at risk from a rebuild the same way you would for any Lightning node without a working backup — close channels before rebuilding if you can.

## Limitations and Differences

1. **No backups at all**, by design — restoring LDK channel state risks penalty closes.
2. **Switching Lightning backends is not a migration.** LDK's channels do not become LND's.
3. **Three tasks must be completed before the service will start.** There are no defaults.
4. **The Lightning backend can only be changed while stopped**, because it is a command-line mode.
5. **The peer interface exists only on LDK.** On LND there is nothing here to connect to.
6. **Esplora is a third party.** Choosing it sends your block queries off the box.
7. **Mainnet only.** The network is fixed in the package.

---

## Quick Reference for AI Consumers

```yaml
package_id: fedimint-gatewayd # note: the repo is fedimint-gateway-startos
image: built from ./Dockerfile
architectures:
  - x86_64
  - aarch64
subcontainers:
  - gatewayd-sub
volumes:
  main: package store only
  gatewayd: /gatewayd # gateway state, including LDK channel monitors
file_models:
  - store.json
startos_managed_env_vars:
  - FM_GATEWAY_DATA_DIR
  - FM_GATEWAY_NETWORK
  - FM_GATEWAY_LISTEN_ADDR
  - FM_GATEWAY_IROH_LISTEN_ADDR
  - FM_GATEWAY_BCRYPT_PASSWORD_HASH
  - FM_BITCOIND_URL # local-node backend only
  - FM_BITCOIND_USERNAME # from bitcoind's cookie
  - FM_BITCOIND_PASSWORD # from bitcoind's cookie
  - FM_ESPLORA_URL # esplora backend only
  - FM_LND_RPC_ADDR # lnd backend only
  - FM_LND_TLS_CERT
  - FM_LND_MACAROON
  - FM_LDK_ALIAS # ldk backend only
  - FM_PORT_LDK
dependencies:
  - bitcoind # required only when the bitcoin backend is a local node
  - lnd # required only when the lightning backend is lnd
interfaces:
  ui: { type: ui, port: 8176 }
  peer: { type: p2p, port: 10010 } # exported only on the LDK backend
actions:
  - config-lightning # hidden; raised by task only; only-stopped
  - config-bitcoin
  - reset-password # only-stopped
tasks:
  - { action: config-lightning, severity: critical } # install only
  - { action: config-bitcoin, severity: critical } # install only
  - { action: reset-password, severity: critical } # reactive
  - { action: 'bitcoind:autoconfig', severity: critical } # on Bitcoin's page, recurring
health_checks:
  - gatewayd # displayed "Gateway Interface"
```
