import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'fedimint-gatewayd',
  title: 'Fedimint Gateway',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/fedimint-gateway-startos',
  upstreamRepo: 'https://github.com/fedimint/fedimint',
  marketingUrl: 'https://fedimint.org/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'gatewayd'],
  images: {
    gatewayd: {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
      emulateMissing: false,
    },
  },
})
