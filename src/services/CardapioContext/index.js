import React, { createContext, useContext, useState, useMemo } from 'react';

const CardapioContext = createContext();

export function CardapioProvider({ children }) {
  const [cardapios, setCardapios] = useState([]);
  const [cardapio, setCardapio] = useState({
    nomeCardapio: '',
    custoMaisBarato: 0,
    custoMaisCaro: 0,
    quantidadeItens: 0,
    totalCost: 0,
    numeroConvidados: 0,
    categoriaMaisBarata: '',
    categoriaMaisCara: '',
  });

  const value = useMemo(() => [cardapios, setCardapios], [cardapios]);

  return (
    <CardapioContext.Provider value={value}>{children}</CardapioContext.Provider>
  );
}

export function useCardapio() {
  const context = useContext(CardapioContext);
  if (!context) {
    throw new Error('useCardapio deve ser usado dentro de um CardapioProvider');
  }
  return context;
}
