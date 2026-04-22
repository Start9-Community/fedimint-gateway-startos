import { config } from '../actions/config'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const tasksOnInstall = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, config, 'critical', {
      reason: i18n(
        'Gateway needs to know which Lightning and Bitcoin backends to use',
      ),
    })
  }
})
