var mysql = require('mysql');

var con = mysql.createConnection({
    host: "10.244.128.161",
    user: "bot",
    password: "botcesi",
    database: "bot"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB !");
    /*
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    */
});
