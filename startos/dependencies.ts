import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const store = await storeJson.read().const(effects)
  const deps: T.CurrentDependenciesResult<any> = {}

  if (store?.bitcoinBackend?.type === 'bitcoind') {
    deps.bitcoind = {
      kind: 'running',
      versionRange: '>=28.3:5',
      healthChecks: ['bitcoind', 'sync-progress'],
    }
  }

  if (store?.lightningBackend?.type === 'lnd') {
    deps.lnd = {
      kind: 'running',
      versionRange: '>=0.20.1-beta:1',
      healthChecks: ['sync-progress'],
    }
  }

  return deps
})
