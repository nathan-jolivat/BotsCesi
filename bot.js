const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
const path = require('path');
const express = require('express');
const app = express();

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname+'/login.html'));
});

let DB = mysql.createConnection({
    host: "10.244.128.161",
    user: "bot",
    password: "botcesi",
    database: "bot"
});


DB.connect(function(err) {
    if (err) throw err;
    console.log("✅ Connecté à la base de données");
});

bot.on('ready', function () {
    console.log("✅ Connecté avec succès au Serveur Discord");
});

bot.on('message', message => {
    if (message.content.substring(0, 1) === '?') {
        var args = message.content.substring(1).split(" ");
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'lui':

                let userInfosRequest = "SELECT * FROM users WHERE firstname = '" + args[0] + "';";

                DB.query(userInfosRequest, function (err, result) {
                    if (err) throw err;

                    let isAdminMessage = result[0].is_admin ? "est **Administrateur**" : "n'est pas Administrateur.";

                    message.reply("Voici les informations de l'utilisateur **" + args[0] +"** : " +
                        "\n**Prénom** : " + result[0].firstname + "\n" +
                        "**Nom** : " + result[0].lastname + "\n" +
                        "**Âge** : " + result[0].age + "\n" + " ans" +
                        "L'utilisateur " + isAdminMessage
                    );
                });

                break;
            case 'moi':
                console.log(message.guild.name);

                let newUserRequest = "INSERT INTO `users`(`firstname`, `lastname`, `email`, `age`) VALUES ('" + args[0] + "', '" + args[1] + "', '" + args[2] + "' ,'" + args[3] + "');";

                console.log(newUserRequest);
                DB.query(newUserRequest, function (err, result) {
                    if (err) throw err;

                    message.reply("L'utilisateur **" + args[0] + args[1] +"** a bien été ajouté 🍻");
                });

                break;
        }
    }
});

bot.login('NjUxMzk1NDM5Njc3MDE0MDE3.XeZ0wg.7yLjvlOFgv3KkbNytjB2JtQfIa8');

app.listen(3000, function () {
    console.log('✅ Application admin accessible sur le port 3000')
});
