const fs = require('fs');
const path = require('path');

class Author {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    static copyFromData(id, name, age) {
        const author = new Author(id, name, age);
        return author;
    }

    toString() {
        return `${this.name} ${this.age}`;
    }
}

function addAuthor(value) {
    const authors = getAuthors();
    const author = Author.copyFromData(authors[authors.length - 1].id + 1, value.name, value.age);
    authors.push(author);
    writeToFile(authors);
    return author;
}

const readFile = () => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'authors.json')));
const writeToFile = (authors) => fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'authors.json'),
    JSON.stringify(authors)
);

const getAuthors = () => readFile();
const getAuthorById = (id) => getAuthors().find(author => author.id == id);
const getAuthorIndexById = (id) => getAuthors().findIndex(author => author.id == id);
const deleteAuthor = (id) => {
    const authors = getAuthors();
    const deletedAuthor = authors.splice(getAuthorIndexById(id), 1)
    writeToFile(authors)
    return deletedAuthor;
}
const updateAuthor = (id, updatedAuthor) => {
    const authors = getAuthors();
    const index = getAuthorIndexById(id);
    if (updatedAuthor.name) authors[index].name = updatedAuthor.name;
    if (updatedAuthor.age) authors[index].age = updatedAuthor.age;
    writeToFile(authors)
    return authors[index];
}


module.exports = {
    getAuthors,
    getAuthorById,
    addAuthor,
    deleteAuthor,
    updateAuthor,
}