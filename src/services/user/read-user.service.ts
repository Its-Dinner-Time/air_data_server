import { Injectable } from '@nestjs/common';
import { UserRepository } from './entity/user.repository';
import { User } from './entity/user.entity';

@Injectable()
export class ReadUserService {
  constructor(private readonly userRepo: UserRepository) {}

  getAll(): Promise<[User[], number]> {
    return this.userRepo.getAll();
  }
}
