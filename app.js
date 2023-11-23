const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const db = require('./models');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});