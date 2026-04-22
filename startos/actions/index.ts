import { sdk } from '../sdk'
import { config } from './config'
import { resetPassword } from './resetPassword'

export const actions = sdk.Actions.of()
  .addAction(config)
  .addAction(resetPassword)
