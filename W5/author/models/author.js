const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt')

class Author {
    constructor(name, age, email, password) {
        this.id;
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

    const deleteAuthor =
        async (id, authorRepository = getRepository(Author)) => {
            return await authorRepository.delete(id);
        }

    //////////////////////////////////////////////////////////////////////////////////////////

    const updateAuthor =
        async (id, updatedAuthor, authorRepository = getRepository(Author)) => {
            //     return await authorRepository.query('Update author set name = ":name" , age = ":age" , password = ":password"  where id = :id ', {
            //         name: updatedAuthor.name,
            //         age: updatedAuthor.age,
            //         password: updatedAuthor.password,
            //         id: id,
            //     })

            const author = await getAuthorById(id);
            if (updatedAuthor.name) author.name = updatedAuthor.name;
            if (updatedAuthor.age) author.age = updatedAuthor.age;
            if (updatedAuthor.password) author.password = updatedAuthor.password;

            return await authorRepository.save(author)
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