const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
const path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
const Crud = require('./Services/Crud');
const express = require('express');
const app = express();

const Bcrypt = require('./Services/Bcrypt');

const BOT_ID = 185884367128756224;

var DB = mysql.createConnection({
        //host: "10.244.128.161",
        host: "localhost",
        user: "bot",
        password: "botcesi",
        database: "bot"
});

DB.connect(function(err) {
    if (err) throw err;
    console.log("🔒 Système d'authentification connecté");
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    var firstname = request.body.firstname;
    var password = request.body.password;
    if (firstname && password) {
        let encryptedPassword = Bcrypt.cryptPassword(password);


        DB.query('SELECT * FROM users WHERE firstname = ? AND password = ?', [firstname, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.firstname = firstname;
                response.redirect('/dashboard');
            } else {
                response.send("Prénom ou mot de passe incorrect !");
            }
            response.end();
        });
    } else {
        response.send("Veuillez saisir un prénom et un mot de passe");
        response.end();
    }
});

app.get('/dashboard', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.firstname + '!');
    } else {
        response.sendFile(path.join(__dirname + '/not-allowed.html'));
    }
    response.end();
});

app.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
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
        }
    }
});

bot.login('NjUxMzk1NDM5Njc3MDE0MDE3.XeeJjA.7XsrQe6omY-M2gCMoM0pnRq0VL8');

app.listen(3000, function () {
    console.log('📡 Application admin accessible sur le port 3000')
});
