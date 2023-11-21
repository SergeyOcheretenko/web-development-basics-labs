import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { LoginRequest } from './request/login.request';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const match = await this.comparePassword(password, user.passwordHash);
    if (!match) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = user;
    return userData;
  }

  private async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, passwordHash);
    return match;
  }

  public async login({ email, password }: LoginRequest) {
    const user = await this.validateUser(email, password);

    const token = await this.generateToken(user);
    return { user, token };
  }

  private async generateToken(user: Omit<UserDto, 'passwordHash'>) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
}
