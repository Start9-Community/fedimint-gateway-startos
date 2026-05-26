import { VersionGraph } from '@start9labs/start-sdk'
import { v_0_11_1 } from './v0.11.1'
import { v_0_11_1_1 } from './v0.11.1.1'
import { v_0_11_1_2 } from './v0.11.1.2'

export const versionGraph = VersionGraph.of({
  current: v_0_11_1_2,
  other: [v_0_11_1, v_0_11_1_1],
})
