import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:0',
  releaseNotes: {
    en_US:
      'Updated Fedimint to 0.12.2, a security release that fixes a bug in LNv2 payment handling that could cause the gateway to lose funds, and hardens its Lightning payment paths. Full notes: https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
    es_ES:
      'Fedimint actualizado a 0.12.2, una versión de seguridad que corrige un error en el manejo de pagos LNv2 que podía hacer que la pasarela perdiera fondos, y refuerza sus rutas de pago Lightning. Notas completas: https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
    de_DE:
      'Fedimint auf 0.12.2 aktualisiert, ein Sicherheitsrelease, das einen Fehler in der LNv2-Zahlungsverarbeitung behebt, durch den das Gateway Guthaben verlieren konnte, und seine Lightning-Zahlungswege härtet. Vollständige Versionshinweise: https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
    pl_PL:
      'Zaktualizowano Fedimint do 0.12.2, wydania bezpieczeństwa, które naprawia błąd w obsłudze płatności LNv2 mogący spowodować utratę środków przez bramkę, oraz wzmacnia jej ścieżki płatności Lightning. Pełne informacje o wydaniu: https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
    fr_FR:
      'Fedimint mis à jour vers 0.12.2, une version de sécurité qui corrige un bogue dans le traitement des paiements LNv2 pouvant faire perdre des fonds à la passerelle, et renforce ses chemins de paiement Lightning. Notes complètes : https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
  },
  migrations: {},
})
