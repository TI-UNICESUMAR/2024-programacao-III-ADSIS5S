import BookModel from './book.schema'

export class BookService {
    async create(book: any) {
        const createdBook = await BookModel.create(book)

        return createdBook
    }

    async findById(id: any) {
        const findedBook = await BookModel.findById(id)
        return findedBook
    }
}