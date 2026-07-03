# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `fedimint-gatewayd`.** The npm package name is `gatewayd-startos` and the repo is `fedimint-gateway-startos` — this three-way naming mismatch is intentional; don't "reconcile" it.
- **Backends are user-selected and stored in `store.json`.** Bitcoin backend is either bitcoind or an external Esplora API; Lightning backend is either the integrated LDK node or an external LND. The `config-bitcoin` / `config-lightning` actions write the choice, which in turn drives the optional `bitcoind` / `lnd` dependencies and the daemon env in `main.ts`.
- **bitcoind and lnd are reached over the LXC bridge, not `.startos` DNS.** `main.ts` resolves their RPC/gRPC addresses with `sdk.host.get(...)` using host ids imported from `bitcoin-core-startos/startos/utils` (`rpcHostId`) and `lnd-startos/startos/interfaces` (`gRPCHostId`) — never hardcode hostnames. Dependency package ids are `bitcoind` and `lnd`.
- **Interfaces:** `ui` (dashboard + API) is always exported; `peer` (LDK p2p) is exported only when the LDK Lightning backend is selected.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach fedimint-gatewayd -n gatewayd -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `gatewayd-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
