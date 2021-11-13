import { DeleteResult, getRepository, Repository, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import authorModel, { Author } from '../../author/models/author';

@Entity({})
export class Book {
    @PrimaryGeneratedColumn({})
    id!: number;

    @Column({ length: 255 })
    title!: string;

    @Column()
    price!: number;

    @Column({ length: 255 })
    imagePath!: string;

    @ManyToOne(type => Author, author => author.books,{
        nullable: false
    })
    author!: number;
}


const bookService = () => {

    async function addBook(value: {
        title: string,
        price: number,
        imagePath: string,
        authorId: number,
    }, bookRepository: Repository<Book> = getRepository('Book')):
        Promise<Book | { message: string }> {
        if (!authorModel.getAuthorById(value.authorId))
            return ({ message: "Author not found", })
        const book = new Book();
        book.title = value.title;
        book.price = value.price;
        book.imagePath = value.imagePath;
        book.author = value.authorId;
        return await bookRepository.save(book);
    }

    const getBooks = async (bookRepository: Repository<Book> = getRepository('Book')
    ) => await bookRepository.find({
        select: [
            'id',
            'title',
            'price',
            'imagePath',
            'author',
        ],
        take: 10,
        skip: 0,
    });
    const getBookById = async (id: number, bookRepository: Repository<Book> = getRepository('Book')) => await bookRepository.findOne(id);
    const deleteBook = async (id: number, bookRepository: Repository<Book> = getRepository('Book')): Promise<DeleteResult | undefined> => await bookRepository.delete(id);
    const updateBook = async (id: number, updatedBook: {
        title: string,
        price: number,
    }, bookRepository: Repository<Book> = getRepository('Book')): Promise<Book | undefined> => {
        const book = await getBookById(id);
        if (!book)
            return undefined;
        if (updatedBook.title) book!.title = updatedBook.title;
        if (updatedBook.price) book!.price = updatedBook.price;
        return await bookRepository.save(book!)
    }


    return {
        addBook,
        getBooks,
        getBookById,
        deleteBook,
        updateBook,
    };
}

export default bookService();