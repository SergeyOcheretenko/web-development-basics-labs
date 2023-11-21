import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
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
  async findAll() {
    return this.userService.findAll();
  }

  @Post('/')
  async create(@Body() createUserRequest: CreateUserRequest) {
    return this.userService.create(createUserRequest);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findMe(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('/:id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.deleteOneById(id);
  }
}
