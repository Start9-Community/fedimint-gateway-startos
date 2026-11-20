import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:3',
  releaseNotes: {
    en_US:
      'With a local Bitcoin node or LND selected, and that service too old to publish the credentials the gateway reads, the gateway no longer fails to start: it waits and tells you which one to update.',
    es_ES:
      'Con un nodo Bitcoin local o LND seleccionado, y ese servicio demasiado antiguo para publicar las credenciales que lee la pasarela, la pasarela ya no falla al iniciarse: espera y le indica cuál actualizar.',
    de_DE:
      'Mit ausgewähltem lokalem Bitcoin-Node oder LND, und wenn dieser Dienst zu alt ist, um die vom Gateway gelesenen Zugangsdaten bereitzustellen, startet das Gateway nicht mehr fehlerhaft: Es wartet und sagt Ihnen, welchen Dienst Sie aktualisieren müssen.',
    pl_PL:
      'Gdy wybrano lokalny węzeł Bitcoin lub LND, a ta usługa jest zbyt stara, by udostępniać dane uwierzytelniające odczytywane przez bramkę, bramka nie kończy już uruchamiania błędem: czeka i informuje, którą usługę zaktualizować.',
    fr_FR:
      "Avec un nœud Bitcoin local ou LND sélectionné, et ce service trop ancien pour publier les identifiants que lit la passerelle, la passerelle n'échoue plus au démarrage : elle attend et vous indique lequel mettre à jour.",
  },
  migrations: {},
})
