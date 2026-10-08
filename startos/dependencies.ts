import { autoconfig as bitcoindAutoconfig } from 'bitcoin-core-startos/startos/actions/config/autoconfig'
import { storeJson } from './fileModels/store'
import { i18n } from './i18n'
import { depBitcoindDescription, depLndDescription } from './manifest/i18n'
import { sdk } from './sdk'

const bitcoind = sdk.Dependency.optional('bitcoind', {
  description: depBitcoindDescription,
  metadata: {
    title: 'Bitcoin',
    icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/feec0b1dae42961a257948fe39b40caf8672fce1/dep-icon.svg',
  },
  versionRange:
    '(>=28.4:30 && <29) || (>=29.4:17 && <30) || (>=30.3:17 && <31) || >=31.1:19 || >=#knotsprerdts:29.3:29',
  kind: 'running',
  healthChecks: ['bitcoind', 'sync-progress'],
  enabled: async ({ effects }) =>
    (await storeJson.read((s) => s.bitcoinBackend?.type).const(effects)) ===
    'bitcoind',
}).withInit(async (effects) => {
  await sdk.action.createTask(
    effects,
    'bitcoind',
    bitcoindAutoconfig,
    'critical',
    {
      input: {
        kind: 'partial',
        accept: [{ wallet: { enable: true } }],
        set: { wallet: { enable: true } },
      },
      when: { condition: 'input-not-matches', once: false },
      reason: i18n('Fedimint Gateway requires the bitcoind wallet RPC enabled'),
    },
  )
})

const lnd = sdk.Dependency.optional('lnd', {
  description: depLndDescription,
  metadata: {
    title: 'LND',
    icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/f17336a10769efd8782a347662848c50c6270349/icon.svg',
  },
  versionRange: '>=0.21.1-beta:4',
  kind: 'running',
  healthChecks: ['sync-progress'],
  enabled: async ({ effects }) =>
    (await storeJson.read((s) => s.lightningBackend?.type).const(effects)) ===
    'lnd',
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(bitcoind)
  .addDependency(lnd)
