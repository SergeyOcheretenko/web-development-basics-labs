import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { userProvider } from '../../database/providers/user.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [userProvider, UserService],
  exports: [UserService],
})
export class UserModule {}
