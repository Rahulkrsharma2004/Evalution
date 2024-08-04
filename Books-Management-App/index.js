const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');
const bookRoutes = require('./Routes/bookRoutes');
const rateLimiterMiddleware = require('./Middlewares/rateLimiterMiddleware');
require('dotenv').config();
const {connection} = require("./db")

const app = express();
const PORT = process.env.PORT || 8800;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
require('./db');

// Routes
app.use('/users', userRoutes);
app.use('/books', rateLimiterMiddleware, bookRoutes);
app.use('/',(req,res)=>{
    res.status(200).send({"msg":"home page"})
})

app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Express server running on port ${PORT} and db is also connected`)

    } catch (error) {
        console.log(error)
    }

})
