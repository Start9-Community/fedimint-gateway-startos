import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_11_1 = VersionInfo.of({
  version: '0.11.1:0',
  releaseNotes: {
    en_US: `- Bumps Fedimint Gateway → 0.11.1 (Mint Condition)
- Internal updates (start-sdk 1.5.2)`,
    es_ES: `- Actualiza Fedimint Gateway → 0.11.1 (Mint Condition)
- Actualizaciones internas (start-sdk 1.5.2)`,
    de_DE: `- Aktualisiert Fedimint Gateway → 0.11.1 (Mint Condition)
- Interne Aktualisierungen (start-sdk 1.5.2)`,
    pl_PL: `- Aktualizuje Fedimint Gateway → 0.11.1 (Mint Condition)
- Aktualizacje wewnętrzne (start-sdk 1.5.2)`,
    fr_FR: `- Met à jour Fedimint Gateway → 0.11.1 (Mint Condition)
- Mises à jour internes (start-sdk 1.5.2)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
