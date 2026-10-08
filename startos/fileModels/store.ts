import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { DEFAULT_LDK_ALIAS } from '../utils'

const ldkVariant = z.looseObject({
  type: z.literal('ldk'),
  alias: z.string().catch(DEFAULT_LDK_ALIAS),
})

const lndVariant = z.looseObject({
  type: z.literal('lnd'),
})

// Intentionally no `.catch` default: backends stay undefined until the user
// explicitly opts in via the Configuration action. This prevents lnd and
// bitcoind from showing as dependencies before the user has chosen them.
const lightningBackend = z
  .discriminatedUnion('type', [ldkVariant, lndVariant])
  .optional()

const bitcoindVariant = z.looseObject({
  type: z.literal('bitcoind'),
})

const esploraVariant = z.looseObject({
  type: z.literal('esplora'),
  url: z.string().catch('https://mempool.space/api'),
})

const bitcoinBackend = z
  .discriminatedUnion('type', [bitcoindVariant, esploraVariant])
  .optional()

const shape = z.looseObject({
  lightningBackend,
  bitcoinBackend,
  passwordHash: z.string().nullable().catch(null),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: './store.json' },
  shape,
)
