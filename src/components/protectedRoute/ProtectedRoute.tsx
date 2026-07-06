import { Navigate, useLocation } from 'react-router-dom';
import { APP_PATH } from '../../const';

interface ProtectedRouteProps {
  isAuth: boolean;
  children: JSX.Element;
  redirectTo?: string;
}

function ProtectedRoute({
  isAuth,
  children,
  redirectTo = APP_PATH.PAGE_LOGIN,
}: ProtectedRouteProps) {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
