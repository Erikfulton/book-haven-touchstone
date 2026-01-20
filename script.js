// Task 3.2: Web Storage (sessionStorage + localStorage)

// ----------------------------
// Subscribe (all pages)
// ----------------------------
function subscribeAlert() {
  alert("Thank you for subscribing.");
}

// ----------------------------
// Cart (sessionStorage)
// ----------------------------
const CART_KEY = "cartItems";

function getCartItems() {
  const raw = sessionStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function setCartItems(items) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(items));
}

function addToCart(itemName) {
  const items = getCartItems();
  const existing = items.find(i => i.name === itemName);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({ name: itemName, qty: 1 });
  }
  setCartItems(items);
  alert("Item added to the cart.");
}

function clearCartStorage() {
  sessionStorage.removeItem(CART_KEY);
}

function renderCartModal() {
  const list = document.getElementById("cartItemsList");
  const empty = document.getElementById("cartEmptyMsg");
  if (!list || !empty) return;

  list.innerHTML = "";
  const items = getCartItems();

  if (items.length === 0) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (Qty: ${item.qty})`;
    list.appendChild(li);
  });
}

function openCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;
  renderCartModal();
  modal.showModal();
}

function closeCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;
  modal.close();
}

function clearCart() {
  clearCartStorage();
  renderCartModal();
  alert("Cart cleared.");
}

function processOrder() {
  clearCartStorage();
  renderCartModal();
  alert("Thank you for your order.");
  closeCart();
}

// ----------------------------
// Custom order/contact form (localStorage)
// ----------------------------
const ORDER_KEY = "customOrder";

function saveCustomOrder(event) {
  if (event) event.preventDefault();

  const form = document.getElementById("contactForm");
  if (form && !form.reportValidity()) return;

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const msgEl = document.getElementById("message");

  if (!nameEl || !emailEl) return;

  const payload = {
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    message: msgEl ? msgEl.value.trim() : "",
    savedAt: new Date().toISOString()
  };

  localStorage.setItem(ORDER_KEY, JSON.stringify(payload));
  alert("Thank you for your message.");
  if (form) form.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) form.addEventListener("submit", saveCustomOrder);
});
