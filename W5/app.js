const express = require('express');

const app = express();

const authorsRoutes = require('./routes/author')
const bookRoutes = require('./routes/book')


app.use('/authors', authorsRoutes)
app.use('/books', bookRoutes)


app.listen(3000, 'localhost', () => {
    console.log("the server link is " + 'http://localhost:3000');
})