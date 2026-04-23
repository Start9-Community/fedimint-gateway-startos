import {
  InputSpec,
  Value,
  Variants,
} from '@start9labs/start-sdk/base/lib/actions/input/builder'
import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const inputSpec = InputSpec.of({
  bitcoinBackend: Value.union({
    name: i18n('Bitcoin Backend'),
    description: i18n('Choose how the Gateway connects to the Bitcoin network'),
    default: 'bitcoind',
    variants: Variants.of({
      bitcoind: {
        name: i18n('Local node (recommended)'),
        spec: InputSpec.of({}),
      },
      esplora: {
        name: i18n('Esplora'),
        spec: InputSpec.of({
          url: Value.text({
            name: i18n('Esplora API URL'),
            description: i18n('The URL of the Esplora API to use'),
            required: true,
            default: 'https://mempool.space/api',
            patterns: [
              {
                regex: '^https?://.*',
                description: i18n('Must be a valid HTTP(S) URL'),
              },
            ],
          }),
        }),
      },
    }),
  }),
})

export const configBitcoin = sdk.Action.withInput(
  'config-bitcoin',
  async ({ effects }) => ({
    name: i18n('Bitcoin Configuration'),
    description: i18n("Configure the Gateway's Bitcoin backend"),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  async ({ effects }) => {
    const store = await storeJson.read().once()
    if (!store) return undefined
    return {
      bitcoinBackend:
        store.bitcoinBackend?.type === 'esplora'
          ? {
              selection: 'esplora' as const,
              value: { url: store.bitcoinBackend.url },
            }
          : { selection: 'bitcoind' as const, value: {} },
    }
  },
  async ({ effects, input }) => {
    const bitcoinBackend =
      input.bitcoinBackend.selection === 'esplora'
        ? {
            type: 'esplora' as const,
            url: input.bitcoinBackend.value.url,
          }
        : { type: 'bitcoind' as const }

    await storeJson.merge(effects, { bitcoinBackend })
  },
)
