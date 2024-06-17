import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.shema';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {

        createUserDto.password = await this.userHash(createUserDto.password)

        const createdBook = new this.userModel(createUserDto);
        return createdBook.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-password');
    }

    async findUser(username) {
        return this.userModel.findOne({ username: username })
    }

    private async userHash(pass) {
        const saltOrRounds = 10

        const hashedPass = await bcrypt.hash(pass, saltOrRounds);
        return hashedPass
    }
}