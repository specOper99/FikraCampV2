const { EntitySchema } = require('typeorm');
const { Book } = require('../models/book')

module.exports = new EntitySchema({
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        price: {
            type: "float",
            nullable: false,
        },
        authorId: {
            type: "int",
        },
    },
    name: "book",
    target: Book,
});