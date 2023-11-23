const express = require('express');
const app = express();

const router = require('./routes/index');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });  

module.exports = app
