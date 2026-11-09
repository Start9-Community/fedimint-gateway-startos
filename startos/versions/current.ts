import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:1',
  releaseNotes: {
    en_US:
      "Requires StartOS 0.4.1 or later. With LND as its Lightning backend, the gateway now reads only LND's TLS certificate and admin macaroon, and can no longer read LND's seed or other files. Requires LND 0.21.6-beta:3 or later.",
    es_ES:
      'Requiere StartOS 0.4.1 o posterior. Con LND como backend Lightning, la pasarela ahora lee solo el certificado TLS y el macaroon de administrador de LND, y ya no puede leer la semilla ni otros archivos de LND. Requiere LND 0.21.6-beta:3 o posterior.',
    de_DE:
      'Erfordert StartOS 0.4.1 oder neuer. Mit LND als Lightning-Backend liest das Gateway jetzt nur noch das TLS-Zertifikat und das Admin-Macaroon von LND und kann den Seed und andere Dateien von LND nicht mehr lesen. Erfordert LND 0.21.6-beta:3 oder neuer.',
    pl_PL:
      'Wymaga StartOS 0.4.1 lub nowszego. Z LND jako backendem Lightning bramka odczytuje teraz tylko certyfikat TLS i macaroon administratora LND i nie może już odczytać seeda ani innych plików LND. Wymaga LND 0.21.6-beta:3 lub nowszego.',
    fr_FR:
      'Nécessite StartOS 0.4.1 ou ultérieur. Avec LND comme backend Lightning, la passerelle ne lit désormais que le certificat TLS et le macaron administrateur de LND, et ne peut plus lire la seed ni les autres fichiers de LND. Nécessite LND 0.21.6-beta:3 ou ultérieur.',
  },
  migrations: {},
})
