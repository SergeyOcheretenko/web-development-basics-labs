import { Button, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { Page } from '../common/Page/Page';
import { useNavigate } from 'react-router-dom';

export function Register(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const submit = () => {
    const url = process.env.REACT_APP_API_URL + '/auth/signup';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName, role })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return <Page>
    <div style={{
      display: "flex",
      flexDirection: "column",
      rowGap: "2rem"
    }}>
      <Typography variant='h5'>Login</Typography>
      <Input
        type='email'
        placeholder='Email' 
        value={email} 
        onChange={(event) => setEmail(event.target.value)} 
      />
      <Input
        type='password'
        placeholder='Password' 
        value={password} 
        onChange={(event) => setPassword(event.target.value)} 
      />
      <Input
        autoComplete='off'
        placeholder='First Name' 
        value={firstName} 
        onChange={(event) => setFirstName(event.target.value)} 
      />
      <Input
        autoComplete='off'
        placeholder='Last Name' 
        value={lastName} 
        onChange={(event) => setLastName(event.target.value)} 
      />
      <Input
        autoComplete='off'
        placeholder='Role' 
        value={role} 
        onChange={(event) => setRole(event.target.value)} 
      />
      <Button onClick={submit}>Submit</Button>
    </div>
  </Page>;
}
