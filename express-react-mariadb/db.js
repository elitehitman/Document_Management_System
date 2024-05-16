// db.js

const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'gaubauch',
    database: 'my_database',
    connectionLimit: 5,
});

module.exports = pool;


