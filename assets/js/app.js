let cart = JSON.parse(localStorage.getItem("dryFruitCart")) || [];

function saveCart() {
 localStorage.setItem("dryFruitCart", JSON.stringify(cart));
}

function updateCartCount() {
 const count = cart.reduce((total, item) => total + item.quantity, 0);

 document.querySelectorAll(".cart-count").forEach((element) => {
 element.textContent = count;
 });
}

function addToCart(name, price, image = "") {
 const existingItem = cart.find((item) => item.name === name);

 if (existingItem) {
 existingItem.quantity += 1;
 } else {
 cart.push({
 name: name,
 price: Number(price),
 quantity: 1,
 image: image
 });
 }

 saveCart();
 updateCartCount();
 renderCart();

 alert(name + " bucket मध्ये add झाले.");
}

function changeQuantity(name, change) {
 const item = cart.find((cartItem) => cartItem.name === name);

 if (!item) return;

 item.quantity += change;

 if (item.quantity <= 0) {
 cart = cart.filter((cartItem) => cartItem.name !== name);
 }

 saveCart();
 updateCartCount();
 renderCart();
}

function removeFromCart(name) {
 cart = cart.filter((item) => item.name !== name);

 saveCart();
 updateCartCount();
 renderCart();
}

function getCartTotal() {
 return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function renderCart() {
 const cartItems = document.getElementById("cart-items");
 const cartTotal = document.getElementById("cart-total");
 const cartEmpty = document.getElementById("cart-empty");

 if (!cartItems) return;

 cartItems.innerHTML = "";

 if (cart.length === 0) {
 if (cartEmpty) cartEmpty.style.display = "block";
 if (cartTotal) cartTotal.textContent = "₹0";
 return;
 }

 if (cartEmpty) cartEmpty.style.display = "none";

 cart.forEach((item) => {
 const itemTotal = item.price * item.quantity;

 cartItems.innerHTML += `
 <div class="cart-item">
 <div>
 <strong>${item.name}</strong>
 <p>₹${item.price} × ${item.quantity} = ₹${itemTotal}</p>
 </div>

 <div class="quantity-controls">

 <button onclick="changeQuantity('${item.name}', -1)">−</button>
 <span>${item.quantity}</span>
 <button onclick="changeQuantity('${item.name}', 1)">+</button>
<button onclick="addToCart('item.name', rate, 'assets/images/item.jpg')">
 Add to Bucket
</button>

 <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
 </div>
 </div>
 `;
 });

 if (cartTotal) {
 cartTotal.textContent = "₹" + getCartTotal();
 }
}

function sendWhatsAppOrder() {
 if (cart.length === 0) {
 alert("कृपया आधी products bucket मध्ये add करा.");
 return;
 }

 const customerName = document.getElementById("customer-name")?.value || "Customer";
 const customerPhone = document.getElementById("customer-phone")?.value || "";
 const customerAddress = document.getElementById("customer-address")?.value || "";

 let message = `नमस्कार, मला Smit Premium Dry Fruits कडून order करायची आहे.%0A%0A`;

 message += `नाव: ${customerName}%0A`;
 message += `मोबाईल: ${customerPhone}%0A`;
 message += `Address: ${customerAddress}%0A%0A`;

 message += `Order Details:%0A`;

 cart.forEach((item, index) => {
 message += `${index + 1}. ${item.name} - ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}%0A`;
 });

 message += `%0ATotal: ₹${getCartTotal()}`;
 message += `%0A%0Aकृपया माझी order confirm करा.`;

 const shopWhatsAppNumber = "919773330642";
 const whatsappURL = `https://wa.me/${shopWhatsAppNumber}?text=${message}`;

 window.open(whatsappURL, "_blank");
}

function clearCart() {
 if (cart.length === 0) return;

 if (confirm("संपूर्ण bucket रिकामी करायची आहे का?")) {
 cart = [];
 saveCart();
 updateCartCount();
 renderCart();
 }
}

function searchProducts() {
 const searchInput = document.getElementById("search-input");

 if (!searchInput) return;

 const searchText = searchInput.value.toLowerCase().trim();
 const products = document.querySelectorAll(".product-card");

 products.forEach((product) => {
 const productName = product.dataset.name
 ? product.dataset.name.toLowerCase()
 : product.innerText.toLowerCase();

 product.style.display = productName.includes(searchText) ? "block" : "none";
 });
}

document.addEventListener("DOMContentLoaded", () => {
 updateCartCount();
 renderCart();

 const searchInput = document.getElementById("search-input");

 if (searchInput) {
 searchInput.addEventListener("input", searchProducts);
 }
});
