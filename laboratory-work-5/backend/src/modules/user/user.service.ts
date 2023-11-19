import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../database/entities/User';
import { USER_REPOSITORY } from '../../database/providers/user.provider';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }
}
