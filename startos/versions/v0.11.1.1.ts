import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_11_1_1 = VersionInfo.of({
  version: '0.11.1:1',
  releaseNotes: {
    en_US: `- Fixes the Lightning backend being impossible to configure after install: the Lightning Configuration action is reachable until a backend is chosen (then locked), and missing-backend setup tasks are recreated on every init rather than only on a fresh install.
- Imports the Lightning and Bitcoin backend selection from a StartOS 0.3.5 install on first launch, so upgrading gateways no longer reset to an unconfigured state.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
