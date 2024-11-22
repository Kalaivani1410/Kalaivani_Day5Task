const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'taxi_booking',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// Create table if it doesn't exist
db.query(`CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pickup VARCHAR(255),
  dropoff VARCHAR(255),
  fare INT
)`, (err, result) => {
  if (err) throw err;
  console.log('Bookings table created or already exists.');
});

// API endpoints
app.get('/bookings', (req, res) => {
  db.query('SELECT * FROM bookings', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/bookings', (req, res) => {
  const { pickup, dropoff, fare } = req.body;
  db.query('INSERT INTO bookings (pickup, dropoff, fare) VALUES (?, ?, ?)', [pickup, dropoff, fare], (err, result) => {
    if (err) throw err;
    res.status(201).send('Booking successful');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
