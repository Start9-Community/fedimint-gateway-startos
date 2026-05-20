# Updating the upstream version

The `gatewayd` image is built locally from `Dockerfile`, which extends the upstream `fedimint/gatewayd` Docker Hub image with the workarounds documented in `CLAUDE.md`. There is no `dockerTag` in the manifest — the upstream tag is pinned in the `FROM` line of the `Dockerfile`.

## Determining the upstream version

- **Fedimint Gateway** ([fedimint/fedimint](https://github.com/fedimint/fedimint)) — source repo for `gatewayd`.

  ```
  gh release view -R fedimint/fedimint --json tagName -q .tagName
  ```

  Pin lives in `Dockerfile` (`FROM fedimint/gatewayd:v<version>`).

- **Docker Hub image** ([fedimint/gatewayd](https://hub.docker.com/r/fedimint/gatewayd)) — confirm the matching tag has been published before bumping the `FROM` line:

  ```
  curl -fsSL "https://hub.docker.com/v2/repositories/fedimint/gatewayd/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  Look for a `v<version>` tag matching the GitHub release.

## Applying the bump

1. **`Dockerfile`** — bump the `FROM fedimint/gatewayd:v<version>` line to the new upstream tag.
2. **Re-verify the Nix workarounds** in `CLAUDE.md` still apply — upstream may eventually move off Nix and remove the need for the `/etc/passwd`, `/etc/group`, `/etc/nsswitch.conf` materialization and the `ENV` stub.
