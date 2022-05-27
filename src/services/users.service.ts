import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/users.model";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) { }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    async createUser(user: User): Promise<User> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(user.password, saltOrRounds);
        const UserData = { "name": user.name, "username": user.username, "email": user.email, "password": hash, "contact": user.contact }
        const newUser = new this.userModel(UserData);
        return newUser.save();
    }
    async userLogin(data) {
        const alldata = await this.userModel.findOne({
            where: {
                email: data.email
            },
        });
        if (alldata != null) {
            if (await bcrypt.compare(data.password, alldata.password) == true) {
                return { username: alldata.username, sub: alldata.id, email: alldata.email }
            } else {
                return "invalid email and password"
            }
        } else {
            return "invalid email and password"
        }

    }

}