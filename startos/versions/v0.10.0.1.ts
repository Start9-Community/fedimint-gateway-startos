import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_10_0_1 = VersionInfo.of({
  version: '0.10.0:1',
  releaseNotes: {
    en_US: 'Initial StartOS release of Fedimint Gateway v0.10.0',
    es_ES: 'Versión inicial de StartOS de Fedimint Gateway v0.10.0',
    de_DE: 'Erste StartOS-Veröffentlichung von Fedimint Gateway v0.10.0',
    pl_PL: 'Pierwsze wydanie Fedimint Gateway v0.10.0 dla StartOS',
    fr_FR: 'Version initiale de Fedimint Gateway v0.10.0 pour StartOS',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
