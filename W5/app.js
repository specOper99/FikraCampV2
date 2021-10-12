const express = require('express');

const app = express();

const authorsRoutes = require('./author/routes/author')


app.use('/authors', authorsRoutes)


app.listen(3000, 'localhost', () => {
    console.log("the server link is " + 'http://localhost:3000');
})