import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import {
  CreateUserDto,
  ROLES,
  STATUS_USER,
  TYPE_USER,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<ResponseServiceInterface> {
    try {
      const createdUser = new this.userModel(createUserDto);
      const user = await createdUser.save();
      return { data: user, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async createSuperAdmin(
    createUserDto: CreateUserDto,
  ): Promise<ResponseServiceInterface> {
    return this.create({
      ...createUserDto,
      role: ROLES.SUPER_ADMIN,
      type_user: TYPE_USER.SUPER_ADMIN,
      status: STATUS_USER.ACTIVATE,
    });
  }

  async registerUserFromGoogle(
    createUserDto: CreateUserDto,
  ): Promise<ResponseServiceInterface> {
    try {
      const { phoneNumber } = createUserDto;
      const { data: u } = await this.findByUsername(phoneNumber);
      if (u !== null) throw new RpcException('user already exists');
      const userGoogle = { ...createUserDto, isGoogle: true };
      const createdUser = new this.userModel(userGoogle);
      const user = await createdUser.save();
      // await this.mailService.sendUserConfirmation(user);
      return { data: user, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findAll(): Promise<ResponseServiceInterface> {
    try {
      const users = await this.userModel.find().exec();
      return { data: users, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findOne(id: string): Promise<ResponseServiceInterface> {
    try {
      const user = await this.userModel.findById(id);
      return { data: user, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async ifadmin(): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ role: ROLES.SUPER_ADMIN });
      return user !== null;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findByUsername(username: string): Promise<ResponseServiceInterface> {
    try {
      const user = await this.userModel.findOne({
        $or: [{ email: username }, { phoneNumber: username }],
      });
      if (user !== null) {
        // this.event.emit('user.created', user);
        return { data: user, statusCode: 200 };
      }
      return { data: null, statusCode: 404 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
      );
      return { data: result, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async remove(id: string): Promise<ResponseServiceInterface> {
    try {
      const r = await await this.userModel.findByIdAndDelete(id);
      return { data: r, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }
}
