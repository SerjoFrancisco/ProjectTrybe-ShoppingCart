require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('É uma função', () =>{
    expect(typeof fetchProducts).toBe('function');
  });
  test('Fetch foi chamado e como',() =>{
    const test = fetchProducts('computador');
    expect(fetch).toBeCalledWith(expect.anything());
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    expect(test).resolves.toMatchObject(computadorSearch);
    expect(fetchProducts()).resolves.toThrow('You must provide an url');
  })
});
