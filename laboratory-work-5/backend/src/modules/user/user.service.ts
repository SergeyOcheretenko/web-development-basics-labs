import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../database/entities/User';
import { USER_REPOSITORY } from '../../database/providers/user.provider';
import { CreateUserRequest } from './request/create-user.request';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(createUserRequest: CreateUserRequest): Promise<UserDto> {
    const { password, ...userData } = createUserRequest;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create<User>({
      ...userData,
      passwordHash,
    });
    return UserDto.fromEntity(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll<User>();
    return users.map(UserDto.fromEntity);
  }

  async findOneByEmail(email: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne<User>({ where: { email } });
    return user ? UserDto.fromEntity(user) : null;
  }

  async findOneById(id: number): Promise<UserDto | null> {
    const user = await this.userRepository.findOne<User>({ where: { id } });
    return user ? UserDto.fromEntity(user) : null;
  }

  async deleteOneById(id: number): Promise<void> {
    await this.userRepository.destroy({ where: { id } });
  }
}
