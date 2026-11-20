import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:2',
  releaseNotes: {
    en_US: `Requires StartOS 0.4.2 or later.

- With a local Bitcoin node as its Bitcoin backend, the gateway now reads only Bitcoin's RPC cookie, and can no longer read Bitcoin's other files. Update Bitcoin to its latest release before updating the gateway.
- StartOS backups do not include the gateway; its 12-word secret phrase is what recovers it. If you have not written it down, do it now: open the Gateway Interface and enter your admin password in the Gateway Secret Phrase card. The service instructions describe how to recover.`,
    es_ES: `Requiere StartOS 0.4.2 o posterior.

- Con un nodo Bitcoin local como backend Bitcoin, la pasarela ahora lee solo la cookie RPC de Bitcoin y ya no puede leer los demás archivos de Bitcoin. Actualice Bitcoin a su última versión antes de actualizar la pasarela.
- Las copias de seguridad de StartOS no incluyen la pasarela; su frase secreta de 12 palabras es lo que permite recuperarla. Si aún no la ha anotado, hágalo ahora: abra la Gateway Interface e introduzca su contraseña de administrador en la tarjeta Gateway Secret Phrase. Las instrucciones del servicio explican cómo recuperarla.`,
    de_DE: `Erfordert StartOS 0.4.2 oder neuer.

- Mit einem lokalen Bitcoin-Node als Bitcoin-Backend liest das Gateway jetzt nur noch das RPC-Cookie von Bitcoin und kann die übrigen Dateien von Bitcoin nicht mehr lesen. Aktualisieren Sie Bitcoin auf die neueste Version, bevor Sie das Gateway aktualisieren.
- StartOS-Backups enthalten das Gateway nicht; seine geheime Phrase aus 12 Wörtern ist es, womit es wiederhergestellt wird. Falls Sie sie noch nicht notiert haben, tun Sie es jetzt: Öffnen Sie die Gateway Interface und geben Sie Ihr Admin-Passwort in der Karte Gateway Secret Phrase ein. Die Anleitung des Dienstes beschreibt die Wiederherstellung.`,
    pl_PL: `Wymaga StartOS 0.4.2 lub nowszego.

- Z lokalnym węzłem Bitcoin jako backendem Bitcoin bramka odczytuje teraz tylko plik cookie RPC Bitcoina i nie może już odczytać innych plików Bitcoina. Zaktualizuj Bitcoin do najnowszej wersji przed aktualizacją bramki.
- Kopie zapasowe StartOS nie obejmują bramki; to jej 12-wyrazowa fraza tajna pozwala ją odzyskać. Jeśli jeszcze jej nie zapisałeś, zrób to teraz: otwórz Gateway Interface i wpisz hasło administratora na karcie Gateway Secret Phrase. Instrukcje usługi opisują, jak ją odzyskać.`,
    fr_FR: `Nécessite StartOS 0.4.2 ou ultérieur.

- Avec un nœud Bitcoin local comme backend Bitcoin, la passerelle ne lit désormais que le cookie RPC de Bitcoin et ne peut plus lire les autres fichiers de Bitcoin. Mettez Bitcoin à jour vers sa dernière version avant de mettre à jour la passerelle.
- Les sauvegardes StartOS n'incluent pas la passerelle ; c'est sa phrase secrète de 12 mots qui permet de la récupérer. Si vous ne l'avez pas encore notée, faites-le maintenant : ouvrez la Gateway Interface et saisissez votre mot de passe administrateur dans la carte Gateway Secret Phrase. Les instructions du service décrivent la récupération.`,
  },
  migrations: {},
})
