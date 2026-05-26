import { configBitcoin } from '../actions/configBitcoin'
import { configLightning } from '../actions/configLightning'
import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

// Re-checked on every init (not just a fresh 'install') so a missing backend
// always re-surfaces its setup task. Otherwise a backend left unset at install
// time — e.g. when the package's data volume is adopted on upgrade and init is
// not a fresh 'install' — could never be configured, since these actions are
// reached through their tasks. The task is created only while the backend is
// unset, so it surfaces setup without ever inviting a later change.
export const tasksOnInstall = sdk.setupOnInit(async (effects) => {
  if (!(await storeJson.read((s) => s.lightningBackend).const(effects))) {
    await sdk.action.createOwnTask(effects, configLightning, 'critical', {
      reason: i18n('Gateway needs a Lightning backend'),
    })
  }
  if (!(await storeJson.read((s) => s.bitcoinBackend).const(effects))) {
    await sdk.action.createOwnTask(effects, configBitcoin, 'critical', {
      reason: i18n('Gateway needs a Bitcoin backend'),
    })
  }
})
