import { Provider } from '@nestjs/common';
import { User } from '../entities/User';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const userProvider: Provider = {
  provide: USER_REPOSITORY,
  useValue: User,
};
