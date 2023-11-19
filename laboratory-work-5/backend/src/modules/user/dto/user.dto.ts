import { User, UserRole } from '../../../database/entities/User';

export class UserDto {
  public readonly id: number;
  public readonly firstName: string;
  public readonly secondName: string;
  public readonly email: string;
  public readonly passwordHash: string;
  public readonly role: UserRole;

  static fromEntity(user: User): UserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
    };
  }
}
