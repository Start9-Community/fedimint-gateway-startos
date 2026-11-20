# Fedimint Gateway

Your choice of Lightning backend (integrated LDK vs. a local LND node) is permanent — switching later orphans any channels and federation registrations the gateway already holds. Pick deliberately before you start the service.

## Documentation

- [Fedimint project site](https://fedimint.org) — upstream homepage, with links to the gateway and federation documentation.

## What you get on StartOS

- A **Gateway Interface** — the gatewayd dashboard and admin API, used to join federations, manage channels and balances, and view payment history.
- An optional **LDK Peer Interface** — only exposed when you choose the integrated LDK backend; this is the port remote Lightning peers use to open inbound channels.
- A choice of Lightning backend: **LDK** (an integrated Lightning node, no extra service needed) or **LND** (your existing LND service on StartOS).
- A choice of Bitcoin backend: a **local Bitcoin node** (recommended, fully self-hosted) or a public **Esplora API** URL.
- A randomly generated admin password, shown to you once when you create it.

## Getting set up

After install, the gateway posts three critical tasks. Run them in this order:

1. **Create your Gateway admin password.** Run the _Create Password_ task. A strong random password is generated for you and shown once — save it to a password manager before dismissing.
2. **Choose your Lightning backend.** Run the _Lightning Configuration_ task and pick either:
   - **LDK (Integrated)** — runs a Lightning node inside the gateway. Set the public node alias (default: _Fedimint LDK Gateway_).
   - **Local LND node** — uses the LND service from the StartOS marketplace. Install **LND** first if you haven't already.

   This choice is permanent for the lifetime of the install.

3. **Choose your Bitcoin backend.** Run the _Bitcoin Configuration_ task and pick either:
   - **Local node (recommended)** — uses the Bitcoin service. Install **Bitcoin** first if you haven't already.
   - **Esplora** — paste a full Esplora API URL (defaults to `https://mempool.space/api`). Note that this leaks transaction-level metadata to the operator of that API.
4. Start the service, open the **Gateway Interface**, and log in with your admin password. Choose **Create Wallet** for a new gateway, or **Recover Wallet** to restore one (see [Recovering the gateway](#recovering-the-gateway)).
5. **Write down the gateway's 12-word secret phrase right away.** On the dashboard, the **Gateway Secret Phrase** card shows it once you enter your admin password. Keep it offline and private: anyone holding it can take the gateway's funds. StartOS backups do not include the gateway, so this phrase is the only way to recover it.

## Using Fedimint Gateway

### Gateway Interface

Open the **Gateway Interface** and log in with the admin password from setup. From the dashboard you can join Fedimint federations, manage Lightning channel liquidity, view balances and payment history, and configure routing fees. The gateway earns fees by routing Lightning payments in and out of the federations it has joined.

If you chose the LDK backend, open inbound channels by having peers connect to your **LDK Peer Interface** address. Use one of its IPv4 addresses: the LDK node does not accept connections on the IPv6 addresses the interface lists. If you chose LND, channel management is done in your existing LND service — the gateway uses LND for all Lightning operations.

### Recovering the gateway

StartOS backups do not include Fedimint Gateway: restoring old Lightning channel state can lose funds, so nothing is backed up. What brings the gateway back is the 12-word secret phrase you wrote down at setup. After joining federations, also use **Export Invite Codes** on the dashboard and keep the file; it lets you re-join all of them at once.

To recover, on a fresh install of Fedimint Gateway:

1. Complete the three setup tasks again, choosing the same Lightning and Bitcoin backends as before.
2. Start the service, open the **Gateway Interface**, log in, and choose **Recover Wallet**. Enter your 12 words.
3. Re-join each federation you were connected to: paste its invite code with **Recover** checked, or use **Recover from File** with your exported invite codes. This brings back the gateway's ecash in that federation. Recovery can take a while per federation.

What the phrase does and does not recover:

- **Ecash in federations:** recovered, once you re-join each federation with **Recover**.
- **LDK on-chain balance:** recovered; it comes from the same phrase.
- **LDK channel balances: may not be recoverable.** Channel state lives only on this gateway's own storage and is in no backup or phrase. Close your channels before you uninstall, move or rebuild the gateway, so their funds return on-chain where the phrase can recover them.
- **With LND as the backend,** your Lightning funds belong to LND and are recovered through LND's own backup, not this phrase.

### Actions

- **Bitcoin Configuration** — change the Bitcoin backend (between local Bitcoin and an Esplora URL, or update the Esplora URL itself). Safe to run at any time.
- **Reset Password** — generate a new random admin password. Use this if the current password is lost or you want to rotate it. It asks for confirmation first, since the current password stops working.
