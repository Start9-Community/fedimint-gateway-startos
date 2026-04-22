## How the upstream version is pulled
- `FROM` line in `Dockerfile`: `fedimint/gatewayd:v<version>`

## Why the Dockerfile uses `dockerBuild` (not `dockerTag`)
- The upstream image has `Config.Env = null`, which breaks `start-cli s9pk pack` (it expects an array). The Dockerfile's `ENV FM_GATEWAY_DATA_DIR=/gatewayd` line forces `Env` to be a non-null array. The actual daemon env is supplied by `main.ts` at runtime.
- The Dockerfile also materializes `/etc/passwd`, `/etc/group`, and `/etc/nsswitch.conf` from `/nix/store` symlinks to regular files — StartOS's SubContainer can't resolve those symlinks, and `getpwuid_r`/`getpwnam_r` calls (from `pwd-grp` via `fs-mistrust` via `arti-client`) would otherwise crash with `open r /etc/passwd: No such file or directory`. `FS_MISTRUST_DISABLE_PERMISSIONS_CHECKS=true` is also set in the daemon env as defense-in-depth.

## Iroh listen port
- `FM_GATEWAY_IROH_LISTEN_ADDR=0.0.0.0:8177` is set but not exposed as a StartOS interface. Iroh uses QUIC-over-UDP with public relays + NAT hole-punching, so it works without externally-reachable inbound. Binding 0.0.0.0 only affects intra-container reachability.

## LDK peer port (conditional interface)
- When `lightningBackend.type === 'ldk'`, `interfaces.ts` exposes the `peer` interface bound to `ldkPort` (10010) so the integrated LDK node can accept inbound Lightning channels. When the user selects LND instead, no peer interface is exported.
