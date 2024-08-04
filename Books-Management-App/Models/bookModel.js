// model/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  genre: String,
  author: String,
  publishing_year: Number,
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
