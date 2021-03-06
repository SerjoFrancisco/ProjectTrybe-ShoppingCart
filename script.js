const price = document.querySelector('.total-price');

//  Função escrita pela trybe
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
function subPrices(element) {
  let total = parseFloat(price.innerText);
  total -= element.price;
  return total;
}
 async function cartItemClickListener(event) {
 event.target.remove();
 const id = event.target.innerText.split(' ')[1];
 const shoppingList = document.querySelector('ol').innerHTML;
 saveCartItems(shoppingList);
try {
  const product = await fetchItem(id);
  price.innerText = subPrices(product);
  localStorage.setItem('price', price.innerText);
} catch (error) {
  throw new Error('ah não');
}
}
// Função escrita pela Trybe 
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
function sumPrices(element) {
  let total = parseFloat(price.innerText);
  total += element.price;
  return total.toFixed(2);
}
async function putItemsOnCart(e) {
  const button = e.target;
  const item = button.parentElement;
  const id = item.querySelector('span.item__sku').innerText;
  const cart = document.querySelector('.cart__items');
  try {
    const product = await fetchItem(id);
    cart.appendChild(createCartItemElement(product));
    price.innerText = sumPrices(product);
    saveCartItems(cart.innerHTML);
    localStorage.setItem('price', price.innerText);
    document.querySelector('.total-price').innerText = localStorage.getItem('price');
  } catch (error) {
    throw new Error('ah não');
  }
}
// Função escrita pela Trybe
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', putItemsOnCart);
  }
  return e;
}

// Função escrita pela TRybe
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

async function getCards() {
  const obj = await fetchProducts('computador');
  const section = document.querySelector('.items');
  try {
  obj.results.forEach((element) => {
    section.appendChild(createProductItemElement(element));
  });
  document.querySelector('.loading').remove();
} catch (error) {
  throw new Error('ah não');
}
}
function listenAll() {
  const shoppingList = document.querySelector('.cart__items');
  const itens = Array.from(shoppingList.getElementsByClassName('cart__item'));
  itens.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
}
function eraseAll() {
  document.querySelector('ol').innerText = '';
  price.innerText = 0;
  localStorage.setItem('price', price.innerText);
}

window.onload = () => { 
document.querySelector('.empty-cart').addEventListener('click', eraseAll);
getCards();
getSavedCartItems();
listenAll();
};
