const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt')

class Author {
    constructor(id, name, age, email, password) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
        this.privileges = 0;
        if (`${this.email}`.endsWith('@edu.iq'))
            this.privileges = 1;
    }

    static copyFromData = (id, name, age, email, password) =>
        new Author(id, name, age, email, password);

    toString = () =>
        `${this.name} ${this.age}`;
}

function addAuthor(value) {
    const authors = getAuthors();
    try {
        const password = bcrypt.hashSync(value.password, 7)
        const author = Author.copyFromData((authors[authors.length - 1]?.id ?? 0) + 1, value.name, value.age, value.email, password);
        authors.push(author);
        writeToFile(authors);
        return author;
    } catch (err) {
        return { message: err }
    }

}

const readFile = () => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'authors.json')));
const writeToFile = (authors) => fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'authors.json'),
    JSON.stringify(authors)
);

const getAuthors = () => readFile();
const getAuthorById = (id) => getAuthors().find(author => author.id == id);
const getAuthorByCredentials = ({ email, password }) => getAuthors().find(author => author.email == email && bcrypt.compareSync(password, author.password));

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
    if (updatedAuthor.password) authors[index].password = updatedAuthor.password;
    writeToFile(authors)
    return authors[index];
}


module.exports = {
    Author,
    getAuthors,
    getAuthorById,
    addAuthor,
    deleteAuthor,
    updateAuthor,
    getAuthorByCredentials,
}