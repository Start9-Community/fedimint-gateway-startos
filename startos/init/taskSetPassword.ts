import { resetPassword } from '../actions/resetPassword'
import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const taskSetPassword = sdk.setupOnInit(async (effects) => {
  const hash = await storeJson.read((s) => s.passwordHash).const(effects)
  if (!hash) {
    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: i18n('Create your Gateway admin password'),
    })
  }
})
