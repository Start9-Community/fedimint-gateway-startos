# Fedimint Gateway

Your choice of Lightning backend (integrated LDK vs. a local LND node) is permanent — switching later orphans any channels and federation registrations the gateway already holds. Pick deliberately before you start the service.

## Documentation

- [Fedimint project site](https://fedimint.org) — upstream homepage, with links to the gateway and federation documentation.

## What you get on StartOS

- A **Gateway Interface** — the gatewayd dashboard and admin API, used to join federations, manage channels and balances, and view payment history.
- An optional **LDK Peer Interface** — only exposed when you choose the integrated LDK backend; this is the port remote Lightning peers use to open inbound channels.
- A choice of Lightning backend: **LDK** (an integrated Lightning node, no extra service needed) or **LND** (your existing LND service on StartOS).
- A choice of Bitcoin backend: a **local Bitcoin Core node** (recommended, fully self-hosted) or a public **Esplora API** URL.
- A randomly generated admin password, shown to you once when you create it.

## Getting set up

After install, the gateway posts three critical tasks. Run them in this order:

1. **Create your Gateway admin password.** Run the *Create Password* task. A strong random password is generated for you and shown once — save it to a password manager before dismissing.
2. **Choose your Lightning backend.** Run the *Lightning Configuration* task and pick either:
   - **LDK (Integrated)** — runs a Lightning node inside the gateway. Set the public node alias (default: *Fedimint LDK Gateway*).
   - **Local LND node** — uses the LND service from the StartOS marketplace. Install **LND** first if you haven't already.

   This choice is permanent for the lifetime of the install.
3. **Choose your Bitcoin backend.** Run the *Bitcoin Configuration* task and pick either:
   - **Local node (recommended)** — uses the Bitcoin Core service. Install **Bitcoin Core** first if you haven't already.
   - **Esplora** — paste a full Esplora API URL (defaults to `https://mempool.space/api`). Note that this leaks transaction-level metadata to the operator of that API.
4. Start the service and open the **Gateway Interface** to log in with your admin password.

## Using Fedimint Gateway

### Gateway Interface

Open the **Gateway Interface** and log in with the admin password from setup. From the dashboard you can join Fedimint federations, manage Lightning channel liquidity, view balances and payment history, and configure routing fees. The gateway earns fees by routing Lightning payments in and out of the federations it has joined.

If you chose the LDK backend, open inbound channels by having peers connect to your **LDK Peer Interface** address. If you chose LND, channel management is done in your existing LND service — the gateway uses LND for all Lightning operations.

### Actions

- **Bitcoin Configuration** — change the Bitcoin backend (between local Bitcoin Core and an Esplora URL, or update the Esplora URL itself). Safe to run at any time.
- **Reset Password** — generate a new random admin password. Use this if the current password is lost or you want to rotate it.
