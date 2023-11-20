import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../../database/entities/User';

export const ROLES_KEY = 'roles_metadata';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
