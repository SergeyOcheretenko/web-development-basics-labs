import { Typography } from "@mui/material";
import { UserDto } from "../../types/api/dto/UserDto";

type UserCardProps = {
  user: UserDto;
}

export function UserCard({ user }: UserCardProps): JSX.Element {
  return <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  
  }}>
    <Typography variant='h6'>First Name: {user.firstName}</Typography>
    <Typography variant='h6'>Last Name: {user.lastName}</Typography>
    <Typography variant='h6'>Email: {user.email}</Typography>
    <Typography variant='h6'>Role: {user.role}</Typography>
  </div>
}