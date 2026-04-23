import { sdk } from '../sdk'
import { configBitcoin } from './configBitcoin'
import { configLightning } from './configLightning'
import { resetPassword } from './resetPassword'

export const actions = sdk.Actions.of()
  .addAction(configLightning)
  .addAction(configBitcoin)
  .addAction(resetPassword)
