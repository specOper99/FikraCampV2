const express = require('express');

const app = express();

const authorsRoutes = require('./routes/author')

app.use('/authors', authorsRoutes)

// /    
//  /:bookId ! return single book
// const books = [
//     {
//         id: "1",
//         category: "history",
//         title: "Some book",
//         price: 12.99,
//         description: "A great book",
//         author: "amazing user",
//     },
//     {
//         id: "3",
//         category: "history",
//         title: "Some book 3",
//         price: 23.99,
//         description: "A great book 3",
//         author: "amazing user 3",
//     },
//     {
//         id: "2",
//         category: "math",
//         title: "Some book 2",
//         price: 22.99,
//         description: "A great book 2",
//         author: "amazing user 2",
//     },
// ]

// app.use('/category/:category', (req, res, next) => {
//     return res.json(books.filter(val => val.category === req.params.category) ?? {
//         message: "Books not found",
//     })
//     //  Matched category inside the list
// })

// app.use('/:bookId', (req, res, next) => {
//     return res.json(books.find(val => val.id == parseInt(req.params.bookId)) ?? {
//         message: "Book not found",
//     })
//     //  Matched id inside the list
// })

// app.use('/', (req, res, next) => {
//     // return all books 
//     res.json(books)
// })


app.listen(3000, 'localhost', () => {
    console.log("the server link is " + 'http://localhost:3000');
})