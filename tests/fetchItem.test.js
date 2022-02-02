require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  test('É uma função', () =>{
    expect(typeof fetchItem).toBe('function');
  });
  test('Fetch foi chamado e como',() =>{
    const test = fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(expect.anything());
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
    expect(test).resolves.toMatchObject(item);
    expect(fetchItem()).resolves.toThrow('You must provide an url');
  })
});
