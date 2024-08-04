// controllers/bookController.js
const BookModel = require('../Models/bookModel');

const addBook = async (req, res) => {
  try {
    const { title, genre, author, publishing_year } = req.body;

    const newBook = new BookModel({
      title,
      genre,
      author,
      publishing_year,
    });

    const addedBook = await newBook.save();

    res.status(200).json({ msg: 'Book added', addedBook });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to add book' });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to fetch books' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, author, publishing_year } = req.body;

    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      { title, genre, author, publishing_year },
      { new: true }
    );

    res.status(200).json({ msg: 'Book has been updated', updatedBook });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to update book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(400).json({ error: 'Book not found' });
    }

    res.status(200).json({ msg: 'Book has been deleted', deletedBook });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to delete book' });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
