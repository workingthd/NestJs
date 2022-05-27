import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../models/users.model";
import { UserService } from "../services/users.service";
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('users')
export class UserController {
    constructor(private readonly UserService: UserService, private readonly JwtService: JwtService) { }

    @Post()
    async createUser(@Res() response, @Body() User: User) {
        const newUser = await this.UserService.createUser(User);
        return response.status(HttpStatus.CREATED).json({
            newUser
        })
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const users = await this.UserService.findAll();
        return response.status(HttpStatus.OK).json({
            users
        })
    }
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const user = await this.UserService.findOne(id);
        return response.status(HttpStatus.OK).json({
            user
        })
    }

    @Post("login")
    async Userlogin(@Res() response, @Body() data) {
        const loginUser = await this.UserService.userLogin(data);
        if (typeof loginUser == "string") {
            return response.status(HttpStatus.CREATED).json({
                loginUser
            })
        } else {
            const token = await this.JwtService.sign(loginUser)
            return response.status(HttpStatus.CREATED).json({
                token
            })
        }

    }



}