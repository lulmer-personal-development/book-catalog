const express = require('express');
const router = new express.Router();
const catalog = require('../controllers/book-catalog.controllers')

router.get('/init', catalog.initializeCatalog);

router.get('/books', catalog.getAllBooks);

router.get("/books/:id", catalog.getBookById);

router.post("/books", catalog.createBook);

router.delete("/books", catalog.deleteAllBooks);

router.delete("/books/:id", catalog.deleteBookById);

module.exports = router;