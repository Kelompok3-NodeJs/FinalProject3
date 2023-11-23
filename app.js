const express = require('express');
const app = express();

const router = require('./routes/index');
const db = require('./models');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

module.exports = app
