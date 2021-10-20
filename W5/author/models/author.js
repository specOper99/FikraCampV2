const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt')

class Author {
    constructor(name, age, email, password) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
        this.privileges = 0;
        if (`${this.email}`.endsWith('@edu.iq'))
            this.privileges = 1;
    }

    static copyFromData = (name, age, email, password) =>
        new Author(name, age, email, password);

    toString = () =>
        `${this.name} ${this.age}`;
}

const { getRepository } = require('typeorm');

const writeToFile = (authors) => fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'authors.json'),
    JSON.stringify(authors)
);


const authorService = () => {

    async function addAuthor(value, authorRepository = getRepository(Author)) {
        try {
            const password = bcrypt.hashSync(value.password, 7)
            return (await authorRepository.save(new Author(value.name, value.age, value.email, password)));
        } catch (err) {
            return { message: err }
        }
    }

    const getAuthors =
        (authorRepository = getRepository(Author)) => authorRepository.find();

    //////////////////////////////////////////////////////////////////////////////////////////

    const getAuthorById = (id, authorRepository =
        getRepository(Author)) => authorRepository.findOne(id);

    //////////////////////////////////////////////////////////////////////////////////////////

    const getAuthorByCredentials =
        ({ email, password }) => getAuthors().find(author => author.email == email && bcrypt.compareSync(password, author.password));

    //////////////////////////////////////////////////////////////////////////////////////////

    const getAuthorIndexById =
        (id, authorRepository = getRepository(Author)) => getAuthors().findIndex(author => author.id == id);

    //////////////////////////////////////////////////////////////////////////////////////////

    const deleteAuthor =
        (id, authorRepository = getRepository(Author)) => {
            const authors = getAuthors();
            const deletedAuthor = authors.splice(getAuthorIndexById(id), 1)
            writeToFile(authors)
            return deletedAuthor;
        }

    //////////////////////////////////////////////////////////////////////////////////////////

    const updateAuthor =
        (id, updatedAuthor, authorRepository = getRepository(Author)) => {
            const authors = getAuthors();
            const index = getAuthorIndexById(id);
            if (updatedAuthor.name) authors[index].name = updatedAuthor.name;
            if (updatedAuthor.age) authors[index].age = updatedAuthor.age;
            if (updatedAuthor.password) authors[index].password = updatedAuthor.password;
            writeToFile(authors)
            return authors[index];
        }


    return {
        addAuthor,
        getAuthors,
        getAuthorById,
        getAuthorByCredentials,
        deleteAuthor,
        updateAuthor,
    };
}


module.exports = {
    Author,
    ...authorService(),
    // getAuthors,
    // getAuthorById,
    // addAuthor,
    // deleteAuthor,
    // updateAuthor,
    // getAuthorByCredentials,
}