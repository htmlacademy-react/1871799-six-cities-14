import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { changePagePath } from '../../../store/action';
import { logout } from '../../../store/api-action';
import { memo } from 'react';

export function Header(): JSX.Element {
  const favoritesCount = useAppSelector((state)=> state.favoritesPage.length);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);


  const handleClickSingOut = (): void => {
    dispatch(changePagePath(AppRoute.Root));
    dispatch(logout());
  };

  const handleClickSingIn = (): void => {
    dispatch(changePagePath(AppRoute.Login));
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link onClick={() => dispatch(changePagePath(AppRoute.Root))} className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authorizationStatus === AuthorizationStatus.Auth && user !== null ?
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${user ? user.avatarUrl : ''})` }}>
                    </div>
                    <span className="header__user-name user__name">{user ? user.email : ''}</span>
                    <span className="header__favorite-count">{favoritesCount}</span>
                  </Link>
                  :
                  <Link onClick={handleClickSingIn} className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <span className="header__user-name user__name">{'Sign in'}</span>
                  </Link>}
              </li>
              {authorizationStatus === AuthorizationStatus.Auth && user !== null ?
                <li className="header__nav-item">
                  <Link onClick={handleClickSingOut} className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
                :
                ''}
            </ul>
          </nav>
        </div>
      </div>
    </header >
  );
}

const MemorizedHeader = memo(Header);
export default MemorizedHeader;
