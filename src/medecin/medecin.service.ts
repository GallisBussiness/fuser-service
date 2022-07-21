import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import {
  CreateUserDto,
  ROLES,
  STATUS_USER,
  TYPE_USER,
} from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { genRanNumber } from 'src/utils/Helpers';
import { CreateMedecinDto } from './dto/create-medecin.dto';
import { UpdateMedecinDto } from './dto/update-medecin.dto';
import { Medecin, MedecinDocument } from './entities/medecin.entity';

@Injectable()
export class MedecinService {
  constructor(
    @InjectModel(Medecin.name) private medecinModel: Model<MedecinDocument>,
    private userService: UserService,
  ) {}

  async create(createMedecinDto: CreateMedecinDto & CreateUserDto) {
    try {
      const { email, phoneNumber, password, ...rest } = createMedecinDto;
      const verif_cde = genRanNumber(6);
      const userField: CreateUserDto = {
        email,
        phoneNumber,
        password,
        type_user: TYPE_USER.MEDECIN,
        role: ROLES.USER,
        status: STATUS_USER.DISABLED,
        verification_code: verif_cde,
      };
      const res = await this.userService.create(userField);
      const { statusCode } = res;
      if (statusCode !== 200) return res;
      const {
        data: { _id },
      } = res;
      const medecinField: CreateMedecinDto = {
        email,
        phoneNumber,
        ...rest,
        userId: _id,
      };
      const createdMedecin = new this.medecinModel(medecinField);
      const medecin = await createdMedecin.save();
      return { data: medecin, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findAll() {
    try {
      const medecins = await this.medecinModel.find().exec();

      return { data: medecins, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findOne(id: string): Promise<ResponseServiceInterface> {
    try {
      const medecin = await this.medecinModel.findById(id);
      if (!medecin) throw new RpcException('user not found !');
      return { data: medecin, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findByUserId(id: Types.ObjectId): Promise<ResponseServiceInterface> {
    try {
      const medecin = await this.medecinModel.findOne({
        userId: new Types.ObjectId(id),
      });

      if (!medecin) throw new NotFoundException();
      return { data: medecin, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async update(
    id: string,
    updateMedecinDto: UpdateMedecinDto,
  ): Promise<ResponseServiceInterface> {
    try {
      const result = await this.medecinModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updateMedecinDto,
      );
      return { data: result, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async remove(id: Types.ObjectId): Promise<ResponseServiceInterface> {
    try {
      return {
        data: await this.medecinModel.findByIdAndDelete(id),
        statusCode: 200,
      };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async search(searchTerm: string): Promise<ResponseServiceInterface> {
    try {
      return {
        data: await this.medecinModel
          .find({
            $or: [
              { name: { $regex: '.*' + searchTerm + '.*' } },
              { ville: { $regex: '.*' + searchTerm + '.*' } },
            ],
          })
          .limit(10),
        statusCode: 200,
      };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }
}

// { $:text: { $search: searchTerm } }
