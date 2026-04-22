import { storeJson } from '../fileModels/store'
import { sdk } from '../sdk'
import { DEFAULT_RUST_LOG } from '../utils'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    // Leave lightningBackend and bitcoinBackend unset — the user opts in
    // via the Configuration task, which keeps lnd/bitcoind from showing
    // as dependencies before the user has chosen them.
    await storeJson.merge(effects, {
      passwordHash: null,
      rustLog: DEFAULT_RUST_LOG,
    })
  } else {
    await storeJson.merge(effects, {})
  }
})
