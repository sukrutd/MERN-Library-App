const Book = require('../models/Book');
const asyncManager = require('../utils/asyncManager');
const ErrorMessage = require('../utils/ErrorMessage');

/**
 * @title   Create new book
 * @route   POST /api/v1/books
 * @access  Public
 */
exports.createBook = asyncManager(async (req, res, next) => {
    const newbook = await Book.create(req.body);
    return res.status(201).json({ success: true, data: newbook });
});

/**
 * @title   Get all books
 * @route   GET /api/v1/books
 * @access  Public
 */
exports.getAllBooks = asyncManager(async (req, res, next) => {
    const books = await Book.find();
    return res.status(200).json({ success: true, total: books.length, data: books });
});

/**
 * @title   Get single book
 * @route   GET /api/v1/books/:id
 * @access  Public
 */
exports.getSingleBook = asyncManager(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) return next(new ErrorMessage('This book is not available.', 404));

    return res.status(200).json({ success: true, data: book });
});

/**
 * @title   Get published books
 * @route   GET /api/v1/books/published
 * @access  Public
 */
exports.getPublishedBooks = asyncManager(async (req, res, next) => {
    const books = await Book.find({ published: true });
    return res.status(200).json({ success: true, total: books.length, data: books });
});

/**
 * @title   Update book
 * @route   PATCH /api/v1/books/:id
 * @access  Public
 */
exports.updateBook = asyncManager(async (req, res, next) => {
    let book = await Book.findById(req.params.id);

    if (!book) return next(new ErrorMessage('This book is not available.', 404));

    book = await Book.findOneAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    return res.status(200).json({ success: true, data: book });
});

/**
 * @title   Delete book
 * @route   DELETE /api/v1/books/:id
 * @access  Public
 */
exports.deleteBook = asyncManager(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) return next(new ErrorMessage('This book is not available.', 404));

    await book.remove();

    return res.status(200).json({ success: true, data: {} });
});
