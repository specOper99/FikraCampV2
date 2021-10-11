const { findById: findByIdShared } = require('./shared');

class Book {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}

const books = [
    new Book(1, "Data Structures and Functions", 10.99),
    new Book(2, "Programming Fundamentals", 12.99),
];

function addAuthor(value) {
    books.push(new Book(value.id, value.title, value.price));
}

function findById(id) {
    return findByIdShared(books, id) ?? {
        message: "No book found"
    }
}

module.exports = {
    books,
    add: addAuthor,
    findById,
}