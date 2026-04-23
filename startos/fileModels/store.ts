import { FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { DEFAULT_LDK_ALIAS } from '../utils'
import { z } from 'zod'

const ldkVariant = z.object({
  type: z.literal('ldk').catch('ldk' as const),
  alias: z.string().catch(DEFAULT_LDK_ALIAS),
})

const lndVariant = z.object({
  type: z.literal('lnd').catch('lnd' as const),
})

// Intentionally no `.catch` default: backends stay undefined until the user
// explicitly opts in via the Configuration action. This prevents lnd and
// bitcoind from showing as dependencies before the user has chosen them.
const lightningBackend = z
  .discriminatedUnion('type', [ldkVariant, lndVariant])
  .optional()

const bitcoindVariant = z.object({
  type: z.literal('bitcoind').catch('bitcoind' as const),
})

const esploraVariant = z.object({
  type: z.literal('esplora').catch('esplora' as const),
  url: z.string().catch('https://mempool.space/api'),
})

const bitcoinBackend = z
  .discriminatedUnion('type', [bitcoindVariant, esploraVariant])
  .optional()

const shape = z.object({
  lightningBackend,
  bitcoinBackend,
  passwordHash: z.string().nullable().catch(null),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: './store.json' },
  shape,
)
