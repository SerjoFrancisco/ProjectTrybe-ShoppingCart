const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Chama a outra função', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalledWith(expect.anything());
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  })
  
});
