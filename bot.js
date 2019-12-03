const Discord = require('discord.js');
const bot = new Discord.Client();
var mysql = require('./Services/database');

bot.on('ready', function () {
    console.log("Je suis connecté !")
});

bot.on('message', message => {
    if (message.content.substring(0, 1) === '+') {
        if (message.content === '+ping') {
            message.reply('ça suffit je suis un bot pas votre esclave ! :(');
        }
    }
});

bot.login('NjUxMzk1NDM5Njc3MDE0MDE3.XeZe4g.BvJSzt3YkBDi3eG-6kIDYMkwoQw');
