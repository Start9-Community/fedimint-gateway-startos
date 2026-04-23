import { configBitcoin } from '../actions/configBitcoin'
import { configLightning } from '../actions/configLightning'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const tasksOnInstall = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, configLightning, 'critical', {
      reason: i18n('Gateway needs a Lightning backend'),
    })
    await sdk.action.createOwnTask(effects, configBitcoin, 'critical', {
      reason: i18n('Gateway needs a Bitcoin backend'),
    })
  }
})
