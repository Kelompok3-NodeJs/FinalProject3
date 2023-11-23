require("dotenv").config()
process.env.NODE_ENV = 'development';
process.env.DATABASE_URL = 'postgresql://postgres:AcgG43*eDdce6g3E*d6ddFe4d2c4C144@monorail.proxy.rlwy.net:11456/railway';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });

