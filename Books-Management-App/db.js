// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connection = mongoose.connect(process.env.MONGODB_URI)

module.exports = {connection}


