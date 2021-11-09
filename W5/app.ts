import * as express from 'express';
import * as cors from 'cors';
import { join } from 'path';


// ! Danger
// ? Primary
// TODO make them smile :)
//* █████████████████████████████████████████████████████╗
//* Loads the environment variables from the .env file ██╣║
import { config } from 'dotenv';                    //*██╣║
//*                                                    ██╣║
config();                                           //*██╣║
//* █████████████████████████████████████████████████████╝

import isAuth from './middlewares/isAuth';

import authorsRoutes from './author/routes/author';
import booksRoutes from './book/routes/book';
import authenticationRoutes from './auth/routes/';

import Book from './book/entity/book';
import Author from './author/entity/author';

import { createConnection } from "typeorm";

// create backend application
const app = express();

// ! U can use the middleware anywhere inside the express app
app.use(cors());

// app.use(express.json()) 

// creates connection with the database
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
    logging: true,
    synchronize: true,
}).then(connection => {


    app.use('/', authenticationRoutes)
    // we used express static middleware here to serve static files
    app.use('/images', express.static(join(__dirname, 'public', 'images')))

    // is a middleware for checking whether 
    // the user is logged in or not
    app.use(isAuth);
    app.use('/authors', authorsRoutes)
    app.use('/books', booksRoutes)
    app.listen(5500, 'localhost', () => {
        console.log("the server link is " + 'http://localhost:5500');
    })
}).catch(error => console.log(error));