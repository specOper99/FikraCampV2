const fs = require('fs');
const path = require('path');
const { getAuthorById } = require('../../author/models/author')


class Book {
    constructor(id, title, price, authorId) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.authorId = authorId;
    }

    static copyFromData = (id, title, price, authorId) =>
        new Book(id, title, price, authorId);

    toString = () =>
        `${this.title}: ${this.price}, written by ${this.authorId}`;
}

function addBook(value) {
    if (!getAuthorById(value.authorId))
        return ({ message: "Author not found", })
    const books = getBooks();
    const book = Book.copyFromData(
        (books[books.length - 1]?.id ?? 0) + 1,
        value.title,
        value.price,
        value.authorId);
    books.push(book);
    writeToFile(books);
    return book;
}

const readFile = () => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json')));
const writeToFile = (books) => fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'books.json'),
    JSON.stringify(books)
);

const getBooks = () => readFile();
const getBookById = (id) => getBooks().find(book => book.id == id);
const getBookIndexById = (id) => getBooks().findIndex(book => book.id == id);
const deleteBook = (id) => {
    const books = getBooks();
    const deletedBook = books.splice(getBookIndexById(id), 1)
    writeToFile(books)
    return deletedBook;
}
const updateBook = (id, updatedBook) => {
    const books = getBooks();
    const index = getBookIndexById(id);
    if (updatedBook.title) books[index].title = updatedBook.title;
    if (updatedBook.price) books[index].price = updatedBook.price;
    writeToFile(books)
    return books[index];
}


module.exports = {
    getBooks,
    getBookById,
    addBook,
    deleteBook,
    updateBook,
}