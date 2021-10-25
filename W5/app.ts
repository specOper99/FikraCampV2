import * as express from 'express';
// require('dotenv').config();
import isAuth from './middlewares/isAuth';

import authorsRoutes from './author/routes/author';
import booksRoutes from './book/routes/book';
import authenticationRoutes from './auth/routes/';

import Book from './book/entity/book';
import Author from './author/entity/author';

import { createConnection } from "typeorm";


const app = express();

// ! U can use the middleware anywhere inside the express app
// app.use(express.json()) 


createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "fikra",
    entities: [
        Book,
        Author,
    ],
    logger: 'simple-console',
    // logging: true,
    synchronize: true,
}).then(connection => {

    app.use('/', authenticationRoutes)
    const path = require('path');
    app.use('/image', express.static(path.join(__dirname, 'public', 'images')))

    // app.use(isAuth);
    app.use('/authors', authorsRoutes)
    app.use('/books', booksRoutes)


    app.listen(3000, 'localhost', () => {
        console.log("the server link is " + 'http://localhost:3000');
    })
}).catch(error => console.log(error));