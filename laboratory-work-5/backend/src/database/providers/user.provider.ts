import { Provider } from '@nestjs/common';
import { User } from '../entities/User';

export const userProvider: Provider = {
  provide: 'USER_REPOSITORY',
  useValue: User,
};
