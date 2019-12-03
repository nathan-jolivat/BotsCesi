const Discord = require('discord.js');
const bot = new Discord.Client();
const Mysql = require('./Services/Mysql');

DB = new Mysql("10.244.128.161","bot","botcesi","bot");

bot.on('ready', function () {
    console.log("Je suis connecté !")
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

                console.log(mysqlResult);

                break;
        }
    }
});

bot.login('NjUxMzk1NDM5Njc3MDE0MDE3.XeZjQQ.BsMxs-pTu4BrqQjZqiLervEp_as');
