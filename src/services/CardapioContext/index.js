// CardapioContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CardapioContext = createContext();

const initialState = {
  cardapios: {
    aprovados: [],
    recusados: [],
  },
};

const cardapiosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CARDÁPIO':
      return {
        ...state,
        cardapios: {
          ...state.cardapios,
          aprovados: [...state.cardapios.aprovados, action.payload],
        },
      };
    case 'ADD_CARDÁPIO_RECUSADO':
      return {
        ...state,
        cardapios: {
          ...state.cardapios,
          recusados: [...state.cardapios.recusados, action.payload],
        },
      };
    default:
      return state;
  }
};

export function CardapioProvider({ children }) {
  const [state, dispatch] = useReducer(cardapiosReducer, initialState);

  return (
    <CardapioContext.Provider value={{ state, dispatch }}>
      {children}
    </CardapioContext.Provider>
  );
}

export function useCardapio() {
  return useContext(CardapioContext);
}
