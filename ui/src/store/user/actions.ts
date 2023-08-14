import {
  SET_USER_DATA,
  SET_LOG_IN_SUCCESS,
  SET_SIGN_UP_SUCCESS,
  SET_SIGN_UP_ERROR_MESSAGE
} from '../actionTypes';
import httpClient from '../../httpClient';
import {User} from './User';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

export function logIn(fields: User) {
  return function(dispatch: Dispatch) {
    return httpClient.logIn(fields).then((user) => {
      if(user) {
        dispatch(setUserData(user))
        dispatch(setLogInSuccess(true))
      }
    }).catch((err: Error) => {
      dispatch(setLogInSuccess(false))
    })
  };
}

export const logOut = () => {
  return (dispatch: Dispatch) => {
    httpClient.logOut()
    dispatch(setUserData())
  }
}

export function signUp(fields: User) {
  return (dispatch: Dispatch) => httpClient.signUp(fields).then((user) => {
    if (user) {
      dispatch(setUserData(user));
      dispatch(setSignUpSuccess(true));
    }
  })
      .catch((err: AxiosError) => {
        // @ts-ignore
        dispatch(setSignUpErrorMessage(err?.response?.data?.message || err.message))
        dispatch(setSignUpSuccess(false))
      })
}


export const setUserData = (data?: User) => {
  return {
    type: SET_USER_DATA,
    data
  };
};

export const setSignUpSuccess = (data: boolean) => {
  return {
    type: SET_SIGN_UP_SUCCESS,
    data
  };
};
export const setSignUpErrorMessage = (data: string) => {
  return {
    type: SET_SIGN_UP_ERROR_MESSAGE,
    data
  };
};

export const setLogInSuccess = (data: boolean) => {
  return {
    type: SET_LOG_IN_SUCCESS,
    data
  };
};

export function loadUser() {
  return (dispatch: Dispatch) => {
    const user = httpClient.getCurrentUser()
    if(user) {
      dispatch(setUserData(user));
    }
  };
};

