/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const errorMiddleware = require('./middleware/errorMiddleware');
const ErrorMessage = require('./utils/ErrorMessage');
const bookRoutes = require('./routes/bookRoutes');

process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception 💣 🔥 - stopping the server');
    console.log(error.name, error.message);
    process.exit(1);
});

const app = express();

connectToDB();

app.use(express.json());

app.get('/api/v1/test', (req, res) => {
    res.json({ Test: 'Welcome to MERN Library API' });
});

app.use('/api/v1/books', bookRoutes);

app.all('*', (req, res, next) => {
    next(new ErrorMessage(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`));

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection 💣 🔥 - stopping the server');
    console.log(error.name, error.message);
    server.close(() => process.exit(1));
});
