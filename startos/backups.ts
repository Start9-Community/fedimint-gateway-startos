import { sdk } from './sdk'

// No-op: backing up gateway state (LDK channel monitors, federation
// registrations) is unsafe to restore — stale LDK state risks penalty
// closes, and the gateway is cheap to reconfigure from scratch.
// Matches the 0.3.5.1 behavior on master (backup.create/restore = /bin/true).
export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.withOptions(),
)
