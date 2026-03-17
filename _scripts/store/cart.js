document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const cartOverlay = document.getElementById("cart-overlay");
  const closeCart = document.getElementById("close-cart");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  const checkoutOverlay = document.getElementById("checkout-overlay");
  const closeCheckout = document.getElementById("close-checkout");
  const orderItems = document.getElementById("order-items");
  const orderTotal = document.getElementById("order-total");
  const shippingForm = document.getElementById("shipping-form");

  const orderConfirmation = document.getElementById("order-confirmation");
  const closeConfirmation = document.getElementById("close-confirmation");
  const continueShoppingBtn = document.getElementById("continue-shopping");

  if (!cartIcon || !cartCount) return;

  cartIcon.addEventListener("click", openCart);
  closeCart?.addEventListener("click", closeCartOverlay);
  checkoutBtn?.addEventListener("click", openCheckout);

  closeCheckout?.addEventListener("click", closeCheckoutOverlay);
  shippingForm?.addEventListener("submit", placeOrder);

  closeConfirmation?.addEventListener("click", closeConfirmationOverlay);
  continueShoppingBtn?.addEventListener("click", closeConfirmationOverlay);

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  updateCartCount();

  function openCart() {
    cartOverlay?.classList.add("active");
    renderCartItems();
  }

  function closeCartOverlay() {
    cartOverlay?.classList.remove("active");
  }

  function addToCart(event) {
    const productId = parseInt(event.target.dataset.productId, 10);
    const productCard = document.querySelector(
      `.product-card[data-product-id="${productId}"]`
    );

    if (!productCard) return;

    const productName =
      productCard.querySelector(".product-name")?.textContent || "";
    const productPrice = parseFloat(
      (productCard.querySelector(".product-price")?.textContent || "0").replace(
        "$",
        ""
      )
    );
    const productImage = productCard.querySelector(".product-image")?.src || "";

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1,
      });
    }

    saveCart();
    updateCartCount();
    openCart();
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
  }

  function renderCartItems() {
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "$0.00";
      return;
    }

    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
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

    cartItems.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", decreaseQuantity);
    });

    cartItems.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", increaseQuantity);
    });

    cartItems.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", updateQuantity);
    });

    cartItems.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", removeItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  function decreaseQuantity(event) {
    const id = parseInt(event.target.dataset.id, 10);
    const item = cart.find((item) => item.id === id);

    if (!item) return;
    if (item.quantity > 1) item.quantity -= 1;

    saveCart();
    renderCartItems();
    updateCartCount();
  }

  function increaseQuantity(event) {
    const id = parseInt(event.target.dataset.id, 10);
    const item = cart.find((item) => item.id === id);

    if (!item) return;

    item.quantity += 1;
    saveCart();
    renderCartItems();
    updateCartCount();
  }

  function updateQuantity(event) {
    const id = parseInt(event.target.dataset.id, 10);
    const quantity = parseInt(event.target.value, 10);

    if (quantity < 1 || Number.isNaN(quantity)) {
      event.target.value = 1;
      return;
    }

    const item = cart.find((item) => item.id === id);
    if (!item) return;

    item.quantity = quantity;
    saveCart();
    renderCartItems();
    updateCartCount();
  }

  function removeItem(event) {
    const id = parseInt(event.target.dataset.id, 10);
    cart = cart.filter((item) => item.id !== id);

    saveCart();
    renderCartItems();
    updateCartCount();
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function openCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    checkoutOverlay?.classList.add("active");
    renderOrderSummary();
  }

  function closeCheckoutOverlay() {
    checkoutOverlay?.classList.remove("active");
  }

  function renderOrderSummary() {
    if (!orderItems || !orderTotal) return;

    orderItems.innerHTML = "";

    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const orderItem = document.createElement("div");
      orderItem.className = "order-item";
      orderItem.innerHTML = `
        <span>${item.name} x ${item.quantity}</span>
        <span>$${itemTotal.toFixed(2)}</span>
      `;

      orderItems.appendChild(orderItem);
    });

    orderTotal.textContent = `$${total.toFixed(2)}`;
  }

  function placeOrder(event) {
    event.preventDefault();

    cart = [];
    saveCart();
    updateCartCount();
    closeCheckoutOverlay();

    orderConfirmation?.classList.add("active");
    shippingForm?.reset();
  }

  function closeConfirmationOverlay() {
    orderConfirmation?.classList.remove("active");
  }
});