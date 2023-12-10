import { AUTH_TOKEN_KEY_NAME } from '../const';
import { TToken } from '../types/types';

export const getToken = (): TToken => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export function saveToken(token: TToken) {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
}

export function dropToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
}
