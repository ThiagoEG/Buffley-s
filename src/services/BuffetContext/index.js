import React, { createContext, useContext, useReducer } from 'react';

const BuffetContext = createContext();

export const BuffetProvider = ({ children }) => {
  const [buffetId, setBuffetId] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET':
        return action.payload;
      default:
        return state;
    }
  }, null);

  return (
    <BuffetContext.Provider value={{ buffetId, setBuffetId }}>
      {children}
    </BuffetContext.Provider>
  );
};

export const useBuffet = () => {
  return useContext(BuffetContext);
};
