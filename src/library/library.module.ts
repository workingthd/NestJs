import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LibraryController } from '../controllers/library.controller'
import { Book } from '../models/book.model'
import { LibraryService } from "../services/library.service";

@Module({
    imports: [SequelizeModule.forFeature([Book])],
    providers: [LibraryService],
    controllers: [LibraryController]
})
export class LibraryModule { }