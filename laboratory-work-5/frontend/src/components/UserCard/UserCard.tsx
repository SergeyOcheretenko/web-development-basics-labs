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
    backgroundColor: "#d1f9f3",
    padding: "2rem",
    borderRadius: "1rem",
    border: "2px solid #008f68",
  }}>
    <Typography variant='h6'>First Name: {user.firstName}</Typography>
    <Typography variant='h6'>Last Name: {user.lastName}</Typography>
    <Typography variant='h6'>Email: {user.email}</Typography>
    <Typography variant='h6'>Role: {user.role}</Typography>
    <Typography variant='h6'>Phone Number: {user.phoneNumber}</Typography>
    <Typography variant='h6'>Group: {user.group}</Typography>
    <Typography variant='h6'>Variant: {user.variant}</Typography>
  </div>
}