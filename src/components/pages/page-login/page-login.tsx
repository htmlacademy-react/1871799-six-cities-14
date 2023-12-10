import React, { useState, FormEvent, useMemo, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import styles from './login.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { changeLocation, changePagePath, dropSendingStatus } from '../../../store/action';
import { AppRoute, AuthorizationStatus, CityMap, RequestStatus } from '../../../const';
import { getRandomArrayElement } from '../../../utils/common';
import { fetchFavorites, loginAction } from '../../../store/api-action';
import { TLoginData } from '../../../types/types';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.([0-9]{1,3}|[a-zA-Z]{2})\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_ERROR_TEXT = 'Please enter a correct email address.';
const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
const PASSWORD_ERROR_TEXT = 'Password must contain at least one letter and one digit. Please enter a correct password!';

export function PageLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state)=>state.authorizationStatus);
  const sendingStatus = useAppSelector((state)=>state.loginSendingStatus);

  const [email, setEmail] = useState<string>('');
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);

  const isEmailValid = EMAIL_PATTERN.test(email);
  const isPasswordValid = PASSWORD_PATTERN.test(password);
  const isValid = isEmailValid && isPasswordValid;

  const randomCity = useMemo(() => getRandomArrayElement(Object.values(CityMap)),[]);

  useEffect(
    () => {
      setIsEmailFilled(false);
      setIsPasswordFilled(false);
      dispatch(dropSendingStatus());
    },
    [dispatch]
  );

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isValid) {
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as TLoginData;
    dispatch(loginAction(data)).then(() => dispatch(fetchFavorites()));

    if (sendingStatus === RequestStatus.Success) {
      setEmail('');
      setPassword('');
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }

  function handleAnchorClick (evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    dispatch(changeLocation(randomCity));
    navigate(AppRoute.Root);
  }

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities | Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link onClick={() => dispatch(changePagePath(AppRoute.Root))} className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header >

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            {sendingStatus === RequestStatus.Error && (
              <p className={styles.message}>Failed to submit. Please try again!</p>
            )}
            <h1 className="login__title">Sign in</h1>

            <form className="login__form form" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setIsEmailFilled(true)}
                />
                {isEmailFilled && !isEmailValid && (
                  <div className={styles.message}>{EMAIL_ERROR_TEXT}</div>
                )}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setIsPasswordFilled(true)}
                  autoComplete="on"
                />
              </div>
              {isPasswordFilled && !isPasswordValid && (
                <div className={styles.message}>{PASSWORD_ERROR_TEXT}</div>
              )}
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                {sendingStatus === RequestStatus.Pending ? 'sending...' : 'Sign in'}

              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#" onClick={handleAnchorClick}>
                <span>{randomCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
