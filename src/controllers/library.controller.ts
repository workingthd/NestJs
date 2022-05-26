import { Body, Controller, Get, HttpStatus, Param, Post, Res, Put, Delete } from "@nestjs/common";
import { Book } from "../models/book.model";
import { LibraryService } from "../services/library.service";

@Controller('books')
export class LibraryController {
    constructor(private readonly libraryService: LibraryService) { }

    @Post()
    async createBook(@Res() response, @Body() book: Book) {
        const newBook = await this.libraryService.createBook(book);
        return response.status(HttpStatus.CREATED).json({
            newBook
        })
    }

    @Get("")
    async fetchAll(@Res() response) {
        const books = await this.libraryService.findAll();
        return response.status(HttpStatus.OK).json({
            books
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const book = await this.libraryService.findOne(id);
        return response.status(HttpStatus.OK).json({
            book
        })
    }

    @Put("/:id")
    async addbook(@Res() response, @Body() data, @Param('id') id) {
        const BookStatus = await this.libraryService.addbook(data, id);
        return response.status(HttpStatus.CREATED).json({
            BookStatus
        })
    }

    @Get('mybooks/:id')
    async findByUserId(@Res() response, @Param('id') id) {
        const book = await this.libraryService.findByUser(id);
        return response.status(HttpStatus.OK).json({
            book
        })
    }



}