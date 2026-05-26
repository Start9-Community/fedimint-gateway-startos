import { storeJson } from '../fileModels/store'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  // lightningBackend and bitcoinBackend are intentionally left unset — the
  // user opts in via the Configuration task, which keeps lnd/bitcoind from
  // showing as dependencies before the user has chosen them.
  await storeJson.merge(effects, {})
})
