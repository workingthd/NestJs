import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserController } from '../controllers/users.controller'
import { User } from '../models/users.model'
import { UserService } from "../services/users.service";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports: [SequelizeModule.forFeature([User]), JwtModule.register({
        secret: "txend",
        signOptions: { expiresIn: '6000s' },
    }),],
    providers: [UserService, JwtStrategy],
    controllers: [UserController]
})
export class UserModule { }