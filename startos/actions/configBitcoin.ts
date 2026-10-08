import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value, Variants } = sdk

const inputSpec = InputSpec.of({
  bitcoinBackend: Value.union({
    name: i18n('Bitcoin Backend'),
    description: i18n(
      "- Local node: uses Bitcoin on this server, which must be installed and fully synced. The gateway's queries stay on this server.\n- Esplora: uses an Esplora API on the internet, with nothing else to install. Its operator sees the gateway's queries, which reveal its on-chain activity.",
    ),
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
            description: i18n(
              "The Esplora API's base URL, including its path, such as https://mempool.space/api.",
            ),
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
    description: i18n(
      'Choose where the gateway gets its Bitcoin data. Saving a change restarts a running gateway.',
    ),
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
