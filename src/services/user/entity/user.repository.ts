import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  getAll() {
    return this.repository.findAndCount();
  }

  createUser(user: IUser) {
    const model = this.repository.create(user);
    return this.repository.insert(model);
  }
}
