// global.js

export const globalData = {
  currentCardapioId: null,
};

export function setCurrentCardapioId(newCardapioId) {
  globalData.currentCardapioId = newCardapioId;
}
