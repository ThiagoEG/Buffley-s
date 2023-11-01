// global.js
export const globalData = {
    currentBuffetId: null,
  };
  

  export function setCurrentBuffetId(buffetId) {
    globalData.currentBuffetId = buffetId;
  }
  
  


/*
import { globalData } from './global'; // Importe a variável global

// Acesse o ID do buffet
const buffetId = globalData.currentCardapioId;

// Use buffetId conforme necessário
console.log('ID do buffet:', buffetId);
*/