# photocopier

Les codes sont au format `YYYYMMDDSII` avec `YYYY` l'année d'envoi de la pièce jointe, `MM` le mois, `DD` le jour, `S` le numéro du sujet (à configurer dans le code directement pour l'instant) et `II` le numéro de la pièce jointe envoyée, commençant à `00` puis s'incrémentant à chaque envoi.

### Commandes
`!take` pour devenir `user`, demande un code à quatre chiffres généré aléatoirement au lancement disponible dans la console.
###
`!lock` pour cesser d'être `user`, n'importe qui peut alors le devenir à nouveau avec le code en utilisant `!take`.
###
`!switch` pour cesser d'être `user`, le code est immédiatemment demandé sans passer par `!take` pour des échanges de rôle plus rapide.
###
`!input` pour définir le salon comme salon où seront envoyées les pièces jointes à enregistrer (seules celle de `user` seront considérées).
###
`!output` pour définir le salon comme salon où seront enregistrées les pièces jointes envoyées. Elles y apparaissent avec leurs codes de référence.
###
`!output2` pour définir le salon comme salon où des copies des pièces jointes envoyées seront disponibles, sans code ni enregistrement.
###
`!ref` pour associer au prochain message envoyé dans ce salon un code unique de référence sans `II` pour servir de sommaire.
###
`?user` renvoie le nom d'utilisateur du `user` actuel.
###
`?index` renvoie le code qui sera associé à la prochaine pièce jointe.
###
`?last` renvoie une copie de la précédente pièce jointe envoyée.
