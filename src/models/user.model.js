const db = require("../config/db");

const createUser = (data, callback) => {
    const sql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [data.name, data.email, data.password], callback);
};

const findByEmail = (email, callback) => {
    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
};

module.exports = {
    createUser,
    findByEmail
};