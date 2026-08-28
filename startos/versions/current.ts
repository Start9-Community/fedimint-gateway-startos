import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.0:0',
  releaseNotes: {
    en_US: `Major release with much faster Lightning payments.

Fedimint 0.12.0 significantly reduces payment latency across the stack, so payments through your gateway complete noticeably faster. The gateway can now also sweep its on-chain wallet completely — correctly accounting for fees — and the UI gains editable channel fees, a total inbound/outbound liquidity overview, and manually connected peers that persist across restarts.

This release also includes the security hardening already shipped in the 0.11 line. It connects to federations on both current and previous releases, so no coordination with federations is required to upgrade.`,
    es_ES: `Versión mayor con pagos Lightning mucho más rápidos.

Fedimint 0.12.0 reduce significativamente la latencia de pago en toda la pila, por lo que los pagos a través de tu pasarela se completan notablemente más rápido. La pasarela ahora también puede vaciar por completo su monedero on-chain — contabilizando correctamente las tarifas — y la interfaz incorpora tarifas de canal editables, un resumen de la liquidez total entrante/saliente y pares conectados manualmente que persisten tras los reinicios.

Esta versión también incluye el refuerzo de seguridad ya distribuido en la línea 0.11. Se conecta a federaciones tanto en la versión actual como en las anteriores, así que no se requiere coordinación con las federaciones para actualizar.`,
    de_DE: `Major-Release mit deutlich schnelleren Lightning-Zahlungen.

Fedimint 0.12.0 reduziert die Zahlungslatenz im gesamten Stack erheblich, sodass Zahlungen über dein Gateway spürbar schneller abgeschlossen werden. Das Gateway kann seine On-Chain-Wallet jetzt außerdem vollständig leeren — unter korrekter Berücksichtigung der Gebühren — und die Oberfläche erhält editierbare Kanalgebühren, eine Übersicht der gesamten ein- und ausgehenden Liquidität sowie manuell verbundene Peers, die Neustarts überdauern.

Dieses Release enthält auch die bereits in der 0.11-Linie ausgelieferte Sicherheitshärtung. Es verbindet sich mit Föderationen auf aktuellen wie auf früheren Versionen, für das Upgrade ist also keine Koordination mit Föderationen nötig.`,
    pl_PL: `Wydanie główne ze znacznie szybszymi płatnościami Lightning.

Fedimint 0.12.0 znacząco zmniejsza opóźnienia płatności w całym stosie, dzięki czemu płatności przez twoją bramkę realizują się zauważalnie szybciej. Bramka może teraz także całkowicie opróżnić swój portfel on-chain — poprawnie uwzględniając opłaty — a interfejs zyskuje edytowalne opłaty kanałów, podgląd łącznej płynności przychodzącej/wychodzącej oraz ręcznie połączone węzły, które są zachowywane po restartach.

To wydanie zawiera również wzmocnienia bezpieczeństwa dostarczone już w linii 0.11. Łączy się z federacjami zarówno na bieżącej, jak i na wcześniejszych wersjach, więc aktualizacja nie wymaga koordynacji z federacjami.`,
    fr_FR: `Version majeure avec des paiements Lightning nettement plus rapides.

Fedimint 0.12.0 réduit considérablement la latence des paiements sur l'ensemble de la pile, de sorte que les paiements via votre passerelle aboutissent sensiblement plus vite. La passerelle peut désormais aussi vider entièrement son portefeuille on-chain — en comptabilisant correctement les frais — et l'interface gagne des frais de canaux modifiables, une vue d'ensemble de la liquidité totale entrante/sortante et des pairs connectés manuellement qui persistent après redémarrage.

Cette version inclut aussi le renforcement de sécurité déjà livré dans la ligne 0.11. Elle se connecte aux fédérations sur les versions actuelles comme antérieures, aucune coordination avec les fédérations n'est donc requise pour la mise à niveau.`,
  },
  migrations: {},
})
