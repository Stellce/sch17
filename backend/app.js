const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.send('dsa');
});

module.exports = app;
