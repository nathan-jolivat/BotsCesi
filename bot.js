const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require();

bot.on('ready', function () {
    console.log("Je suis connecté !")
});

bot.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong !')
    }
})

bot.login("NjUxMzk1NDM5Njc3MDE0MDE3.XeZUzw.5HcXp38YEPn5T3FUsE8O8eBZrAE");
