const express = require('express');
const {
    createBook,
    getAllBooks,
    getSingleBook,
    getPublishedBooks,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

const router = express.Router();

router.route('/').get(getAllBooks).post(createBook);

router.route('/:id').get(getSingleBook).patch(updateBook).delete(deleteBook);

router.route('/published').get(getPublishedBooks);

module.exports = router;
