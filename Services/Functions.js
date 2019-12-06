var mysql = require('mysql');

var DB = mysql.createConnection({
    host: "localhost",
    user: "bot",
    password: "botcesi",
    database: "bot"
});

DB.connect(function(err) {
    if (err) throw err;

    console.log("✅ Connecté à la base de données");
});

exports.getCampusList = function(message) {
    let campusListRequest = "SELECT * FROM campus;";

    let DBResult = DB.query(campusListRequest, function (err, result) {
        if (err) throw err;

        result.forEach(function(campus) {

            message.reply("Voici les informations pour le campus **" + campus.name + "** : \n" +
                "Addresse : " + campus.address + "\n" +
                "Code postal : " + campus.zip_code + "\n" +
                "Ville : " + campus.city + "\n" +
                "Total d'élèves associés : " + campus.total_students);
        })
    });
};

exports.getCurrentUserInformations = function(message, args) {
    let names = message.member.nickname.substring(0).split(" ");
    let firstname = names[0];

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
};

exports.addUser = function(message, args) {
    let newUserRequest = "INSERT INTO `users`(`firstname`, `lastname`, `email`, `age`) VALUES ('" + args[0] + "', '" + args[1] + "', '" + args[2] + "' ,'" + args[3] + "');";

    DB.query(newUserRequest, function (err, result) {
        if (err) throw err;

        message.reply("L'utilisateur **" + args[0] + " " + args[1] +"** a bien été ajouté 🍻");
    });
};

exports.getUserInformationsByFirstname = function(message, args) {
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
};

exports.getMyLessons = function(message, args) {
    let names = message.member.nickname.substring(0).split(" ");
    let firstname = names[0];

    let getUserIdFromFirstnameQuery = "SELECT id FROM users WHERE firstname = '" + firstname + "';";


    DB.query(getUserIdFromFirstnameQuery, function (err, parentResult) {
        if (err) throw err;

        let getLessonsRequest = "SELECT * FROM cours WHERE user_id ='" + parentResult[0].id +"'";

        DB.query(getLessonsRequest, function (err, result) {
            if (err) throw err;

            if (result.length > 0) {
                result.forEach(function(cours) {
                    let dateOptions = { timeZone: "Europe/Paris",
                        hour12: false,
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    };
                    message.reply("Le cours de la journée que tu as à suivre est : **" + cours.title + "**. \n\n" +
                        "Voici les informations complémentaires : \n\n" +
                        ":mortar_board: Intitulé du cours : " + cours.title + "\n" +
                        ":date: Date de début : " + cours.start_at.toLocaleDateString('fr-fr', dateOptions) + "\n" +
                        ":date: Date de fin : " + cours.end_at.toLocaleDateString('fr-fr', dateOptions) + "\n" +
                        ":man_teacher: Intervenant / Professeur : " + cours.teacher);
                });
            } else {
                message.reply("Tu n'a pas de cours en vue, profite bien de ton repos :zzz:");
            }
        });
    });
};

exports.getUsersList = function() {
    let allStudentsQuery = "SELECT firstname, lastname, email FROM users;";

    DB.query(allStudentsQuery, function(err, result) {
       if (err) throw err;

       return result;
    });
};
