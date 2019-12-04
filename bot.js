const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
const path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();

const Mysql = require('./Services/Mysql');
const Bcrypt = require('./Services/Bcrypt');

var DB = mysql.createConnection({
        host: "10.244.128.161",
        user: "bot",
        password: "botcesi",
        database: "bot"
});

DB.connect(function(err) {
    if (err) throw err;
    console.log("✅ Connecté à la base de données");
});
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

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
        response.send('Please login to view this page!');
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
    bot.user.setActivity('Bryan Coder', { type: 'LISTENING' });
    console.log("🤖 Bot connecté au Serveur Discord");
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
                        "**Âge** : " + result[0].age + " ans \n" +
                        "L'utilisateur " + isAdminMessage
                    );
                });

                break;
            case 'adduser':
                console.log(message.guild.name);

                let newUserRequest = "INSERT INTO `users`(`firstname`, `lastname`, `email`, `age`) VALUES ('" + args[0] + "', '" + args[1] + "', '" + args[2] + "' ,'" + args[3] + "');";

                console.log(newUserRequest);
                DB.query(newUserRequest, function (err, result) {
                    if (err) throw err;

                    message.reply("L'utilisateur **" + args[0] + " " + args[1] +"** a bien été ajouté 🍻");
                });

                break;
            case 'moi':
                var names = message.member.nickname.substring(0).split(" ");
                var firstname = names[0];

                console.log(firstname);

                let currentUserInfos = "SELECT * FROM users WHERE firstname = '" + firstname + "';";

                DB.query(currentUserInfos, function (err, result) {
                    if (err) throw err;

                    let isAdminMessage = result[0].is_admin ? "est **Administrateur**" : "n'es pas Administrateur.";

                    message.reply("Voici tes informations : " +
                        "\n**Prénom** : " + result[0].firstname + "\n" +
                        "**Nom** : " + result[0].lastname + "\n" +
                        "**Âge** : " + result[0].age + " ans \n" +
                        "Tu " + isAdminMessage
                    );
                });
                break;
        }
    }
});

function getCampusList()
{
    let campusListRequest = "SELECT * FROM campus;";

    let DBResult = DB.query(campusListRequest, function (err, result) {
        if (err) throw err;

        return result[0];
    });
    return DBResult;
}


bot.login('NjUxMzk1NDM5Njc3MDE0MDE3.Xedi-A.AkhaoPEiwS7ldy_u3NX5NxwUH5I');

app.listen(3000, function () {
    console.log('📡 Application admin accessible sur le port 3000')
});
