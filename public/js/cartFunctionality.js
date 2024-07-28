document.addEventListener('DOMContentLoaded', function() {
  const addToCartBtn = document.getElementById('addToCartBtn');
  const buyNowBtn = document.getElementById('buyNowBtn');
  const productId = addToCartBtn.dataset.id;
  const quantityInput = document.getElementById('quantity');

  function checkCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.find(item => item.id === productId);
  }

  function updateButton() {
    const cartItem = checkCart();
    if (cartItem) {
      addToCartBtn.textContent = 'Go to Cart';
      addToCartBtn.href = '/shop/cart';
      quantityInput.value = cartItem.quantity; // Set quantity to saved value
      addToCartBtn.removeEventListener('click', addToCart);
    } else {
      addToCartBtn.textContent = 'Add to Cart';
      addToCartBtn.href = '#';
      addToCartBtn.addEventListener('click', addToCart);
    }
  }

  function addToCart(event) {
    event.preventDefault();
    const productName = document.querySelector('[data-name]').dataset.name;
    const productPrice = document.querySelector('[data-price]').dataset.price;
    const productImage = document.querySelector('[data-image]').dataset.image;
    const productDescription = document.querySelector('[data-description]').dataset.description;
    const quantity = quantityInput.value;

    const cartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription,
      quantity: quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = quantity; // Update quantity if item exists
    } else {
      cart.push(cartItem); // Add new item
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateButton();
  }

  function buyNow(event) {
    event.preventDefault();
    const productName = document.querySelector('[data-name]').dataset.name;
    const productPrice = document.querySelector('[data-price]').dataset.price;
    const productImage = document.querySelector('[data-image]').dataset.image;
    const productDescription = document.querySelector('[data-description]').dataset.description;
    const quantity = quantityInput.value;

    const cartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription,
      quantity: quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = quantity; // Update quantity if item exists
    } else {
      cart.push(cartItem); // Add new item
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/shop/checkout'; // Redirect to checkout page
  }

  quantityInput.addEventListener('change', function() {
    const cartItem = checkCart();
    if (cartItem) {
      cartItem.quantity = quantityInput.value;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = cart.findIndex(item => item.id === productId);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = quantityInput.value;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  });

  addToCartBtn.addEventListener('click', addToCart);
  buyNowBtn.addEventListener('click', buyNow);
  updateButton();
});
