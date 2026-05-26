import { YAML } from '@start9labs/start-sdk'
import { readFile } from 'fs/promises'
import { storeJson } from '../fileModels/store'
import { sdk } from '../sdk'
import { DEFAULT_LDK_ALIAS } from '../utils'

// StartOS 0.3.5 wrote the embassy config here, inside the `main` volume. The
// gateway's package id is unchanged across the 0.4.0 migration, so this file is
// carried over and we can adopt the user's previous Lightning/Bitcoin choice.
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

export const seedFiles = sdk.setupOnInit(async (effects) => {
  // One-shot read (not `.const`): this hook also writes to the store below, and
  // `.const` would lock the value and reject the later merge as "write after
  // const".
  const store = await storeJson.read().once()

  // One-time import of a StartOS 0.3.5 config.yaml so upgrading gateways keep
  // their backend selection without re-running setup. Guarded on "unset" so it
  // never overrides a configured backend or re-applies on later inits.
  const needLightning = !store?.lightningBackend
  const needBitcoin = !store?.bitcoinBackend
  if (needLightning || needBitcoin) {
    const oldConfig: OldConfig | undefined = await readFile(
      OLD_CONFIG,
      'utf-8',
    ).then(YAML.parse, () => undefined)

    if (oldConfig) {
      if (needLightning) {
        const lb = oldConfig['gatewayd-lightning-backend']
        const lightningBackend =
          lb?.['backend-type'] === 'lnd'
            ? ({ type: 'lnd' } as const)
            : lb?.['backend-type'] === 'ldk'
              ? ({ type: 'ldk', alias: lb.alias ?? DEFAULT_LDK_ALIAS } as const)
              : undefined
        if (lightningBackend) await storeJson.merge(effects, { lightningBackend })
      }

      if (needBitcoin) {
        const bb = oldConfig['gatewayd-bitcoin-backend']
        const bitcoinBackend =
          bb?.['backend-type'] === 'esplora' && bb.url
            ? ({ type: 'esplora', url: bb.url } as const)
            : bb?.['backend-type'] === 'bitcoind'
              ? ({ type: 'bitcoind' } as const)
              : undefined
        if (bitcoinBackend) await storeJson.merge(effects, { bitcoinBackend })
      }
    }
  }

  // Ensure store.json exists even when there is nothing to import.
  await storeJson.merge(effects, {})
})
