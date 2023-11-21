import { Typography } from "@mui/material";
import { UserDto } from "../../types/api/dto/UserDto";
import { UserCard } from "../UserCard/UserCard";

type UserDashboardProps = {
  me: UserDto;
};

export function UserDashboard({ me }: UserDashboardProps): JSX.Element {
  return <div style={{
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    justifyContent: "start",
  }}>
    <Typography variant='h5'>Me</Typography>
    <UserCard user={me} />
  </div>
}