const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
const path = require('path');
const Crud = require('./Services/Crud');

const BOT_ID = 185884367128756224;

var DB = mysql.createConnection({
        //host: "10.244.128.161",
        host: "localhost",
        user: "root",
        password: "",
        database: "bot"
});

DB.connect(function(err) {
    if (err) throw err;
    console.log("🔒 Système d'authentification connecté");
});

bot.on('ready', function () {
    bot.user.setActivity("Pisser du code", { type: 'PLAYING' });
    console.log("🤖 Bot connecté au Serveur Discord");
});

bot.on('message', message => {
    if (message.content.substring(0, 1) === '?') {
        var args = message.content.substring(1).split(" ");
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'lui':
                    Crud.getUserInformationsByFirstname(message, args);
                break;
            case 'newUser':
                    Crud.addUser(message, args);
                break;
            case 'moi':
                    Crud.getCurrentUserInformations(message, args);
                break;
            case 'campusList':
                    Crud.getCampusList(message, args);
                break;
            case 'newPromotion':
                let promotionName = args.join(" ");
                console.log(promotionName);
                message.reply("Ok, on a bien reçu le nom de promotion que tu veux");
                //addNewPromotion(message, args);
                break;
            case 'allCour':
                    Crud.getAllCour(message, args);
                break;
            case 'MyCour':
                    Crud.getMyCour(message, args);
                break;
            case 'today':
                    Crud.getMyCourtoday(message, args);
                break;
                
        }
    }
});

bot.login('NjUxMzk1NDM5Njc3MDE0MDE3.XeofAw.JJDj_jRdsGHMj9EFnukjN5vVKQ4');