import { EntitySchema } from 'typeorm';
import { Book } from '../models/book';

export default new EntitySchema({
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
        imagePath: {
            type: "varchar",
            nullable: false,
        },
        authorId: {
            type: "int",
            nullable: false
        },
    },
    name: "book",
    target: Book,
});