export const uiPort = 8176
export const irohPort = 8177
export const ldkPort = 10010

export const bitcoindMountpoint = '/mnt/bitcoin'
export const bitcoindCookiePath = `${bitcoindMountpoint}/.cookie`

export const lndMountpoint = '/mnt/lnd'
export const lndTlsCert = `${lndMountpoint}/tls.cert`
export const lndMacaroon = `${lndMountpoint}/data/chain/bitcoin/mainnet/admin.macaroon`

export const DEFAULT_RUST_LOG =
  'info,jsonrpsee_core::client::async_client=off,hyper=off,h2=off,jsonrpsee_server=warn,jsonrpsee_server::transport=off,AlephBFT-=error,iroh=error'

export const DEFAULT_LDK_ALIAS = 'Fedimint LDK Gateway'
