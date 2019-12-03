const Discord = require('discord.js');
const bot = new Discord.Client();
const Mysql = require('./Services/Mysql');
const express = require('express');
const app = express();

app.listen(3000, function () {
    console.log('✅ Application admin accessible sur le port 3000')
});

DB = new Mysql("10.244.128.161","bot","botcesi","bot");

bot.on('ready', function () {
    console.log("✅ Connecté avec succès au Serveur Discord");
});

bot.on('message', message => {
    if (message.content.substring(0, 1) === '?') {
        var args = message.content.substring(1).split(" ");
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'moi':
                message.reply("Moi aussi");
                break;
            case 'lui':
                let mysqlResult = DB.getUserInformationsFromName(args[0]);

                console.log(mysqlResult['firstname']);

                break;
        }
    }
});

bot.login('NjUxMzk1NDM5Njc3MDE0MDE3.XeZvwQ.WifXES6QqsmFW3bSLgIfDSdY3xU');
