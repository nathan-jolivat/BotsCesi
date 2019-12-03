var mysql = require('mysql');

class Mysql {
    constructor(host, user, password, database) {
        this.MysqlConnection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });

        this.MysqlConnection.connect(function(err) {
            if (err) throw err;
            console.log("Successfully connected to DB !");
        });
    }

    getUserInformationsFromName(name)
    {
        let request = "SELECT * FROM users WHERE firstname = '" + name + "';";

        this.MysqlConnection.query(request, function (err, result) {
            if (err) throw err;

            return result[0];
        });
    }
}

module.exports = Mysql;
