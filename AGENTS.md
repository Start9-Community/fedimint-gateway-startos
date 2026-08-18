# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **Three names, none of which match: the package id is `fedimint-gatewayd`, the npm package is `gatewayd-startos`, the repo is `fedimint-gateway-startos`.** Intentional — don't "reconcile" them.
- **The backend fields must keep having no `.catch` default.** Dependencies are derived from them, so a default would make LND or Bitcoin appear as a dependency of a gateway the user has not configured yet, demanding they install something they may not want.
- **`ssl: false` on bitcoind's RPC, and nothing on lnd's gRPC.** bitcoind's RPC binding publishes a plaintext _and_ a TLS bridge address; lnd's gRPC publishes one, and would resolve `null` under `ssl: false`. Host ids come from `bitcoin-core-startos/startos/utils` and `lnd-startos/startos/interfaces` — never hardcode a hostname.
- **Throwing when an address or cookie does not resolve is deliberate.** A gateway that starts with a half-configured backend is worse than one that refuses to start and says which piece is missing.
- **The Lightning backend is a `gatewayd` subcommand, not a config value** — hence `only-stopped` on that action. Switching it does not migrate channels.
- **`peer` is exported only on the LDK backend.** On LND there is no local Lightning node to open channels against, so the interface would be an address that answers nothing.
