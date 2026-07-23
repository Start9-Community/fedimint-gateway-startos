import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_0_11_1_2 } from './v0.11.1_2'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_0_11_1_2],
})
