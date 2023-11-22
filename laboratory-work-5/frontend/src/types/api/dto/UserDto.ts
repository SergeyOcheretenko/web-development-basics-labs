export type UserDto = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  group: string;
  variant: string;
  createdAt?: Date;
  updatedAt?: Date;
}