import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_11_1_2 = VersionInfo.of({
  version: '0.11.1:2',
  releaseNotes: {
    en_US: `- Fixes a failed init ("write after const") when importing the StartOS 0.3.5 backend config. The 0.3.5 import now reads the store with a one-shot read before writing.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
