import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.1:0',
  releaseNotes: {
    en_US: `Security update: fixes a bug in the gateway's LNv1 Lightning payment handling.

Fedimint 0.12.1 fixes a bug in the gateway's LNv1 (legacy Lightning module) payment handling and adds further hardening to the LNv2 and LDK payment paths, including behaviour across restarts and transient Lightning-node failures. Gateway operators should update as soon as possible.

No migration is required: there are no protocol or database changes, and the gateway keeps working with federations on both current and previous releases, so no coordination with federations is needed.`,
    es_ES: `Actualización de seguridad: corrige un error en la gestión de pagos Lightning LNv1 de la pasarela.

Fedimint 0.12.1 corrige un error en la gestión de pagos LNv1 (módulo Lightning heredado) de la pasarela y añade más refuerzos a las rutas de pago LNv2 y LDK, incluido el comportamiento tras reinicios y fallos transitorios del nodo Lightning. Los operadores de pasarelas deben actualizar lo antes posible.

No se requiere migración: no hay cambios de protocolo ni de base de datos, y la pasarela sigue funcionando con federaciones tanto en la versión actual como en las anteriores, así que no es necesaria ninguna coordinación con las federaciones.`,
    de_DE: `Sicherheitsupdate: behebt einen Fehler in der LNv1-Lightning-Zahlungsabwicklung des Gateways.

Fedimint 0.12.1 behebt einen Fehler in der LNv1-Zahlungsabwicklung (altes Lightning-Modul) des Gateways und härtet zusätzlich die LNv2- und LDK-Zahlungspfade, einschließlich des Verhaltens bei Neustarts und vorübergehenden Ausfällen des Lightning-Nodes. Gateway-Betreiber sollten so bald wie möglich aktualisieren.

Eine Migration ist nicht nötig: Es gibt keine Protokoll- oder Datenbankänderungen, und das Gateway arbeitet weiterhin mit Föderationen auf aktuellen wie auf früheren Versionen, sodass keine Koordination mit Föderationen erforderlich ist.`,
    pl_PL: `Aktualizacja bezpieczeństwa: naprawia błąd w obsłudze płatności Lightning LNv1 przez bramkę.

Fedimint 0.12.1 naprawia błąd w obsłudze płatności LNv1 (starszy moduł Lightning) przez bramkę i dodatkowo wzmacnia ścieżki płatności LNv2 i LDK, w tym zachowanie po restartach i przejściowych awariach węzła Lightning. Operatorzy bramek powinni zaktualizować jak najszybciej.

Migracja nie jest wymagana: nie ma zmian w protokole ani w bazie danych, a bramka nadal współpracuje z federacjami zarówno na bieżącej, jak i na wcześniejszych wersjach, więc koordynacja z federacjami nie jest potrzebna.`,
    fr_FR: `Mise à jour de sécurité : corrige un bug dans le traitement des paiements Lightning LNv1 de la passerelle.

Fedimint 0.12.1 corrige un bug dans le traitement des paiements LNv1 (ancien module Lightning) de la passerelle et renforce en plus les chemins de paiement LNv2 et LDK, y compris le comportement lors des redémarrages et des pannes transitoires du nœud Lightning. Les opérateurs de passerelles doivent mettre à jour dès que possible.

Aucune migration n'est requise : il n'y a pas de changement de protocole ni de base de données, et la passerelle continue de fonctionner avec les fédérations sur les versions actuelles comme antérieures, aucune coordination avec les fédérations n'est donc nécessaire.`,
  },
  migrations: {},
})
