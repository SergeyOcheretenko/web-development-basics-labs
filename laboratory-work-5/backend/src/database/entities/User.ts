import { DataTypes } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Table({ modelName: 'users', timestamps: true })
export class User extends Model<User> {
  @Column({ field: 'id', primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ field: 'first_name', type: 'text' })
  firstName: string;

  @Column({ field: 'last_name', type: 'text' })
  lastName: string;

  @Column({ field: 'email', type: 'text' })
  email: string;

  @Column({ field: 'password_hash', type: 'text' })
  passwordHash: string;

  @Column({
    field: 'role',
    type: DataTypes.ENUM,
    values: Object.values(UserRole),
  })
  role: UserRole;
}
