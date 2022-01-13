const database = require("../db");

const getAllBooks = (req, res) => {
    sql = "SELECT * FROM books";

    database.query(sql, (err, result) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send({error: err.message})
            return;
        };

        res.status(200).json(result);
    });
};

const getBookById = (req, res) => {
    sql = "SELECT * FROM books WHERE id=" + req.params.id;

    database.query(sql, (err, result) => {
        if (err) {
            console.log('error: ', err);
            res.status(500).send({error: err.message})
            return;
        };

        if (result.length) {
            res.status(200).json(result[0]);
        }

        res.status(404).send({error: "No Book Found"})
    });
};

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

    const book = {
        name: req.body.name,
        author: req.body.author
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
    getAllBooks,
    getBookById,
    createBook,
    deleteAllBooks,
    deleteBookById
}