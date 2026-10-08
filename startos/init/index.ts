import { actions } from '../actions'
import { restoreInit } from '../backups'
import { dependencies } from '../dependencies'
import { versionGraph } from '../versions'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { seedFiles } from './seedFiles'
import { taskSetPassword } from './taskSetPassword'
import { tasksOnInstall } from './tasksOnInstall'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  actions,
  dependencies,
  taskSetPassword,
  tasksOnInstall,
)

export const uninit = sdk.setupUninit(versionGraph)
