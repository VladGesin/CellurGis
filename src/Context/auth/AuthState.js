import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import { GET_USER } from '../types';

const AuthState = (props) => {
  const initialState = {};

  return <AuthState.Provider value={{}}>{props.children}</AuthState.Provider>;
};

export default AuthState;
