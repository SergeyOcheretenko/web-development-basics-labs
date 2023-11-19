import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginPage } from '../pages/LoginPage/LoginPage';

export const rootRouter = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <Navigate to={'/'} /> },
]);
