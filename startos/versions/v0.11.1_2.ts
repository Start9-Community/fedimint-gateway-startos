import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile } from 'fs/promises'
import { storeJson } from '../fileModels/store'
import { DEFAULT_LDK_ALIAS } from '../utils'

// StartOS 0.3.5 wrote the embassy config here, inside the `main` volume. The
// gateway's package id is unchanged across the 0.4.0 migration, so this file is
// carried over and we adopt the user's previous Lightning/Bitcoin choice.
const OLD_CONFIG = '/media/startos/volumes/main/start9/config.yaml'

type OldConfig = {
  'gatewayd-lightning-backend'?: {
    'backend-type'?: 'ldk' | 'lnd'
    alias?: string
  }
  'gatewayd-bitcoin-backend'?: {
    'backend-type'?: 'bitcoind' | 'esplora'
    url?: string
  }
}

export const v_0_11_1_2 = VersionInfo.of({
  version: '0.11.1:2',
  releaseNotes: {
    en_US: 'Internal updates (start-sdk 2.0.x)',
    es_ES: 'Actualizaciones internas (start-sdk 2.0.x)',
    de_DE: 'Interne Aktualisierungen (start-sdk 2.0.x)',
    pl_PL: 'Aktualizacje wewnętrzne (start-sdk 2.0.x)',
    fr_FR: 'Mises à jour internes (start-sdk 2.0.x)',
  },
  migrations: {
    // Upgrading from a StartOS 0.3.5 install: carry the user's previous
    // Lightning and Bitcoin backend selection over from the old embassy
    // config.yaml so the gateway starts configured instead of stranded with no
    // backend set.
    up: async ({ effects }) => {
      const oldConfig: OldConfig | undefined = await readFile(
        OLD_CONFIG,
        'utf-8',
      ).then(YAML.parse, () => undefined)
      if (!oldConfig) return

      const lb = oldConfig['gatewayd-lightning-backend']
      const lightningBackend =
        lb?.['backend-type'] === 'lnd'
          ? { type: 'lnd' as const }
          : lb?.['backend-type'] === 'ldk'
            ? { type: 'ldk' as const, alias: lb.alias ?? DEFAULT_LDK_ALIAS }
            : undefined
      if (lightningBackend) await storeJson.merge(effects, { lightningBackend })

      const bb = oldConfig['gatewayd-bitcoin-backend']
      const bitcoinBackend =
        bb?.['backend-type'] === 'esplora' && bb.url
          ? { type: 'esplora' as const, url: bb.url }
          : bb?.['backend-type'] === 'bitcoind'
            ? { type: 'bitcoind' as const }
            : undefined
      if (bitcoinBackend) await storeJson.merge(effects, { bitcoinBackend })
    },
    down: IMPOSSIBLE,
  },
})
