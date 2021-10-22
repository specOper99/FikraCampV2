const express = require('express');

const app = express();
require('dotenv').config();

const isAuth = require('./middlewares/isAuth');

const authorsRoutes = require('./author/routes/author')
const booksRoutes = require('./book/routes/book')
const authenticationRoutes = require('./auth/routes/')

// ! U can use the middleware anywhere inside the express app
// app.use(express.json()) 

const { createConnection } = require("typeorm");

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "fikra",
    entities: [
        require('./author/entity/author'),
        require('./book/entity/book'),
    ],
    logger: 'simple-console',

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