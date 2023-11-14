// SideMenuContext.js
import React, { createContext, useState, useContext } from 'react';

const SideMenuContext = createContext();

export const SideMenuProvider = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SideMenuContext.Provider value={{ isSideMenuOpen, setIsSideMenuOpen, menuVisible, setMenuVisible }}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenu = () => {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error('useSideMenu must be used within a SideMenuProvider');
  }
  return context;
};
