/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailDto } from './dto/create-mail.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly emailService: MailService) {}

  @MessagePattern('login')
  login(@Payload() username: string) {
    return this.userService.findByUsername(username);
  }

  // eslint-disable-next-line
  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('createSuperAdmin')
  createSuperAdmin(@Payload() createUserDto: CreateUserDto) {
    return this.userService.createSuperAdmin(createUserDto);
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('ifadmin')
    async ifAdmin() {
    return await this.userService.ifadmin();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id:string) {
    return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: string) {
    return this.userService.remove(id);
  }

  @MessagePattern('sendMail')
  sendMail(@Payload() mailDto: MailDto) {
    return this.emailService.sendMail(mailDto.to,mailDto.message, "Subject");
  }
}
