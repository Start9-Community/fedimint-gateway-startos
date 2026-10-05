import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.1:1',
  releaseNotes: {
    en_US: `The Lightning and Bitcoin backends selected during setup are now saved as chosen.

If you selected Local LND node but the gateway started its integrated LDK node, and that LDK node holds no funds or channels, uninstall the gateway, install this version, and select Local LND node again. If you selected an Esplora server, run Bitcoin Configuration again.`,
    es_ES: `Los backends de Lightning y Bitcoin seleccionados durante la configuración ahora se guardan tal como se eligieron.

Si seleccionaste Nodo LND local pero la pasarela inició su nodo LDK integrado, y ese nodo LDK no tiene fondos ni canales, desinstala la pasarela, instala esta versión y vuelve a seleccionar Nodo LND local. Si seleccionaste un servidor Esplora, vuelve a ejecutar Configuración de Bitcoin.`,
    de_DE: `Die bei der Einrichtung gewählten Lightning- und Bitcoin-Backends werden jetzt wie gewählt gespeichert.

Wenn du Lokaler LND-Knoten gewählt hast, das Gateway aber seinen integrierten LDK-Node gestartet hat, und dieser LDK-Node weder Guthaben noch Kanäle hat, deinstalliere das Gateway, installiere diese Version und wähle erneut Lokaler LND-Knoten. Wenn du einen Esplora-Server gewählt hast, führe Bitcoin-Konfiguration erneut aus.`,
    pl_PL: `Backendy Lightning i Bitcoin wybrane podczas konfiguracji są teraz zapisywane zgodnie z wyborem.

Jeśli wybrano Lokalny węzeł LND, a bramka uruchomiła zintegrowany węzeł LDK, który nie ma środków ani kanałów, odinstaluj bramkę, zainstaluj tę wersję i ponownie wybierz Lokalny węzeł LND. Jeśli wybrano serwer Esplora, uruchom ponownie akcję Konfiguracja Bitcoin.`,
    fr_FR: `Les backends Lightning et Bitcoin sélectionnés lors de la configuration sont désormais enregistrés tels que choisis.

Si vous avez sélectionné Nœud LND local mais que la passerelle a démarré son nœud LDK intégré, et que ce nœud LDK ne détient ni fonds ni canaux, désinstallez la passerelle, installez cette version et sélectionnez à nouveau Nœud LND local. Si vous avez sélectionné un serveur Esplora, relancez Configuration Bitcoin.`,
  },
  migrations: {},
})
