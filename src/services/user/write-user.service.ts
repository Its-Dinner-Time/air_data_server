import { Injectable } from '@nestjs/common';
import { UserRepository } from './entity/user.repository';
import { IUser } from './interfaces/user.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class WriteUserService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepo: UserRepository,
  ) {}

  createUser(user: IUser) {
    return this.dataSource.transaction(async () => {
      return this.userRepo.createUser(user);
    });
  }
}
