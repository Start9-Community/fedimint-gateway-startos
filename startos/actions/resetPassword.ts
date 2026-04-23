import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const resetPassword = sdk.Action.withoutInput(
  // id
  'reset-password',

  // metadata
  async ({ effects }) => {
    const hasPass =
      (await storeJson.read((s) => s.passwordHash).const(effects)) !== null

    return {
      name: hasPass ? i18n('Reset Password') : i18n('Create Password'),
      description: hasPass
        ? i18n('Reset your Gateway admin password')
        : i18n('Create your Gateway admin password'),
      warning: null,
      allowedStatuses: 'only-stopped',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
      len: 22,
    })

    const passwordHash = await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'gatewayd' },
      sdk.Mounts.of(),
      'gatewayd-hash-pw',
      async (sub) => {
        const result = await sub.exec(
          ['gateway-cli', 'create-password-hash', password],
          { env: { FS_MISTRUST_DISABLE_PERMISSIONS_CHECKS: 'true' } },
        )
        if (result.exitCode !== 0) {
          // gateway-cli prints the bcrypt hash to stdout and errors to stderr.
          // Surface the stderr verbatim so the user can share it when filing
          // an issue; the leading message is translated.
          throw new Error(
            `${i18n('Failed to hash Gateway password')} (exit ${result.exitCode}): ${String(
              result.stderr,
            ).trim()}`,
          )
        }
        // gateway-cli wraps the bcrypt hash in double quotes; strip them.
        return String(result.stdout).replace(/"/g, '').trim()
      },
    )

    await storeJson.merge(effects, { passwordHash })

    return {
      version: '1',
      title: i18n('Success'),
      message: i18n('Your new password is below'),
      result: {
        type: 'single',
        value: password,
        masked: true,
        copyable: true,
        qr: false,
      },
    }
  },
)
