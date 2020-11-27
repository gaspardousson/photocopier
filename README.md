# photocopier

Bot Discord stockant des photos en les référençant avec un code unique. Particulièrement utile pour des cours à distance !

### Configuration

Le bot enregistre les codes avec les urls des messages associés dans le fichier `data.txt` qui doit donc nécessairement être dans le même dossier que le bot.
Chaque code est sous la forme `YYYYMMDDSII`, avec `YYYY`l'année du message, `MM` le mois, `DD` le jour, `S` le sujet et `II` un indice unique.
Il est possible de configurer `s` et `i` avant le lancement, pendant le fonctionnement, le bot incrémente automatiquement l'indice.

### Commandes

Il existe plusieurs commandes à envoyer dans un salon auquel il a accès pour contrôler le bot pendant son fonctionnement.
`!take` permet de devenir utilisateur, seule personne dont il traite les photos. Il faut alors donner le mot de passe, à configurer dans le code directement.
`!input` permet de configurer le salon dans lequel la commande est envoyé comme celui où prendre les photos.
`!output` permet de configurer le salon dans lequel la commande est envoyé comme celui où sera stocké les photos.
`!output2` (optionnel) permet de configurer le salon dans lequel la commande est envoyé comme celui où sera envoyé en parallèle les photos, sans code ni stockage.
`!ref` permet de référencer le prochain message envoyé dans le salon _output_ comme un chapitre, le code associé sera YYYYMMDDS sans indice.
`!switch` permet de cesser d'être utilisateur. Le mot de passe est immédiatement demandé et ainsi quelqu'un d'autre peut immédiatement reprendre la main.
`!lock` permet de cesser d'être utilisateur. Il est nécessaire de réutiliser `!take` alors.
Dans les deux derniers cas, les salons configurés ne changent pas. Il n'y a de réinitialisation totale que si le bot est coupé puis relancé.

### Informations

`?user` renvoie le nom de l'utilisateur actuel (_false_ s'il n'y en a pas).
`?index` renvoie le code de la prochaine photo théorique.
`?last`renvoie la dernière photo (_None_ s'il n'y en a pas).
