import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "../models/book.model";

@Injectable()
export class LibraryService {
    constructor(
        @InjectModel(Book)
        private bookModel: typeof Book
    ) { }

    async findAll(): Promise<Book[]> {
        return this.bookModel.findAll({
            where: {
                isAvailable: true,
            },
        });
    }

    async findOne(id: string): Promise<Book> {
        return this.bookModel.findOne({
            where: {
                id,
            },
        });
    }
    async createBook(book: Book): Promise<Book> {
        const newBook = new this.bookModel(book);
        return newBook.save();
    }

    async addbook(data, id) {
        const addBook = await this.bookModel.findOne({
            where: {
                id: data.id,
            }
        });
        if (addBook == null) {
            return 'This Book Is Not Avaliable In This Library'
        }
        else if (addBook.userRef == "" && addBook.isAvailable == true) {
            const adddata = await this.bookModel.update({ userRef: id, isAvailable: false }, { where: { id: data.id } })
            return `You are Hired Book Your Ref ${id}`
        }
        else {
            const addBook = await this.bookModel.findOne({
                where: {
                    id: data.id,
                }
            });
            return `Already Hired This Book Ref ${addBook.userRef} You Cannot Hired Book`
        }

    }

    async findByUser(id) {
        return this.bookModel.findAll({
            where: {
                userRef: id
            },
        });
    }


}