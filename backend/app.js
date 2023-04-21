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
  let fetchedUser = {login: req.body.login, password: req.body.password};
  const status = 'admin';
  con.execute("SELECT status FROM users where login like ?", [fetchedUser.login], (err, result, fields) => {
    console.log(result[0]);
    console.log(result[0].status);
    res.status(200).json({
      token: 'asddsa',
      expiresIn: 3600,
      status: result[0].status
    });
  });

});

app.post('/addUser', (req, res, next) => {
  bcrypt.hash(req.body.haslo, 10)
    .then(hash => {
      const user = {...req.body, haslo: hash};
      console.log(user);
      con.query("INSERT INTO users VALUES (null,?,?,?,?,?,?,?,?,?)",
        Object.values(user),
        (err,result) => {
          if (err) {
            console.log(err);
            res.status(500).json({message: "User adding failed"});
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
      });
    })
});

app.post('/addSubj', (req, res) => {
  const subj = {...req.body};
  console.log(Object.values(subj));
  con.query("INSERT INTO przedmioty VALUES (null,?,?,?,?,?,?)", Object.values(subj), (err, result) => {
    if(err) {
      return res.status(500).json({
        message: "Przedmiot adding failed"
      });
    }
    res.status(200).json({message: "Przedmiot dodany"});
  });
});

app.delete('/deleteUser/:imie/:nazwisko', (req, res) => {
  console.log(req.params.imie, req.params.nazwisko);
  res.status(200).json({message: 'successful delete'});
})

app.delete('/deleteSubj/:id', (req, res) => {
  console.log("smth del subj");
  console.log(req.params.id);
  res.status(200).json({message: 'successful delete'});
})


module.exports = app;
