export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Fedimint Gateway...': 0,
  'Gateway Interface': 1,
  'The gateway dashboard is ready': 2,
  'The gateway dashboard is not ready': 3,

  // interfaces.ts
  'Gateway dashboard and API': 4,
  'LDK Peer Interface': 5,
  'Used for inbound Lightning channels to the integrated LDK node': 6,

  // actions/configLightning.ts, actions/configBitcoin.ts
  'Lightning Backend': 9,
  'Choose which Lightning implementation to use': 10,
  'LDK (Integrated)': 11,
  'Node Alias': 13,
  'Public alias for the integrated LDK Lightning node': 14,
  'Bitcoin Backend': 15,
  'Choose how the Gateway connects to the Bitcoin network': 16,
  'Local node (recommended)': 17,
  Esplora: 18,
  'Esplora API URL': 19,
  'The URL of the Esplora API to use': 20,

  // actions/resetPassword.ts, init/taskSetPassword.ts
  'Reset Password': 24,
  'Create Password': 25,
  'Reset your Gateway admin password': 26,
  'Create your Gateway admin password': 27,
  Success: 28,
  'Your new password is below': 29,

  // main.ts errors
  'Store not found': 31,
  'Gateway password is not set': 32,
  'Bitcoind cookie is missing': 34,
  'Bitcoind cookie is malformed': 35,

  // actions/configLightning.ts, actions/configBitcoin.ts pattern descriptions
  'Alias must be between 1 and 32 characters': 36,
  'Must be a valid HTTP(S) URL': 37,

  // actions/resetPassword.ts
  'Failed to hash Gateway password': 38,

  // actions/configLightning.ts, actions/configBitcoin.ts
  'Lightning Configuration': 39,
  "Configure the Gateway's Lightning backend": 40,
  'Bitcoin Configuration': 41,
  "Configure the Gateway's Bitcoin backend": 42,
  'This cannot be changed later. Switching Lightning backend orphans any existing channels and federation registrations.': 43,

  // init/tasksOnInstall.ts
  'Gateway needs a Lightning backend': 44,
  'Gateway needs a Bitcoin backend': 45,

  // main.ts (post-config-split error)
  'Gateway backends are not configured. Complete the setup tasks.': 46,

  // actions/configLightning.ts
  'Local LND node': 47,

  // dependencies.ts
  'Fedimint Gateway requires the bitcoind wallet RPC enabled': 48,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
