// AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Defina as ações que podem ser usadas para modificar o estado
const AuthActions = {
  SET_USER: 'SET_USER',
};

const initialState = {
  uid: null,
  username: null,
  isBuffet: false,
  buffetUID: null,
};

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActions.SET_USER:
      return {
        ...state,
        uid: action.payload.uid,
        username: action.payload.username,
        isBuffet: action.payload.isBuffet,
        buffetUID: action.payload.buffetUID,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
