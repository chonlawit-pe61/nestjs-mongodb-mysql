import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
    if (checkUser) {
      return 'User already exists';
    } else {
      const user = await this.userModel.create(createUserDto);
      user.save();
      return 'User created successfully';
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  getUser(username: string) {
    const user = this.userModel.find({ username }).exec();
    return user;
  }
}
