// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const BookController = require('../Controllers/bookController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.use(authMiddleware); // Apply authentication middleware to all book routes

router.post('/add', BookController.addBook);
router.get('/', BookController.getAllBooks);
router.patch('/update/:id', BookController.updateBook);
router.delete('/delete/:id', BookController.deleteBook);

module.exports = router;
