const getSavedCartItems = () => {
  const cart = document.querySelector('.cart__items');
  cart.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
