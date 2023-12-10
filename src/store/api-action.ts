import { AxiosError, AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus, FavoriteStatus, HttpStatus, NameSpace } from '../const';
import { TComment, TCommentData, TLoginData, TOffer, TOfferForOffers, TOffers, TReviews, TUser } from '../types/types';
import { dropToken, saveToken } from '../services/token';
import { TFavoriteOffer, TOfferNearPlace } from '../types/state';
import { addNearbyOfferToBookmark, addOfferToBookmark, addOffersToBookmark, deleteNearbyOfferFromBookmark, deleteOfferFromBookmark, deleteOffersFromBookmark, requireAuthorization, updateUserdata } from './action';

type ExtraType = {
  extra: AxiosInstance;
}

export const fetchOffers = createAsyncThunk<TOffers, undefined, ExtraType>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TOffers>(APIRoute.Offers);

    return data;
  }
);

export const fetchOffer = createAsyncThunk<TOffer, TOffer['id'], ExtraType>(
  `${NameSpace.Offer}/fetchOffer`,
  async (offerId, {extra: api}) => {
    const {data} = await api.get<TOffer>(`${APIRoute.Offers}/${offerId}`);

    return data;
  }
);

export const fetchNearPlaces = createAsyncThunk<TOfferNearPlace[], TOffer['id'], ExtraType>(
  `${NameSpace.NearPlaces}/fetchNearPlaces`,
  async (offerId, {extra: api}) => {
    const {data} = await api.get<TOfferNearPlace[]>(
      `${APIRoute.Offers}/${offerId}${APIRoute.NearPlaces}`
    );

    return data;
  }
);

export const fetchReviews = createAsyncThunk<TReviews, TOffer['id'], ExtraType>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (offerId, {extra: api}) => {
    const {data} = await api.get<TReviews>(`${APIRoute.Reviews}/${offerId}`);
    return data;
  }
);

export const postReviews = createAsyncThunk<TComment, TCommentData, ExtraType >(
  `${NameSpace.Reviews}/postReview`,
  async ({comment, id, rating}, {extra: api}) => {
    const {data} = await api.post<TComment>(`${APIRoute.Reviews}/${id}`,
      {comment, rating}
    );
    return data;
  }
);

export const fetchFavorites = createAsyncThunk<TFavoriteOffer[], undefined, ExtraType>(
  `${NameSpace.Favorites}/fetchFavorites`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TFavoriteOffer[]>(APIRoute.Favorite);

    return data;
  }
);

export const addFavorite = createAsyncThunk<TOfferForOffers, TOffer['id'], ExtraType>(
  'favorites/add',
  async (offerId, { extra: api, dispatch }) => {
    const { data } = await api.post<TOfferForOffers>(`${APIRoute.Favorite}/${offerId}/${FavoriteStatus.Added}`);
    dispatch(addOffersToBookmark(offerId));
    dispatch(addNearbyOfferToBookmark(offerId));
    dispatch(addOfferToBookmark(offerId));
    return data;
  }
);

export const deleteFavorite = createAsyncThunk<TOfferForOffers, TOffer['id'], ExtraType>(
  'favorites/delete',
  async (offerId, { extra: api, dispatch}) => {
    const { data } = await api.post<TOfferForOffers>(`${APIRoute.Favorite}/${offerId}/${FavoriteStatus.Deleted}`);
    dispatch(deleteOffersFromBookmark(offerId));
    dispatch(deleteNearbyOfferFromBookmark(offerId));
    dispatch(deleteOfferFromBookmark(offerId));

    return data;
  });

export const login = createAsyncThunk<TUser, undefined, ExtraType>
(
  'auth/login',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TUser>(APIRoute.Login);
    saveToken(data.token);
    return data;
  },
);

export const loginAction = createAsyncThunk<TUser, TLoginData, ExtraType>(
  `${NameSpace.User}/login`,
  async (loginData, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<TUser>(APIRoute.Login, loginData);
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(updateUserdata(data));
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === HttpStatus.BAD_REQUEST) {
          return rejectWithValue('Bad Request: Some data is missing or invalid.');
        } else {
          return rejectWithValue('Error during login.');
        }
      } else {
        return rejectWithValue('Unknown error during login.');
      }
    }
  }
);

export const logout = createAsyncThunk<void, undefined, ExtraType>(
  `${NameSpace.User}/logout`,
  (_arg, {dispatch, extra: api}) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
