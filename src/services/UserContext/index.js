import React, { createContext, useContext, useReducer } from 'react';

// Defina o contexto do usuário com um valor padrão vazio
const UserContext = createContext({});

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    uid: null,
    username: null,
    isBuffet: false,
    buffetUID: null,
    userEmail: null, // Adicionamos o userEmail ao estado
    userProfileImage: null
  });

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

// Reducer para atualizar o estado do usuário
function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        uid: action.payload.uid,
        username: action.payload.username,
        isBuffet: action.payload.isBuffet,
        userEmail: action.payload.userEmail, // Atualizamos o userEmail quando o usuário faz login
        buffetUID: action.payload.userEmail,
        userProfileImage: action.payload.userProfileImage
      };
    case 'CLEAR_USER':
      return {
        uid: null,
        username: null,
        isBuffet: false,
        buffetUID: null,
        userEmail: null, // Limpamos o userEmail ao fazer logout
        userProfileImage: null
      };
    default:
      return state;
  }
}
