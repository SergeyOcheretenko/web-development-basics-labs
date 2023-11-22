import { User, UserRole } from '../../../database/entities/User';

export class UserDto {
  public readonly id: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly passwordHash: string;
  public readonly role: UserRole;
  public readonly phoneNumber: string;
  public readonly group: string;
  public readonly variant: string;

  static fromEntity(user: User): UserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      phoneNumber: user.phoneNumber,
      group: user.group,
      variant: user.variant,
    };
  }
}
