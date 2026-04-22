import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_10_0_1_b0 = VersionInfo.of({
  version: '0.10.0:1-beta.0',
  releaseNotes: {
    en_US: 'Initial StartOS release of Fedimint Gateway v0.10.0',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
