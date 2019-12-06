const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
const path = require('path');
const Crud = require('./Services/Crud');
const token = require('./token');

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
            case 'mesCours':
                    Crud.getMyLessons(message, args);
                break;
        }
    }
});

bot.login(token.token);
