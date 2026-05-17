# CLAUDE.md

See [CONTRIBUTING.md](CONTRIBUTING.md) for the doc map and contribution workflow.

## Operating rules

Two fixes sit on top of upstream's Nix-built `fedimint/gatewayd` image. Re-verify both whenever the `Dockerfile` `FROM` version is bumped — if upstream ever switches off Nix, they may become unnecessary.

- **Force `Config.Env` to a non-null array.** Upstream's image has `Config.Env = null`, which breaks `start-cli s9pk pack` (it expects an array). The `ENV FM_GATEWAY_DATA_DIR=/gatewayd` line in `Dockerfile` is only there to populate `Env`; the daemon's actual env is built in `startos/main.ts` at runtime.
- **Materialize `/etc/passwd`, `/etc/group`, `/etc/nsswitch.conf`.** These ship as `/nix/store` symlinks in the upstream image. StartOS's SubContainer can't resolve them at runtime, so `getpwuid_r`/`getpwnam_r` calls (from `pwd-grp` → `fs-mistrust` → `arti-client`) crash with `open r /etc/passwd: No such file or directory`. `FS_MISTRUST_DISABLE_PERMISSIONS_CHECKS=true` is also set in the daemon env as belt-and-suspenders.

The image is built locally (`source: { dockerBuild: {} }`) — there is no `dockerTag` in the manifest because these workarounds require the build step.
