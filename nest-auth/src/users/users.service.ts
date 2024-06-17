import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.hashPass(createUserDto.password)
    const createdUser = this.userModel.create(createUserDto)
    return createdUser
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password')
  }

  async findUser(username: string) {
    return this.userModel.findOne({ name: username })
  }

  async hashPass(pass: string): Promise<string> {
    const saltRounds = 10
    const hashedPass = await bcrypt.hash(pass, saltRounds)
    return hashedPass
  }

}