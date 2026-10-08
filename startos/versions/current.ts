import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.1:2',
  releaseNotes: {
    en_US: `- Reset Password asks for confirmation before replacing an existing password.
- Bitcoin Configuration explains what each backend means for the gateway.
- Lightning Configuration no longer preselects a backend, since the choice cannot be changed later.
- Bitcoin must be at least 28.4:30, 29.4:17, 30.3:17 or 31.1:19, depending on its major version. Bitcoin Knots (pre-RDTS) 29.3:29 or later also works.`,
    es_ES: `- Restablecer contraseña pide confirmación antes de reemplazar una contraseña existente.
- Configuración de Bitcoin explica qué implica cada backend para la pasarela.
- Configuración de Lightning ya no preselecciona un backend, ya que la elección no se puede cambiar después.
- Bitcoin debe ser al menos la versión 28.4:30, 29.4:17, 30.3:17 o 31.1:19, según su versión principal. También funciona Bitcoin Knots (pre-RDTS) 29.3:29 o posterior.`,
    de_DE: `- Passwort zurücksetzen fragt nach einer Bestätigung, bevor ein vorhandenes Passwort ersetzt wird.
- Bitcoin-Konfiguration erklärt, was jedes Backend für das Gateway bedeutet.
- Lightning-Konfiguration wählt kein Backend mehr vor, da die Wahl später nicht geändert werden kann.
- Bitcoin muss je nach Hauptversion mindestens 28.4:30, 29.4:17, 30.3:17 oder 31.1:19 sein. Bitcoin Knots (pre-RDTS) ab 29.3:29 funktioniert ebenfalls.`,
    pl_PL: `- Zresetuj hasło prosi o potwierdzenie przed zastąpieniem istniejącego hasła.
- Konfiguracja Bitcoin wyjaśnia, co każdy backend oznacza dla bramki.
- Konfiguracja Lightning nie zaznacza już domyślnie backendu, ponieważ wyboru nie można później zmienić.
- Bitcoin musi być co najmniej w wersji 28.4:30, 29.4:17, 30.3:17 lub 31.1:19, zależnie od wersji głównej. Działa też Bitcoin Knots (pre-RDTS) 29.3:29 lub nowszy.`,
    fr_FR: `- Réinitialiser le mot de passe demande une confirmation avant de remplacer un mot de passe existant.
- Configuration Bitcoin explique ce que chaque backend implique pour la passerelle.
- Configuration Lightning ne présélectionne plus de backend, car ce choix ne peut pas être modifié ultérieurement.
- Bitcoin doit être au moins en version 28.4:30, 29.4:17, 30.3:17 ou 31.1:19, selon sa version majeure. Bitcoin Knots (pre-RDTS) 29.3:29 ou plus récent fonctionne aussi.`,
  },
  migrations: {},
})
