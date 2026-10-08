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
  '- LDK (Integrated): runs a Lightning node inside the gateway, with its own channels, funds and peer address. Nothing else to install.\n- Local LND node: uses the LND service on this server, which must be installed. Channels and funds are managed in LND.': 10,
  'LDK (Integrated)': 11,
  'Node Alias': 13,
  "The name other Lightning nodes see for the gateway's integrated node.": 14,
  'Bitcoin Backend': 15,
  "- Local node: uses Bitcoin on this server, which must be installed and fully synced. The gateway's queries stay on this server.\n- Esplora: uses an Esplora API on the internet, with nothing else to install. Its operator sees the gateway's queries, which reveal its on-chain activity.": 16,
  'Local node (recommended)': 17,
  Esplora: 18,
  'Esplora API URL': 19,
  "The Esplora API's base URL, including its path, such as https://mempool.space/api.": 20,

  // actions/resetPassword.ts, init/taskSetPassword.ts
  'Reset Password': 24,
  'Create Password': 25,
  'Generates a random admin password for the Gateway Interface and shows it once.': 26,
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
  'Choose whether the gateway runs its own Lightning node or uses LND on this server.': 40,
  'Bitcoin Configuration': 41,
  'Choose where the gateway gets its Bitcoin data. Saving a change restarts a running gateway.': 42,
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

  // main.ts (dependency reachability over the internal bridge)
  'Bitcoin is not yet reachable on the internal network': 49,
  'LND is not yet reachable on the internal network': 50,
  'The current admin password is replaced and stops working.': 51,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
