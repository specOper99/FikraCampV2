const express = require('express');

const app = express();
require('dotenv').config();

const isAuth = require('./middlewares/isAuth');

const authorsRoutes = require('./author/routes/author')
const booksRoutes = require('./book/routes/book')
const authenticationRoutes = require('./auth/routes/')

// ! U can use the middleware anywhere inside the express app
// app.use(express.json()) 
app.use('/', authenticationRoutes)

app.use(isAuth);

app.use('/authors', authorsRoutes)
app.use('/books', booksRoutes)


app.listen(3000, 'localhost', () => {
    console.log("the server link is " + 'http://localhost:3000');
})