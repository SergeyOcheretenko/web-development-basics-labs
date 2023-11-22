import { Button, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { Page } from '../common/Page/Page';
import { useNavigate } from 'react-router-dom';

export function Login(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const submit = () => {
    const url = process.env.REACT_APP_API_URL + '/auth/login';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        }

        if (data.message) {
          setErrorMessage(data.message);
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
        onChange={(event) => {
          setEmail(event.target.value);
          setErrorMessage('');
        }}
      />
      <Input
        type='password'
        placeholder='Password' 
        value={password} 
        onChange={(event) => {
          setPassword(event.target.value);
          setErrorMessage('');
        }}
      />
      <Button onClick={submit}>Submit</Button>

      {errorMessage && <Typography variant='body1' style={{ color: 'red' }}>{errorMessage}</Typography>}
    </div>
  </Page>;
}
