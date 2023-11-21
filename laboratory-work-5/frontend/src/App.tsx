import './App.css';
import { Page } from './components/common/Page/Page';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Page>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/signup')}>Register</Button>
        </div>
      </Page>
    </div>
  );
}

export default App;
