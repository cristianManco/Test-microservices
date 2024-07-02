import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLogs, UserDocument } from '../entities/userLogs.entiyt';
import { CreateUserDto } from '../dtos/createUserLog.dto';
import { UpdateUserDto } from '../dtos/updateUserLog.dto';

@Injectable()
export class UserLogService {
  private readonly requestLimit = 100;

  constructor(
    @InjectModel(UserLogs.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserLogs> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<UserLogs[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserLogs> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserLogs> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async blockUser(id: string): Promise<UserLogs> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isBlocked = true;
    user.blockedAt = new Date();
    return user.save();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  async checkRequestLimit(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.requestCount += 1;
    if (user.requestCount > this.requestLimit) {
      user.isBlocked = true;
      user.blockedAt = new Date();
    }
    await user.save();
  }
}
