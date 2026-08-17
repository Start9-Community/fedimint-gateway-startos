# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Three names, none of which match: the package id is `fedimint-gatewayd`, the npm package is `gatewayd-startos`, the repo is `fedimint-gateway-startos`.** Intentional — don't "reconcile" them.
- **The backend fields must keep having no `.catch` default.** Dependencies are derived from them, so a default would make LND or Bitcoin appear as a dependency of a gateway the user has not configured yet, demanding they install something they may not want.
- **`ssl: false` on bitcoind's RPC, and nothing on lnd's gRPC.** bitcoind's RPC binding publishes a plaintext _and_ a TLS bridge address; lnd's gRPC publishes one, and would resolve `null` under `ssl: false`. Host ids come from `bitcoin-core-startos/startos/utils` and `lnd-startos/startos/interfaces` — never hardcode a hostname.
- **Throwing when an address or cookie does not resolve is deliberate.** A gateway that starts with a half-configured backend is worse than one that refuses to start and says which piece is missing.
- **The Lightning backend is a `gatewayd` subcommand, not a config value** — hence `only-stopped` on that action. Switching it does not migrate channels.
- **`peer` is exported only on the LDK backend.** On LND there is no local Lightning node to open channels against, so the interface would be an address that answers nothing.
