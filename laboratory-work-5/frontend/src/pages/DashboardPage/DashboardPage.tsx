/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Page } from "../../components/common/Page/Page";
import { useNavigate } from "react-router-dom";
import { UserDashboard } from "../../components/UserDashboard/UserDashboard";
import { UserDto } from "../../types/api/dto/UserDto";
import { AdminDashboard } from "../../components/AdminDashboard/AdminDashboard";

export function DashboardPage(): JSX.Element {
  const navigate = useNavigate();
  const [me, setMe] = useState<UserDto>();

  useEffect(() => {
    localStorage.getItem('token');

    fetch(process.env.REACT_APP_API_URL + '/users/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.statusCode === 401) {
          navigate('/login');
        } else {
          setMe(data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        navigate('/login');
      });
  }, []);

  return <Page>
      { me && me.role === 'user' && <UserDashboard me={me} /> }
      { me && me.role === 'admin' && <AdminDashboard me={me} /> }
  </Page> 
}