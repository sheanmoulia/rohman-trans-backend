const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sthefanymoulia.31",
    database: "rohman_trans"
});

connection.connect((err) => {
    if (err) {
        console.error("Database gagal terhubung:", err);
        return;
    }

    console.log("MySQL Connected");
});

module.exports = connection;