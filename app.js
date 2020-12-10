const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.port || 7000;
const authorRoute = require('./routes/author');
const bookRoute = require('./routes/book');
const dotenv = requires('dotenv')

const app = express();
dotenv.config();

app.use(express.json());

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection
    .once('open', () => {
        console.log('Database connected')
    })
    .on('error', error => {
        console.log('My error', error)
    });

app.use('/library/author', authorRoute);
app.use('/library/book', bookRoute)
app.use(bodyParser.urlencoded({ extended : true }));

app.listen(port, () => console.log('Server is running on ' + port));