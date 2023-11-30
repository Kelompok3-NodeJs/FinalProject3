require("dotenv").config()
const Environtment = process.env.NODE_ENV;
const Database_URL = process.env.DATABASE_URL;
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: Database_URL,
});
//
pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database', err));

const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./routes');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Using the environment variable for specific configurations
if (Environtment === 'development') {
    // Perform specific actions or configurations for the development environment
    console.log('Running in development mode');
} else {
    // Handle other environments if needed
    console.log('Running in some other environment');
}

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });

