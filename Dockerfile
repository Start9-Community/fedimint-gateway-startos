FROM fedimint/gatewayd:v0.10.0

# Workaround 1: the upstream Nix-built image has /etc/passwd, /etc/group, and
# /etc/nsswitch.conf as symlinks into the /nix/store. StartOS's SubContainer
# fails to resolve these symlinks at runtime, so gatewayd's getpwuid/
# getpwnam calls crash with `open r /etc/passwd: No such file or directory`.
# Materialize the targets as regular files to fix lookups.
RUN bash -c 'set -e; for f in passwd group nsswitch.conf; do cp -L /etc/$f /etc/$f.real; rm /etc/$f; mv /etc/$f.real /etc/$f; done'

# Workaround 2: the upstream image has Config.Env = null, which breaks
# `start-cli s9pk pack` (expects an array). Setting any ENV here forces
# Env to be a non-null array. The actual daemon env is provided by main.ts
# at runtime.
ENV FM_GATEWAY_DATA_DIR=/gatewayd
