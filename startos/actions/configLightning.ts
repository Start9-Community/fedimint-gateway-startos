import {
  InputSpec,
  Value,
  Variants,
} from '@start9labs/start-sdk/base/lib/actions/input/builder'
import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { DEFAULT_LDK_ALIAS } from '../utils'

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
                description: i18n('Alias must be between 1 and 32 characters'),
              },
            ],
          }),
        }),
      },
      lnd: {
        name: i18n('Local LND node'),
        spec: InputSpec.of({}),
      },
    }),
  }),
})

export const configLightning = sdk.Action.withInput(
  'config-lightning',
  async ({ effects }) => ({
    name: i18n('Lightning Configuration'),
    description: i18n("Configure the Gateway's Lightning backend"),
    warning: i18n(
      'This cannot be changed later. Switching Lightning backend orphans any existing channels and federation registrations.',
    ),
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'hidden',
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

    await storeJson.merge(effects, { lightningBackend })
  },
)
