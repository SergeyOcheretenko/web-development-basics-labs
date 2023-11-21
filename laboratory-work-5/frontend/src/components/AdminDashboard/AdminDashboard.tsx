import { Button, Typography } from "@mui/material";
import { UserDto } from "../../types/api/dto/UserDto";
import { useCallback, useEffect, useState } from "react";
import { UserCard } from "../UserCard/UserCard";

type AdminDashboardProps = {
  me: UserDto;
};

export function AdminDashboard({ me }: AdminDashboardProps): JSX.Element {
  const [users, setUsers] = useState<UserDto[]>([]);
  
  const fetchUsers = useCallback(() => {
    fetch(process.env.REACT_APP_API_URL + '/users', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
          setUsers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = (id: number) => {
    fetch(process.env.REACT_APP_API_URL + '/users/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(() => {
          fetchUsers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };
  
  return <div style={{ 
      display: "flex",
      flexDirection: "column",
      rowGap: "3rem"
    }}>
    <div style={{
      display: "flex",
      flexDirection: "column",
      rowGap: "1rem",
      justifyContent: "start",
    }}>
      <Typography variant='h5'>Me</Typography>
      <UserCard user={me} />
    </div>

    <div style={{
      display: "flex",
      flexDirection: "column",
      rowGap: "1rem",
      justifyContent: "start",
    }}>
      <Typography variant='h5'>Users</Typography>
      {
        (users || []).map((user) => (
          <div>
            <UserCard user={user} key={user.id} />
            <Button onClick={() => deleteUser(user.id)}>Delete User</Button>
          </div>
        ))
      }
      
    </div>
  </div> 
  
  
}