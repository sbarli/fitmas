const express = require('express');
const moment = require('moment');

const app = express();
const PORT = 8080;
const listeningCB = () => {
  process.env.NODE_ENV
    ? console.log(`${moment()}: ${process.env.NODE_ENV} server listening on port ${PORT}`)
    : console.log(`${moment()}: default server listening on port ${PORT}`)
};

app.use((req, res) => res.sendStatus(200));

app.listen(PORT, listeningCB);