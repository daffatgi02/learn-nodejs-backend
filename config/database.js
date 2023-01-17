const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '34.126.124.112',
  user: 'root',
  password: '',
  database: 's40_daffa_db'
});

module.exports = connection;
