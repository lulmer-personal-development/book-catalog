# book-catalog

## Requirements
* Node v16.13
* MySQL v8.0

## Description

This program is a simple book cataloging system that stores the book's name, author, and some associated keywords for searching. It is
interacted with using REST APIs that allow for creating books within the catalog, retrieving from the catalog, and deleting from the catalog.

## Getting Started

To get started you must first create a database in a MySQL installation then fill out the .env file values with sql credentials. The env file is located in the main directory.

Example:
DB_HOST=localhost
DB_USER=user
DB_PASS=pass
DB_NAME=book_catalog

Once this this is done you can run the program with the command

>node index.js

When running for the first time, you should first hit the endpoint /init to create the table to begin populating the catalog.

## API

Retrieval
GET /books - Will return all book entries in the catalog table
GET /books?keyword={kw} - Will return all books with an associated kw
GET /books/{id} - Will return a single book corresponding to the number id in the url

Creating
POST /books - Will create a book using information from the requests body. The body should include the book's name, author, and keywords
you wish to associate with the book.

Example:
{
    "name":"A Tale of Two Cities",
    "author":"Charles Dickens",
    "keywords": [
        "literature",
        "drama",
        "romance",
        "historical",
        "classic"
    ]
}

Deleting
DELETE /books - Will delete all books
DELETE /book - Will delete a single book corresponding to the number id in the url