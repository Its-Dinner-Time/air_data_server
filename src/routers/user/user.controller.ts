import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/services/user/entity/user.entity';
import { ReadUserService } from 'src/services/user/read-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { WriteUserService } from 'src/services/user/write-user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly readUserService: ReadUserService,
    private readonly writeUserService: WriteUserService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll(): Promise<[User[], number]> {
    return this.readUserService.getAll();
  }

  @Post()
  newUser(@Body() createUserDto: CreateUserDto) {
    return this.writeUserService.createUser(createUserDto);
  }
}
