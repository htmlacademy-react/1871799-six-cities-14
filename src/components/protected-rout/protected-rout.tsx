import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/hooks';

export type TProtectedRoute = {
    redirectPage: AppRoute;
    children: JSX.Element;
  }

export function ProtectedRoute(props: TProtectedRoute): JSX.Element {
  const { redirectPage, children } = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  // const currentPagePath = window.location.pathname;
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  // const isAccess = currentPagePath === APIRoute.Login ? !isAuth : isAuth;

  return (
    isAuth ? children : <Navigate to={redirectPage} />
  );
}
