const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'hostname',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

connection.connect();

const app = express();
const port = 3000;

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
