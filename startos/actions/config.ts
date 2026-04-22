import {
  InputSpec,
  Value,
  Variants,
} from '@start9labs/start-sdk/base/lib/actions/input/builder'
import { sdk } from '../sdk'
import { i18n } from '../i18n'
import { storeJson } from '../fileModels/store'
import { DEFAULT_LDK_ALIAS, DEFAULT_RUST_LOG } from '../utils'

const inputSpec = InputSpec.of({
  lightningBackend: Value.union({
    name: i18n('Lightning Backend'),
    description: i18n('Choose which Lightning implementation to use'),
    default: 'ldk',
    variants: Variants.of({
      ldk: {
        name: i18n('LDK (Integrated)'),
        spec: InputSpec.of({
          alias: Value.text({
            name: i18n('Node Alias'),
            description: i18n(
              'Public alias for the integrated LDK Lightning node',
            ),
            required: true,
            default: DEFAULT_LDK_ALIAS,
            patterns: [
              {
                regex: '^.{1,32}$',
                description: 'Alias must be between 1 and 32 characters',
              },
            ],
          }),
        }),
      },
      lnd: {
        name: i18n('LND (External)'),
        spec: InputSpec.of({}),
      },
    }),
  }),
  bitcoinBackend: Value.union({
    name: i18n('Bitcoin Backend'),
    description: i18n('Choose how the Gateway connects to the Bitcoin network'),
    default: 'bitcoind',
    variants: Variants.of({
      bitcoind: {
        name: i18n('Bitcoin Core (Recommended)'),
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
                description: 'Must be a valid HTTP(S) URL',
              },
            ],
          }),
        }),
      },
    }),
  }),
  advanced: Value.object(
    {
      name: i18n('Advanced Settings'),
    },
    InputSpec.of({
      rustLog: Value.text({
        name: i18n('Rust Log Directives'),
        description: i18n('Rust logging directives. Only modify if debugging.'),
        required: true,
        default: DEFAULT_RUST_LOG,
        patterns: [],
      }),
    }),
  ),
})

export const config = sdk.Action.withInput(
  'config',
  async ({ effects }) => ({
    name: i18n('Configuration'),
    description: i18n('Configure Fedimint Gateway settings'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled' as const,
  }),
  inputSpec,
  async ({ effects }) => {
    const store = await storeJson.read().once()
    if (!store) return undefined
    return {
      lightningBackend:
        store.lightningBackend?.type === 'lnd'
          ? { selection: 'lnd' as const, value: {} }
          : {
              selection: 'ldk' as const,
              value: {
                alias: store.lightningBackend?.alias ?? DEFAULT_LDK_ALIAS,
              },
            },
      bitcoinBackend:
        store.bitcoinBackend?.type === 'esplora'
          ? {
              selection: 'esplora' as const,
              value: { url: store.bitcoinBackend.url },
            }
          : { selection: 'bitcoind' as const, value: {} },
      advanced: {
        rustLog: store.rustLog,
      },
    }
  },
  async ({ effects, input }) => {
    const lightningBackend =
      input.lightningBackend.selection === 'lnd'
        ? { type: 'lnd' as const }
        : {
            type: 'ldk' as const,
            alias: input.lightningBackend.value.alias,
          }

    const bitcoinBackend =
      input.bitcoinBackend.selection === 'esplora'
        ? {
            type: 'esplora' as const,
            url: input.bitcoinBackend.value.url,
          }
        : { type: 'bitcoind' as const }

    await storeJson.merge(effects, {
      lightningBackend,
      bitcoinBackend,
      rustLog: input.advanced.rustLog,
    })
  },
)
