import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginRequest } from './request/login.request';
import { SignUpRequest } from './request/signup.request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }

  @Post('signup')
  async signUp(@Body() signUpRequest: SignUpRequest) {
    await this.userService.create(signUpRequest);
    return this.authService.login({
      email: signUpRequest.email,
      password: signUpRequest.password,
    });
  }
}
