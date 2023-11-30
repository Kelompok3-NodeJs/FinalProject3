require("dotenv").config()
const Environtment = process.env.NODE_ENV;

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

