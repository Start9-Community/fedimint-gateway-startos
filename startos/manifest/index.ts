import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'fedimint-gatewayd',
  title: 'Fedimint Gateway',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/gatewayd-startos',
  upstreamRepo: 'https://github.com/fedimint/fedimint',
  marketingUrl: 'https://fedimint.org/',
  donationUrl: null,
  docsUrls: ['https://fedimint.org'],
  description: { short, long },
  volumes: ['main', 'gatewayd'],
  images: {
    gatewayd: {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    bitcoind: {
      description:
        'Provides private, self-hosted blockchain data instead of relying on external Esplora APIs',
      optional: true,
      metadata: {
        title: 'Bitcoin Core',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/feec0b1dae42961a257948fe39b40caf8672fce1/dep-icon.svg',
      },
    },
    lnd: {
      description:
        'Use your existing LND node instead of the integrated LDK node',
      optional: true,
      metadata: {
        title: 'LND',
        icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/f17336a10769efd8782a347662848c50c6270349/icon.svg',
      },
    },
  },
})
