class Author {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

const authors = [
    new Author(1, "Ali", 30),
    new Author(2, "Zaid", 50),
];

function addAuthor(value) {
    authors.push(new Author(value.id, value.name, value.age));
}

module.exports = {
    authors,
    add: addAuthor
}