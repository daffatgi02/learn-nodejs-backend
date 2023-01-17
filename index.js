const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const connection = require('./config');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Membuat data
app.post('/users', (req, res) => {
  const { nama, umur, agama } = req.body;
  connection.query('INSERT INTO users (nama, umur, agama) VALUES (?, ?, ?)', [nama, umur, agama], (error, results) => {
    if (error) throw error;
    res.status(201).send(`User added with ID: ${results.insertId}`);
  });
});

// Membaca semua data yang berada di DB
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


// Mengupdate Data
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { nama, umur, agama } = req.body;
  connection.query('UPDATE users SET nama = ?, umur = ?, agama = ? WHERE id = ?', [nama, umur, agama, id], (error, results) => {
    if (error) throw error;
    res.send(`User modified with ID: ${id}`);
  });
});

// Mendelete Data
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(`User deleted with ID: ${id}`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
