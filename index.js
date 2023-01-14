const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

//Config DB
const connection = mysql.createConnection({
  host: '66.118.234.39',
  user: 'u40_1fcVHWTpwn',
  password: '+qzCOyK9=bU6SoJOHzhvlQM!',
  database: 's40_daffa_db'
});
connection.connect();

// Membuat data
app.post('/users', (req, res) => {
  const { nama, umur, agama } = req.body;
  connection.query('INSERT INTO users (nama, umur, agama) VALUES (?, ?, ?)', [nama, umur, agama], (error, results) => {
    if (error) throw error;
    res.status(201).send(`User added with ID: ${results.insertId}`);
  });
});

// Membaca data
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
