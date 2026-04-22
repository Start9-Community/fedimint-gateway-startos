import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store'
import { ldkPort, uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const receipts = []

  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
    preferredExternalPort: uiPort,
  })
  const ui = sdk.createInterface(effects, {
    name: i18n('Gateway Interface'),
    id: 'ui',
    description: i18n('Gateway dashboard and API'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })
  receipts.push(await uiMultiOrigin.export([ui]))

  const lightningBackend = await storeJson
    .read((s) => s.lightningBackend?.type)
    .const(effects)

  if (lightningBackend === 'ldk') {
    const peerMulti = sdk.MultiHost.of(effects, 'peer')
    const peerMultiOrigin = await peerMulti.bindPort(ldkPort, {
      protocol: null,
      addSsl: null,
      preferredExternalPort: ldkPort,
      secure: { ssl: false },
    })
    const peer = sdk.createInterface(effects, {
      name: i18n('LDK Peer Interface'),
      id: 'peer',
      description: i18n(
        'Used for inbound Lightning channels to the integrated LDK node',
      ),
      type: 'p2p',
      masked: false,
      schemeOverride: null,
      username: null,
      path: '',
      query: {},
    })
    receipts.push(await peerMultiOrigin.export([peer]))
  }

  return receipts
})
