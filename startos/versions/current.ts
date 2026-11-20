import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:3',
  releaseNotes: {
    en_US:
      'With a local Bitcoin node selected and a Bitcoin too old to publish the RPC credential the gateway reads, the gateway no longer fails to start: it waits and tells you to update Bitcoin.',
    es_ES:
      'Con un nodo Bitcoin local seleccionado y un Bitcoin demasiado antiguo para publicar la credencial RPC que lee la pasarela, la pasarela ya no falla al iniciarse: espera y le indica que actualice Bitcoin.',
    de_DE:
      'Mit ausgewähltem lokalem Bitcoin-Node und einem Bitcoin, das zu alt ist, um die vom Gateway gelesenen RPC-Zugangsdaten bereitzustellen, startet das Gateway nicht mehr fehlerhaft: Es wartet und fordert Sie auf, Bitcoin zu aktualisieren.',
    pl_PL:
      'Gdy wybrano lokalny węzeł Bitcoin, a Bitcoin jest zbyt stary, by udostępniać dane uwierzytelniające RPC odczytywane przez bramkę, bramka nie kończy już uruchamiania błędem: czeka i prosi o aktualizację Bitcoina.',
    fr_FR:
      "Avec un nœud Bitcoin local sélectionné et un Bitcoin trop ancien pour publier l'identifiant RPC que lit la passerelle, la passerelle n'échoue plus au démarrage : elle attend et vous invite à mettre Bitcoin à jour.",
  },
  migrations: {},
})
