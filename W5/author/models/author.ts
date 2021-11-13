import { compare, hash } from 'bcrypt';
import { Book } from '../../book/models/book';

import { getRepository, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column()
    age!: number;

    @Column({ length: 255 })
    email!: string;

    @Column({ length: 70 })
    password!: string;

    @Column({ type: "tinyint" })
    privileges!: number;

    @OneToMany(type => Book, book => book.author)
    books?: Book[];

    static async createNewAuthor(name: string, age: number, email: string, password: string): Promise<Author> {
        const author = new Author();
        author.name = name;
        author.age = age;
        author.email = email;
        author.password = await hash(password, 7);
        author.privileges = 0;
        if (email.endsWith("@edu.iq"))
            author.privileges = 1;
        return author;
    }
}




const authorService = (): {
    addAuthor: Function,
    getAuthors: Function,
    getAuthorById: Function,
    getAuthorByEmail: Function,
    getAuthorByCredentials: Function,
    deleteAuthor: Function,
    updateAuthor: Function,
} => {

    async function addAuthor(value: {
        name: string,
        email: string,
        password: string,
        age: number,
    }, authorRepository = getRepository(Author)): Promise<Author | { message: string }> {
        try {
            return (await authorRepository.save(await Author.createNewAuthor(value.name, value.age, value.email, value.password)));
        } catch (err) {
            return { message: `${err}` }
        }
    }

    const getAuthors =
        (authorRepository = getRepository(Author)): Promise<Author[]> => authorRepository.find();

    //////////////////////////////////////////////////////////////////////////////////////////

    const getAuthorById = (id: number, authorRepository =
        getRepository(Author)): Promise<Author | undefined> => authorRepository.findOne(id);

    //////////////////////////////////////////////////////////////////////////////////////////

    const getAuthorByCredentials =
        async ({ email, password }: { email: string, password: string }, authorRepository =
            getRepository(Author)): Promise<Author | undefined> => {
            const author = await getAuthorByEmail(email);
            if ((!author) || (!(await compare(password, author!.password)))) {
                return undefined;
            }
            return author;
        };

    const getAuthorByEmail = async (email: string, authorRepository =
        getRepository(Author)): Promise<Author | undefined> => {
        const author = await authorRepository.findOne({ where: { email } });
        return author;
    };

    //////////////////////////////////////////////////////////////////////////////////////////

    const deleteAuthor =
        async (id: number, authorRepository = getRepository(Author)) => {
            return await authorRepository.delete(id);
        }

    //////////////////////////////////////////////////////////////////////////////////////////

    const updateAuthor =
        async (id: number, updatedAuthor: {
            name: string,
            age: number,
            password: string,
        }, authorRepository = getRepository(Author)) => {
            //     return await authorRepository.query('Update author set name = ":name" , age = ":age" , password = ":password"  where id = :id ', {
            //         name: updatedAuthor.name,
            //         age: updatedAuthor.age,
            //         password: updatedAuthor.password,
            //         id: id,
            //     })

            const author = await getAuthorById(id);
            if (!author) {
                return undefined;
            }
            if (updatedAuthor.name) author!.name = updatedAuthor.name;
            if (updatedAuthor.age) author!.age = updatedAuthor.age;
            if (updatedAuthor.password) author!.password = updatedAuthor.password;

            return await authorRepository.save(author!)
        }


    return {
        addAuthor,
        getAuthors,
        getAuthorById,
        getAuthorByEmail,
        getAuthorByCredentials,
        deleteAuthor,
        updateAuthor,
    };
}





export default authorService();
    // getAuthors,
    // getAuthorById,
    // addAuthor,
    // deleteAuthor,
    // updateAuthor,
    // getAuthorByCredentials,
