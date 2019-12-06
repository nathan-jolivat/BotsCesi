const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
const path = require('path');
const Crud = require('./Services/Crud');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');


const token = require('./token');

var DB = mysql.createConnection({
    host: "localhost",
    user: "bot",
    password: "botcesi",
    database: "bot"
});

DB.connect(function(err) {
    if (err) throw err;
});

app.use('/public', express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/ajouter-cours', function(req, res) {
    res.sendFile(path.join(__dirname, './', 'add-lesson.html'));
});

app.get('/attacher-cours', function(req, res) {
    res.sendFile(path.join(__dirname, './', 'attach-lesson-to-user.html'));
});

app.post('/ajouter-cours/insertion', function(req, res) {

    let addNewLessonQuery = "INSERT INTO `cours`(`title`, `start_at`, `end_at`, `user_id`, `teacher`) VALUES ('" + req.body.title + "', '" + req.body.start_at + "', '" + req.body.end_at + "' ,'" + req.body.user_id + "', '" + req.body.teacher + "');";

    DB.query(addNewLessonQuery, function(err, result) {
        if (err) throw err;

        res.send(true);
    });
});

app.post('/attacher-cours/insertion', function(req, res) {
    let RemoveAllOlderAttachedUserLessons = "UPDATE `cours` SET `user_id` = NULL WHERE `user_id` = " + req.body.user_id + ";";

    DB.query(RemoveAllOlderAttachedUserLessons, function(err, parentResult) {
        if (err) throw err;

        let AttachUserToLessonQuery = "UPDATE `cours` SET `user_id` = " + req.body.user_id + " WHERE `id` = " + req.body.cours_id + ";";

        DB.query(AttachUserToLessonQuery, function(err, result) {
            if (err) throw err;
        });

        res.send(true);
    });


});

app.post('/liste-eleves', function(req, res) {
    let allStudentsQuery = "SELECT * FROM users;";

    DB.query(allStudentsQuery, function(err, result) {
        if (err) throw err;

        res.json(result);
    });
});

app.post('/liste-cours', function(req, res) {
    let allLessonsQuery = "SELECT * FROM cours;";

    DB.query(allLessonsQuery, function(err, result) {
        if (err) throw err;

        res.json(result);
    });
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
            case 'mesCours':
                    Crud.getMyLessons(message, args);
                break;
        }
    }
});

bot.login(token.token);

app.listen(3000, function () {
    console.log('📡 Application accessible sur le port 3000')
});
