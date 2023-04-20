const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const propertiesReader = require('properties-reader');
const bcrypt = require('bcrypt');

const properties = propertiesReader(__dirname + '\\config\\database.properties', {writer: {saveSections: true}});
const con = mysql.createConnection({
  host: properties.get('host'),
  user: properties.get('user'),
  password: properties.get('password'),
  database: properties.get('database')
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected to database");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post('/login', (req, res, next) => {
  let fetchedUser = {email: req.body.email, };
  const status = 'admin';
  con.execute("SELECT * FROM books3",(err, result, fields) => console.log(result));
  res.status(200).json({
    token: 'asddsa',
    expiresIn: 3600,
    status: status
  })
});

app.post('/addUser', (req, res, next) => {
  console.log("got");
  bcrypt.hash(req.body.haslo, 10)
    .then(hash => {
      console.log("hashed");
      const user = {
        status: req.body.status,
        nazwisko: req.body.nazwisko,
        imie: req.body.imie,
        login: req.body.login,
        email: req.body.email,
        adres: req.body.adres,
        telefon: req.body.telefon,
        klasa: +req.body.klasa,
        haslo: hash
      };
      console.log(Object.values(user));
      con.query("INSERT INTO users VALUES (null,?,?,?,?,?,?,?,?,?)",
        Object.values(user),
        (err,res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        }
      );
      res.status(200).json({
        message: "User successfully added"
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "User adding failed"
      })
    })
});


module.exports = app;
