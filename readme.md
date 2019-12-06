# Bot Discord basé sur Node.js et Express
Ce bot Discord va permettre d'interagir avec une base de données, pour récupérer des informations relatives 
à des `élèves` et à des `cours` en fonction du `campus` dans 
lequel se trouve l'élève.

Il utilise les paquets NPM de dépendances suivants :
 
- discord.js
 express
- body-parser 
- path
- express

## Installation

### Récupération du projet

**Placez vous** dans le dossier ou vous souhaitez vous rendre : 

`cd /to/your/path/project/folder`

**Clonez** le projet depuis Github : 

`$ git clone https://github.com/YannickJack/BotsCesi.git`

### Installation des dépendances projet

**Exécutez** cette commande pour installer les dépendances Javascript via npm :

`npm i`

## Configuration

### Token discord
Vous devez avoir configuré et crée un bot Discord actif, et présenr sur un serveur. 
Via votre portail Développeur Discord : https://discordapp.com/developers

Vous devez donc copier/coller le fichier `token-template.json` en `token.json` et y ajouter votre token : 

```json
{
  "token": "PLACEZ_VOTRE_TOKEN_ICI"
}
```

### Base de données

Lancez votre client SQL préféré (Navicat, HeidiSQL, ou encore PhpMyAdmin) créez une nouvelle base de données `bot`, puis importez le fichier `schema.sql` présent à la racine du projet.


Vous êtes censés avoir la structure de base de données suivante après import : 

```
--- bot
\_ users
\_ campus
\_ cours
```

## Démarrage de l'application

**Placez-vous** dans votre répertoire projet à la racine, puis **lancez** la commande `node bot.js` dans votre terminal.

🚀 Votre application fonctionne maintenant correctement, et est également accessible sur le port `3000`


## Pages d'interaction

Ajouter un nouveau cours : 
👉 http://localhost:3000/ajouter-cours

Attacher un cours à un utilisateur :
👉 http://localhost:3000/ajouter-cours
