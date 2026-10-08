import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { DEFAULT_LDK_ALIAS } from '../utils'

const { InputSpec, Value, Variants } = sdk

const inputSpec = InputSpec.of({
  lightningBackend: Value.union({
    name: i18n('Lightning Backend'),
    description: i18n(
      '- LDK (Integrated): runs a Lightning node inside the gateway, with its own channels, funds and peer address. Nothing else to install.\n- Local LND node: uses the LND service on this server, which must be installed. Channels and funds are managed in LND.',
    ),
    default: null,
    variants: Variants.of({
      ldk: {
        name: i18n('LDK (Integrated)'),
        spec: InputSpec.of({
          alias: Value.text({
            name: i18n('Node Alias'),
            description: i18n(
              "The name other Lightning nodes see for the gateway's integrated node.",
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
    description: i18n(
      'Choose whether the gateway runs its own Lightning node or uses LND on this server.',
    ),
    warning: i18n(
      'This cannot be changed later. Switching Lightning backend orphans any existing channels and federation registrations.',
    ),
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'hidden',
  }),
  inputSpec,
  async ({ effects }) => {
    const lightningBackend = await storeJson
      .read((s) => s.lightningBackend)
      .once()
    if (!lightningBackend) return undefined
    return {
      lightningBackend:
        lightningBackend.type === 'lnd'
          ? { selection: 'lnd' as const, value: {} }
          : {
              selection: 'ldk' as const,
              value: { alias: lightningBackend.alias ?? DEFAULT_LDK_ALIAS },
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
