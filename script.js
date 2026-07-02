let cart = [];


function renderProducts() {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  products.forEach((p, i) => {


 let detailsHTML = "";

    if (p.details) {
      if (p.details.pack) {
        detailsHTML += `<p>Pack: ${p.details.pack}</p>`;
      }
      if (p.details.box) {
        detailsHTML += `<p>Box: ${p.details.box}</p>`;
      }
      if (p.details.case) {
        detailsHTML += `<p>Case: ${p.details.case}</p>`;
      }
      if (p.details.unit) {
        detailsHTML += `<p>Unit: ${p.details.unit}</p>`;
      }
      if (p.details.language) {
        detailsHTML += `<p>Language: ${p.details.language}</p>`;
      }
    }

    // ✅ CARD
    const html = `
      <div class="product-card">

        <img src="assets/${p.img}" alt="${p.name}">

        <h3>${p.name}</h3>

        <div class="price">₱${p.unitPrice.toLocaleString()}</div>
        <div class="dp">Downpayment: ₱${p.unitDP.toLocaleString()}</div>

        <div class="details">
          ${detailsHTML}
        </div>


<div class="details">
  ${detailsHTML}
</div>

${p.status === "open" ? `

<div class="qty-box">

  <button class="qty-btn"
    onclick="changeQty(this, -1)">
    −
  </button>

  <input
    type="number"
    class="qty-input"
    value=""
    min="0"
  />

  <button class="qty-btn"
    onclick="changeQty(this, 1)">
    +
  </button>

</div>

` : ""}

<button
class="btn-add ${p.status}"
onclick="addToCart(${i}, this)"
${p.status !== "open" ? "disabled" : ""}
>
${p.status === "coming"
  ? "Coming Soon"
  : p.status === "closed"
  ? "Closed"
  : "Add to Cart"}
</button>     

 </div>
    `;

    container.innerHTML += html;
  });
}


  // ✅ RUN AFTER LOAD
renderProducts();


let calcItems = [];

function toggleCalculator() {
  document.getElementById("calcModal").classList.toggle("hidden");
}

// Load products into the calculator dropdown
function loadCalcProducts() {

    const select = document.getElementById("calc-product");

    if (!select) return;

    select.innerHTML = "";

    products.forEach((p, i) => {

        select.innerHTML += `
            <option value="${i}">
                ${p.name} - ₱${p.unitPrice.toLocaleString()}
            </option>
        `;

    });

    updateCalculator();
}

// Keep compatibility if HTML still calls updateAllocation()
function updateAllocation() {
    updateCalculator();
}

// Main calculator
function updateCalculator() {

    const productSelect = document.getElementById("calc-product");
    if (!productSelect) return;

    const product = products[productSelect.value];

    if (!product) {

        document.getElementById("calc-dp").innerText = "₱0";
        document.getElementById("alloc-result").innerText = "0 Units";
        document.getElementById("alloc-formula").innerHTML = "";
        document.getElementById("alloc-note").innerHTML = "";

        return;
    }

    const qty =
        parseInt(document.getElementById("units-input").value) || 0;

    const allocation =
        parseFloat(document.getElementById("alloc-input").value) || 0;

    // 30% Down Payment
    const downPayment = product.unitPrice * qty * 0.30;

    document.getElementById("calc-dp").innerText =
        "₱" + downPayment.toLocaleString();

    // Allocation Result
    const receivedUnits =
        Math.floor((allocation / 100) * qty);

    document.getElementById("alloc-result").innerText =
        receivedUnits + " Units";

    document.getElementById("alloc-formula").innerHTML =
        `${allocation.toFixed(2)}% × ${qty} = <strong>${receivedUnits}</strong> Units`;

    document.getElementById("alloc-note").innerHTML =
        `30% Down Payment: <strong>₱${downPayment.toLocaleString()}</strong>`;
}

// Initialize calculator

/* INIT */
loadCalcProducts();

function changeQty(button, amount){

    const input =
    button.parentElement.querySelector(".qty-input");

    let qty = parseInt(input.value) || 0;

    qty += amount;

    if(qty < 0){
        qty = 0;
    }

    input.value = qty;
}

function addToCart(index, button){

    const card = button.closest(".product-card");

    const qtyInput = card.querySelector(".qty-input");

    let qty = parseInt(qtyInput.value) || 0;

    if(qty <= 0){
        alert("Enter quantity first");
        return;
    }

    const existing =
        cart.find(item => item.index === index);

    if(existing){

        existing.qty += qty;

    } else {

        cart.push({
            index: index,
            qty: qty
        });

    }

    updateCartUI();
    renderCart();

    qtyInput.value = 0;

    console.log(cart);
}


function updateCartUI(){

    let totalQty = 0;
    let totalAmount = 0;
    let totalDP = 0;

    cart.forEach(item => {

        totalQty += item.qty;

        totalAmount +=
        products[item.index].unitPrice * item.qty;

        totalDP +=
products[item.index].unitDP * item.qty;

    });

    const badge =
    document.getElementById("cart-count");

    if(badge){
        badge.innerText = totalQty;
    }

    const cartTotal =
    document.getElementById("cart-total");

    if(cartTotal){
        cartTotal.innerText =
        "₱" + totalAmount.toLocaleString();
    }

const cartDP =
document.getElementById("cartDP");

if(cartDP){
    cartDP.innerText =
    `₱${totalDP.toLocaleString()}`;
}

const checkoutDP =
document.getElementById("checkoutDP");

const checkoutBalance =
document.getElementById("checkoutBalance");

if(checkoutDP){
    checkoutDP.innerText =
    `₱${totalDP.toLocaleString()}`;
}

if(checkoutBalance){
    checkoutBalance.innerText =
    `₱${(totalAmount - totalDP).toLocaleString()}`;

}
}

function toggleCart() {

    const drawer =
        document.getElementById("cartDrawer");

    drawer.classList.toggle("show");
}

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartDP =
        document.getElementById("cartDP");

    if(cart.length === 0){

        cartItems.innerHTML =
            "<p>Your cart is empty</p>";

        cartTotal.innerText = "₱0";
        cartDP.innerText = "₱0";

        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, i) => {

        const product = products[item.index];

       const subtotal =
    product.unitPrice * item.qty;

        total += subtotal;

        html += `
        <div class="cart-item">

            <img src="assets/${product.img}"
                 class="cart-item-img">
                
                 <h4>${product.name}</h4>

             <p>₱${subtotal.toLocaleString()}</p>

            <div class="cart-info">

               

                <div class="cart-qty">

                    <button onclick="changeCartQty(${i}, -1)">
                        -
                    </button>

                    <span>${item.qty}</span>

                    <button onclick="changeCartQty(${i}, 1)">
                        +
                    </button>

                </div>

                <button class="remove-btn"
                    onclick="removeCartItem(${i})">

                    Remove

                </button>

            </div>

        </div>
        `;
    });

    cartItems.innerHTML = html;

    cartTotal.innerText =
        "₱" + total.toLocaleString();

    cartDP.innerText =
        "₱" + Math.floor(total * 0.30).toLocaleString();
}

function changeCartQty(i, amount){

    cart[i].qty += amount;

    if(cart[i].qty <= 0){
        cart.splice(i,1);
    }

    updateCartUI();
    renderCart();
}

function removeCartItem(i){

    cart.splice(i,1);

    updateCartUI();
    renderCart();
}

function toggleQR(){
    document
      .getElementById("qrModal")
      .classList.toggle("hidden");
}




document.addEventListener("DOMContentLoaded", () => {


    renderProducts();

    loadCalcProducts();

    updateCalculator();


});
