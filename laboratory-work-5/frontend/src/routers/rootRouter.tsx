import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { DashboardPage } from '../pages/DashboardPage/DashboardPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';

export const rootRouter = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '*', element: <Navigate to={'/login'} /> },
]);
