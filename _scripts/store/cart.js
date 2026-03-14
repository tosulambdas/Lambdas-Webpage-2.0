console.log('Shopping Cart Script Loaded');

/**
 * Shopping Cart Functionality
 * 
 * This script handles all the shopping cart functionality including:
 * - Adding products to cart
 * - Updating quantities
 * - Removing items
 * - Checkout process
 * - Order confirmation
 */

document.addEventListener('DOMContentLoaded', function() {
  // ==============================
  // VARIABLES AND DOM ELEMENTS
  // ==============================
  
  // Initialize cart from localStorage or create empty cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Cart elements
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCart = document.getElementById('close-cart');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Checkout elements
  const checkoutOverlay = document.getElementById('checkout-overlay');
  const closeCheckout = document.getElementById('close-checkout');
  const orderItems = document.getElementById('order-items');
  const orderTotal = document.getElementById('order-total');
  const shippingForm = document.getElementById('shipping-form');
  
  // Confirmation elements
  const orderConfirmation = document.getElementById('order-confirmation');
  const closeConfirmation = document.getElementById('close-confirmation');
  const continueShoppingBtn = document.getElementById('continue-shopping');
  
  // ==============================
  // EVENT LISTENERS
  // ==============================
  
  // Cart events
  cartIcon.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartOverlay);
  checkoutBtn.addEventListener('click', openCheckout);
  
  // Checkout events
  closeCheckout.addEventListener('click', closeCheckoutOverlay);
  shippingForm.addEventListener('submit', placeOrder);
  
  // Confirmation events
  closeConfirmation.addEventListener('click', closeConfirmationOverlay);
  continueShoppingBtn.addEventListener('click', closeConfirmationOverlay);
  
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  // Initialize cart count on page load
  updateCartCount();
  
  // ==============================
  // CART FUNCTIONS
  // ==============================
  
  /**
   * Opens the cart overlay and renders cart items
   */
  function openCart() {
    cartOverlay.classList.add('active');
    renderCartItems();
  }
  
  /**
   * Closes the cart overlay
   */
  function closeCartOverlay() {
    cartOverlay.classList.remove('active');
  }
  
  /**
   * Adds a product to the cart
   */
  function addToCart(event) {
    const productId = parseInt(event.target.dataset.productId);
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
    const productImage = productCard.querySelector('.product-image').src;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
      });
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update cart count
    updateCartCount();
    
    // Show cart
    openCart();
  }
  
  /**
   * Updates the cart count display
   */
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
  }
  
  /**
   * Renders all cart items in the cart overlay
   */
  function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
      cartTotal.textContent = '$0.00';
      return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
      `;
      
      cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons and remove buttons
    const decreaseButtons = cartItems.querySelectorAll('.decrease');
    const increaseButtons = cartItems.querySelectorAll('.increase');
    const quantityInputs = cartItems.querySelectorAll('.quantity-input');
    const removeButtons = cartItems.querySelectorAll('.remove-item');
    
    decreaseButtons.forEach(button => {
      button.addEventListener('click', decreaseQuantity);
    });
    
    increaseButtons.forEach(button => {
      button.addEventListener('click', increaseQuantity);
    });
    
    quantityInputs.forEach(input => {
      input.addEventListener('change', updateQuantity);
    });
    
    removeButtons.forEach(button => {
      button.addEventListener('click', removeItem);
    });
    
    // Update total
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
  
  /**
   * Decreases the quantity of an item in the cart
   */
  function decreaseQuantity(event) {
    const id = parseInt(event.target.dataset.id);
    const item = cart.find(item => item.id === id);
    
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
    
    saveCart();
    renderCartItems();
    updateCartCount();
  }
  
  /**
   * Increases the quantity of an item in the cart
   */
  function increaseQuantity(event) {
    const id = parseInt(event.target.dataset.id);
    const item = cart.find(item => item.id === id);
    
    item.quantity += 1;
    
    saveCart();
    renderCartItems();
    updateCartCount();
  }
  
  /**
   * Updates the quantity of an item in the cart based on input value
   */
  function updateQuantity(event) {
    const id = parseInt(event.target.dataset.id);
    const quantity = parseInt(event.target.value);
    
    if (quantity < 1) {
      event.target.value = 1;
      return;
    }
    
    const item = cart.find(item => item.id === id);
    item.quantity = quantity;
    
    saveCart();
    renderCartItems();
    updateCartCount();
  }
  
  /**
   * Removes an item from the cart
   */
  function removeItem(event) {
    const id = parseInt(event.target.dataset.id);
    cart = cart.filter(item => item.id !== id);
    
    saveCart();
    renderCartItems();
    updateCartCount();
  }
  
  /**
   * Saves the cart to localStorage
   */
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // ==============================
  // CHECKOUT FUNCTIONS
  // ==============================
  
  /**
   * Opens the checkout overlay and renders order summary
   */
  function openCheckout() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    checkoutOverlay.classList.add('active');
    renderOrderSummary();
  }
  
  /**
   * Closes the checkout overlay
   */
  function closeCheckoutOverlay() {
    checkoutOverlay.classList.remove('active');
  }
  
  /**
   * Renders the order summary in the checkout overlay
   */
  function renderOrderSummary() {
    orderItems.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const orderItem = document.createElement('div');
      orderItem.className = 'order-item';
      orderItem.innerHTML = `
        <span>${item.name} x ${item.quantity}</span>
        <span>$${itemTotal.toFixed(2)}</span>
      `;
      
      orderItems.appendChild(orderItem);
    });
    
    // Update total
    orderTotal.textContent = `$${total.toFixed(2)}`;
  }
  
  /**
   * Handles the order placement
   */
  function placeOrder(event) {
    event.preventDefault();
    
    // In a real application, you would send the order to a server here
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Close checkout overlay
    closeCheckoutOverlay();
    
    // Show order confirmation
    orderConfirmation.classList.add('active');
    
    // Reset form
    shippingForm.reset();
  }
  
  /**
   * Closes the order confirmation overlay
   */
  function closeConfirmationOverlay() {
    orderConfirmation.classList.remove('active');
  }
});

