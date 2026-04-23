import { FileHelper } from '@start9labs/start-sdk'
import { manifest as bitcoinManifest } from 'bitcoin-core-startos/startos/manifest'
import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { storeJson } from './fileModels/store'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  bitcoindCookiePath,
  bitcoindMountpoint,
  irohPort,
  ldkPort,
  lndMacaroon,
  lndMountpoint,
  lndTlsCert,
  uiPort,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Fedimint Gateway...'))

  const store = await storeJson.read().const(effects)
  if (!store) {
    throw new Error(i18n('Store not found'))
  }
  if (!store.passwordHash) {
    throw new Error(i18n('Gateway password is not set'))
  }
  if (!store.lightningBackend || !store.bitcoinBackend) {
    throw new Error(
      i18n('Gateway backends are not configured. Complete the setup tasks.'),
    )
  }

  const { lightningBackend, bitcoinBackend } = store

  // Iroh uses QUIC-over-UDP with public relays and NAT hole-punching, so it
  // works without an externally-reachable port. Binding 0.0.0.0 here only
  // affects intra-container; we intentionally do not expose this as an
  // interface.
  const env: Record<string, string> = {
    FM_GATEWAY_DATA_DIR: '/gatewayd',
    FM_GATEWAY_NETWORK: 'bitcoin',
    FM_GATEWAY_LISTEN_ADDR: `0.0.0.0:${uiPort}`,
    FM_GATEWAY_IROH_LISTEN_ADDR: `0.0.0.0:${irohPort}`,
    FM_GATEWAY_BCRYPT_PASSWORD_HASH: store.passwordHash,
    // Disable Arti's fs-mistrust permission checks. These invoke
    // getpwuid/getpwnam via libc, which reads /etc/passwd. The Dockerfile
    // materializes the upstream's /etc/passwd symlink, but this is a
    // defense-in-depth in case SubContainer layer extraction ever misses
    // the materialized file.
    FS_MISTRUST_DISABLE_PERMISSIONS_CHECKS: 'true',
  }

  let mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/start-os',
      readonly: false,
    })
    .mountVolume({
      volumeId: 'gatewayd',
      subpath: null,
      mountpoint: '/gatewayd',
      readonly: false,
    })

  if (bitcoinBackend.type === 'bitcoind') {
    mounts = mounts.mountDependency<typeof bitcoinManifest>({
      dependencyId: 'bitcoind',
      volumeId: 'main',
      subpath: null,
      mountpoint: bitcoindMountpoint,
      readonly: true,
    })
  }

  if (lightningBackend.type === 'lnd') {
    mounts = mounts.mountDependency<typeof lndManifest>({
      dependencyId: 'lnd',
      volumeId: 'main',
      subpath: null,
      mountpoint: lndMountpoint,
      readonly: true,
    })
  }

  const gatewaydSubc = await sdk.SubContainer.of(
    effects,
    { imageId: 'gatewayd' },
    mounts,
    'gatewayd-sub',
  )

  if (bitcoinBackend.type === 'bitcoind') {
    // Re-read (and restart) when bitcoind rotates the cookie
    const cookieRaw = await FileHelper.string(
      `${gatewaydSubc.rootfs}${bitcoindCookiePath}`,
    )
      .read()
      .const(effects)
    if (!cookieRaw) {
      throw new Error(i18n('Bitcoind cookie is missing'))
    }
    const cookie = cookieRaw.trim()
    const sep = cookie.indexOf(':')
    if (sep < 0) {
      throw new Error(i18n('Bitcoind cookie is malformed'))
    }
    env.FM_BITCOIND_URL = 'http://bitcoind.startos:8332'
    env.FM_BITCOIND_USERNAME = cookie.slice(0, sep)
    env.FM_BITCOIND_PASSWORD = cookie.slice(sep + 1)
  } else {
    env.FM_ESPLORA_URL = bitcoinBackend.url
  }

  let gatewayMode: 'ldk' | 'lnd'
  if (lightningBackend.type === 'lnd') {
    gatewayMode = 'lnd'
    env.FM_LND_RPC_ADDR = 'https://lnd.startos:10009'
    env.FM_LND_TLS_CERT = lndTlsCert
    env.FM_LND_MACAROON = lndMacaroon
  } else {
    gatewayMode = 'ldk'
    env.FM_LDK_ALIAS = lightningBackend.alias
    env.FM_PORT_LDK = String(ldkPort)
  }

  return sdk.Daemons.of(effects).addDaemon('gatewayd', {
    subcontainer: gatewaydSubc,
    exec: {
      command: ['gatewayd', gatewayMode],
      env,
    },
    ready: {
      display: i18n('Gateway Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The gateway dashboard is ready'),
          errorMessage: i18n('The gateway dashboard is not ready'),
        }),
    },
    requires: [],
  })
})
