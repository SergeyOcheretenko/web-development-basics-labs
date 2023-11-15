import { useState } from 'react';

export function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = () => {
    console.log(email, password);
  };

  return <></>;
}
