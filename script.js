// Sabor na Brasa — personalize o número do WhatsApp na configuração abaixo.
const CONFIG = {
  // Coloque o número da loja com código do país e DDD, somente números.
  // Exemplo fictício: 5511999999999 (55 = Brasil, 11 = DDD).
  whatsapp: "5571981820438",
  storeName: "Sabor na Brasa"
};

const products = [
  {id:1,category:"burger",name:"Brasa Clássico",description:"Pão brioche, burger artesanal 160g, queijo cheddar, alface, tomate e molho da casa.",price:24.90,tag:"QUERIDINHO",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85"},
  {id:2,category:"burger",name:"Duplo Fogo",description:"Dois burgers suculentos, queijo derretido, cebola caramelizada e molho barbecue.",price:32.90,tag:"BEM SERVIDO",image:"https://i.pinimg.com/1200x/05/1a/52/051a5239f2498f78759986c9cc50a336.jpg"},
  {id:3,category:"burger",name:"Crocante da Casa",description:"Burger artesanal, queijo, cebola crispy, picles e maionese temperada.",price:28.90,tag:"CROCANTE",image:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85"},
  {id:4,category:"pizza",name:"Pizza Calabresa",description:"Molho de tomate, muçarela, calabresa fatiada, cebola e orégano.",price:39.90,tag:"CLÁSSICA",image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85"},
  {id:5,category:"pizza",name:"Pizza Quatro Queijos",description:"Muçarela, provolone, parmesão e catupiry, com massa douradinha.",price:46.90,tag:"CREMOSA",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85"},
  {id:6,category:"pizza",name:"Pizza Pepperoni",description:"Muçarela, pepperoni e molho especial em uma combinação irresistível.",price:44.90,tag:"FAVORITA",image:"https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85"},
  {id:7,category:"acai",name:"Açaí 300 ml",description:"Açaí cremoso com banana e granola. Uma pausa refrescante e gostosa.",price:14.90,tag:"NA MEDIDA",image:"https://i.pinimg.com/736x/16/9e/53/169e53cdb17efe34fed9afc2c3ac5897.jpg"},
  {id:8,category:"acai",name:"Açaí 500 ml",description:"Açaí generoso com banana, leite em pó e leite condensado.",price:21.90,tag:"MAIS PEDIDO",image:"https://i.pinimg.com/736x/10/72/6c/10726c6da7c4557f483243b7ea1d0d4f.jpg"},
  {id:9,category:"acai",name:"Açaí Turbinado 700 ml",description:"Açaí com morango, banana, granola, leite em pó e cobertura.",price:28.90,tag:"CAPRICHADO",image:"https://i.pinimg.com/736x/15/10/ba/1510ba1c7e10a3c4d1de7fa1da994a4b.jpg"},
  {id:10,category:"refri",name:"Coca-cola 1LT",description:"Refrigerante gelado Coca-Cola.",price:6.90,tag:"REFRIGERANTE",image:"https://i.pinimg.com/736x/49/b2/04/49b20481aba54ef9b3e97366a1051c00.jpg"}
];

const money = value => value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const productGrid = document.getElementById("productGrid");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const toast = document.getElementById("toast");
let cart = [];
let activeCategory = "todos";
let toastTimer;

function renderProducts(category = "todos") {
  activeCategory = category;
  const visible = category === "todos" ? products : products.filter(p => p.category === category);
  productGrid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="product-tag">${p.tag}</span>
      </div>
      <div class="product-info">
        <div class="product-top"><h3>${p.name}</h3><span class="product-price">${money(p.price)}</span></div>
        <p>${p.description}</p>
        <button class="add-button" data-add="${p.id}"><span>＋</span> Adicionar ao pedido</button>
      </div>
    </article>`).join("");
  document.querySelectorAll("[data-category]").forEach(btn => btn.classList.toggle("active", btn.dataset.category === category));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
function addToCart(id) {
  const product = products.find(p => p.id === Number(id));
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.qty += 1;
  else cart.push({...product,qty:1});
  renderCart();
  showToast(`${product.name} adicionado ao pedido!`);
}
function changeQuantity(id, amount) {
  const item = cart.find(p => p.id === Number(id));
  if (!item) return;
  item.qty += amount;
  if (item.qty <= 0) cart = cart.filter(p => p.id !== Number(id));
  renderCart();
}
function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.qty,0);
  const total = cart.reduce((sum,item) => sum + item.price * item.qty,0);
  cartCount.textContent = count;
  cartTotal.textContent = money(total);
  checkoutButton.disabled = cart.length === 0;
  if (!cart.length) {
    cartItems.innerHTML = `<div class="empty-cart"><span>🛍️</span><h3>Seu carrinho está vazio</h3><p>Adicione algo delicioso do nosso cardápio.</p></div>`;
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div><h4>${item.name}</h4><span class="item-price">${money(item.price * item.qty)}</span>
        <div class="cart-item-controls">
          <button class="qty-button" data-change="-1" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
          <strong>${item.qty}</strong>
          <button class="qty-button" data-change="1" data-id="${item.id}" aria-label="Aumentar quantidade">＋</button>
          <button class="remove-item" data-remove="${item.id}">Remover</button>
        </div>
      </div>
      <span>${money(item.price)}</span>
    </div>`).join("");
}
function openCart() {
  cartOverlay.classList.add("open");
  cartOverlay.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartOverlay.classList.remove("open");
  cartOverlay.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
function checkout() {
  if (!cart.length) return;
  const number = CONFIG.whatsapp.replace(/\D/g,"");
  if (number === "5500000000000" || number.length < 12) {
    showToast("Configure o número do WhatsApp no arquivo script.js.");
    return;
  }
  const total = cart.reduce((sum,item) => sum + item.price * item.qty,0);
  const lines = cart.map(item => `• ${item.qty}x ${item.name} — ${money(item.price * item.qty)}`);
  const message = `Olá! Quero fazer um pedido no ${CONFIG.storeName}:\n\n${lines.join("\n")}\n\n*Subtotal: ${money(total)}*\n\nPoderiam confirmar a disponibilidade, taxa de entrega e formas de pagamento?`;
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
}

productGrid.addEventListener("click", e => {
  const button = e.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});
document.addEventListener("click", e => {
  const categoryButton = e.target.closest("[data-category]");
  if (categoryButton) {
    renderProducts(categoryButton.dataset.category);
    if (categoryButton.classList.contains("category-card")) document.getElementById("cardapio").scrollIntoView({behavior:"smooth"});
  }
  const qtyButton = e.target.closest("[data-change]");
  if (qtyButton) changeQuantity(qtyButton.dataset.id,Number(qtyButton.dataset.change));
  const removeButton = e.target.closest("[data-remove]");
  if (removeButton) { cart = cart.filter(item => item.id !== Number(removeButton.dataset.remove)); renderCart(); }
});
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("continueShopping").addEventListener("click",closeCart);
cartOverlay.addEventListener("click",e => { if (e.target === cartOverlay) closeCart(); });
checkoutButton.addEventListener("click",checkout);
document.addEventListener("keydown",e => { if (e.key === "Escape") closeCart(); });
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click",() => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click",() => {
  mainNav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false"); menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
