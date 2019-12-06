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
    var names = message.member.nickname.substring(0).split(" ");
    var firstname = names[0];

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

exports.addNewPromotion = function(message, args) {
    let newPromotionToAdd = "INSERT INTO `promotions`(`title`, `start_year`,`end_year`) VALUES ('" + args[0] + "', '" + args[1] + "', '" + args[2] + "');";

    let DBResult = DB.query(newPromotionToAdd, function (err, result) {
        if (err) throw err;

        message.reply("La promotion **" + args[0] + "** a bien été ajoutée :metal:");
    });
};
