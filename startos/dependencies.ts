import { autoconfig as bitcoindAutoconfig } from 'bitcoin-core-startos/startos/actions/config/autoconfig'
import { storeJson } from './fileModels/store'
import { i18n } from './i18n'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const store = await storeJson.read().const(effects)

  if (store?.bitcoinBackend?.type === 'bitcoind') {
    await sdk.action.createTask(
      effects,
      'bitcoind',
      bitcoindAutoconfig,
      'critical',
      {
        input: {
          kind: 'partial',
          accept: [{ wallet: { enable: true } }, { wallet: { enable: null } }],
          set: { wallet: { enable: true } },
        },
        when: { condition: 'input-not-matches', once: false },
        reason: i18n(
          'Fedimint Gateway requires the bitcoind wallet RPC enabled',
        ),
      },
    )
  }

  return {
    ...(store?.bitcoinBackend?.type === 'bitcoind' && {
      bitcoind: {
        kind: 'running',
        versionRange: '>=28.4:13',
        healthChecks: ['bitcoind', 'sync-progress'],
      },
    }),
    ...(store?.lightningBackend?.type === 'lnd' && {
      lnd: {
        kind: 'running',
        versionRange: '>=0.21.1-beta:0',
        healthChecks: ['sync-progress'],
      },
    }),
  }
})
