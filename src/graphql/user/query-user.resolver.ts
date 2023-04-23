import { Query, Resolver } from '@nestjs/graphql';
import { ReadUserService } from 'src/services/user/read-user.service';

@Resolver('User')
export class QueryUserResolver {
  constructor(private readonly readUserService: ReadUserService) {}

  @Query()
  async getUserAll() {
    const [users] = await this.readUserService.getAll();
    return users;
  }
}
