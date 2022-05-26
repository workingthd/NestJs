import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/users.model";

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
    //addBook
    async createBook(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }
    async userLogin(data) {
        const alldata = await this.userModel.findOne({
            where: {
                email: data.email, password: data.password
            },
        });
        if (alldata != null) {
            const payload = { username: alldata.username, sub: alldata.id, email: alldata.email }
            return payload
        } else {
            return "invalid email and password"
        }

    }

}