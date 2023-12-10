import { createAction } from '@reduxjs/toolkit';
import { TCity, TOffer, TOfferForOffers, TOffers, TReviews, TUser } from '../types/types';
import { AppRoute, AuthorizationStatus, NameSpace, Sorting } from '../const';

export const filtrationCity = createAction('offer/filtrationCity', (value: TCity['name'])=>({
  payload: value,
}));

export const getOffers = createAction('offer/offerList', (value: TOffers)=>({
  payload: value,
}));

export const getPopularOffers = createAction('offer/offersPopularSort', (value: TOffers)=> ({
  payload: value,
}));

export const getAllData = createAction('offer/getallData', (value: TOffers) => ({
  payload: value,
}));

export const changeLocation = createAction('map/changeLocation', (value: TCity) => ({
  payload: value,
}));

export const favoritesOfferList = createAction('favorites/offerList', (value: TOfferForOffers) => ({
  payload: value,
}));

export const removeFavoritesOffer = createAction('favorites/removeFavoritesOffer', (value: TOfferForOffers) => ({
  payload: value,
}));

export const changeOfOffer = createAction('offers/changeofferList', (value: TOfferForOffers)=>({
  payload: value,
}));

export const gettingSortValue = createAction('offers/sortingValue', (value: Sorting)=>({
  payload: value,
}));

export const sortingOffers = createAction('offers/sortingOffers', (value: Sorting) => ({
  payload: value,
}));

export const dropOffer = createAction(`${NameSpace.Offer}/dropOffer`);

export const dropReviewSendingStatus = createAction(`${NameSpace.Reviews}/dropReviewSendingStatus`);

export const dropSendingStatus = createAction(`${NameSpace.User}/dropSendingStatus`);

export const requireAuthorization = createAction('user/requireAuthorization', (value: AuthorizationStatus) => ({
  payload: value,
}));

export const updateUserdata = createAction('user/updateUserData', (value: TUser) => ({
  payload: value,
}));

export const loadComments = createAction('data/loadComments', (value: TReviews) => ({
  payload: value,
}));

export const changePagePath = createAction('browser/changePagePath', (value: AppRoute) => ({
  payload: value,
}));

export const addOfferToBookmark = createAction('offer/addOfferToBookmark', (value: TOffer['id']) => ({
  payload: value,
}));

export const deleteOfferFromBookmark = createAction('offer/deleteOfferToBookmark', (value: TOffer['id']) => ({
  payload: value,
}));

export const addOffersToBookmark = createAction('offers/addOffersToBookmark', (value: TOffer['id']) => ({
  payload: value,
}));

export const deleteOffersFromBookmark = createAction('offers/deleteOffersFromBookmark', (value: TOffer['id']) => ({
  payload: value,
}));
export const addNearbyOfferToBookmark = createAction('offersNearby/addNearbyOfferToBookmark', (value: TOffer['id']) => ({
  payload: value,
}));

export const deleteNearbyOfferFromBookmark = createAction('offersNearby/deleteNearbyOfferFromBookmark', (value: TOffer['id']) => ({
  payload: value,
}));
