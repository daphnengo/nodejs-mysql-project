const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejs-mysql',
  password: '', // enter password of the database host
});

module.exports = pool.promise();
