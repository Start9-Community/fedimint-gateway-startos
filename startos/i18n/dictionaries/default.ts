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

  // actions/config.ts
  'Configuration': 7,
  'Configure Fedimint Gateway settings': 8,
  'Lightning Backend': 9,
  'Choose which Lightning implementation to use': 10,
  'LDK (Integrated)': 11,
  'LND (External)': 12,
  'Node Alias': 13,
  'Public alias for the integrated LDK Lightning node': 14,
  'Bitcoin Backend': 15,
  'Choose how the Gateway connects to the Bitcoin network': 16,
  'Bitcoin Core (Recommended)': 17,
  'Esplora': 18,
  'Esplora API URL': 19,
  'The URL of the Esplora API to use': 20,
  'Advanced Settings': 21,
  'Rust Log Directives': 22,
  'Rust logging directives. Only modify if debugging.': 23,

  // actions/resetPassword.ts, init/taskSetPassword.ts
  'Reset Password': 24,
  'Create Password': 25,
  'Reset your Gateway admin password': 26,
  'Create your Gateway admin password': 27,
  'Success': 28,
  'Your new password is below': 29,

  // init/tasksOnInstall.ts
  'Gateway needs to know which Lightning and Bitcoin backends to use': 30,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
