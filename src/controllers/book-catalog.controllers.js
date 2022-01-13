const database = require("../db");

const initializeCatalog = (req, res) => {
    sql = "CREATE TABLE IF NOT EXISTS books (id int NOT NULL AUTO_INCREMENT, name varchar(255), author varchar(255), keywords varchar(1000), PRIMARY KEY(id))";

    database.query(sql, (err, result) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send({error: err.message})
            return;
        }

        res.status(200).send({message: "Table created successfully"});
    });
}

const getAllBooks = (req, res) => {
    sql = "SELECT * FROM books";

    const keyword = req.query.keyword;
    if(keyword) {
        sql += " WHERE keywords LIKE ?";
    }

    database.query(sql, ['%' + keyword + '%'], (err, result) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send({error: err.message})
            return;
        };

        var books = [];
        result.forEach((row) => {
            var book = queryToBook(row);
            books.push(book);
        });
        res.status(200).json(books);
    });
};

const getBookById = (req, res) => {
    sql = "SELECT * FROM books WHERE id=?";

    database.query(sql, [req.param.id], (err, result) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send({error: err.message})
            return;
        };

        if (result.length) {
            res.status(200).json(queryToBook(result[0]));
            return;
        }

        res.status(404).send({error: "No Book Found"})
    });
};

function queryToBook(result) {
    const book = {
        id: result.id,
        name: result.name,
        author: result.author,
        keywords: result.keywords.split(",")
    }

    return book;
}

const createBook = (req, res) => {
    sql = "INSERT INTO books SET ?";

    if (!req.body) {
        res.status(400).send({message: "Body cannot be empty"});
        return;
    } else if (!req.body.name) {
        res.status(400).send({message: "Book name cannot be empty"});
        return;
    } else if (!req.body.author) {
        res.status(400).send({message: "Book author cannot be empty"});
        return;
    }

    const keywordArray = req.body.keywords;
    var keywordString = "";
    
    if (keywordArray && keywordArray.length > 0) {
        keywordString = keywordArray.join(",");
    }

    const book = {
        name: req.body.name,
        author: req.body.author,
        keywords: keywordString
    };

    database.query(sql, book, (err, row) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send({error: err.message})
            return;           
        };

        res.status(200).send({message: "Book created successfully"});
    });
};

const deleteAllBooks = (req, res) => {
    sql = "DELETE FROM books";

    database.query(sql, (err, result) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send({error: err.message})
            return;
        };

        deleteMsg = `${result.affectedRows} books deleted`;
        res.status(200).send({message: deleteMsg});
    });
}

const deleteBookById = (req, res) => {
    sql = "DELETE FROM books WHERE id=" + req.params.id;

    database.query(sql, (err, result) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send({error: err.message})
            return;
        };

        if (result.affectedRows == 0) {
            res.status(404).send({error: "No Book Found"});
            return;
        }

        res.status(200).send({message: "Book deleted successfully"});
    });
}

module.exports = {
    initializeCatalog,
    getAllBooks,
    getBookById,
    createBook,
    deleteAllBooks,
    deleteBookById
}