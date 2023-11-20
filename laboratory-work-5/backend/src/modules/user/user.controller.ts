import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './request/create-user.request';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../database/entities/User';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('/')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(@Request() req) {
    return this.userService.findAll();
  }

  @Post('/')
  async create(@Body() createUserRequest: CreateUserRequest) {
    return this.userService.create(createUserRequest);
  }
}
