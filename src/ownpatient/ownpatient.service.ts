import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateOwnpatientDto } from './dto/create-ownpatient.dto';
import { UpdateOwnpatientDto } from './dto/update-ownpatient.dto';
import { Ownpatient, OwnpatientDocument } from './entities/ownpatient.entity';

@Injectable()
export class OwnpatientService {
  constructor(
    @InjectModel(Ownpatient.name)
    private ownpatientModel: Model<OwnpatientDocument>,
  ) {}
  async create(
    createOwnpatientDto: CreateOwnpatientDto,
  ): Promise<ResponseServiceInterface> {
    try {
      const ownPatient = await this.ownpatientModel.create(createOwnpatientDto);
      return { data: await ownPatient.save(), statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findAll(): Promise<ResponseServiceInterface> {
    try {
      return { data: await this.ownpatientModel.find(), statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findByMedecin(id: string): Promise<ResponseServiceInterface> {
    try {
      return {
        data: await this.ownpatientModel.find({ doctorId: id }),
        statusCode: 200,
      };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findOne(id: string): Promise<ResponseServiceInterface> {
    try {
      return { data: await this.ownpatientModel.findById(id), statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async update(
    id: string,
    updateOwnpatientDto: UpdateOwnpatientDto,
  ): Promise<ResponseServiceInterface> {
    try {
      return {
        data: await this.ownpatientModel.findByIdAndUpdate(
          id,
          updateOwnpatientDto,
        ),
        statusCode: 200,
      };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async remove(id: string): Promise<ResponseServiceInterface> {
    try {
      return {
        data: await this.ownpatientModel.findByIdAndDelete(id),
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
