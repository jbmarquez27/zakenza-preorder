

let cart = [];

const products = [
  {
    name: "First Partner Pack – Series 2",
    img: "firstpartner.png",
    unitPrice: 1400,
    casePrice: 8400,
    unitDP: 420,
    caseDP: 2520,
    status: "open",
  details: {
    
  }


  },

  {
    name: "Mega Greninja EX Premium Collection",
    img: "greninja.png",
    unitPrice: 3600,
    casePrice: 21600,
    unitDP: 1080,
    caseDP: 6480,
    status: "open",
  details: {
    
  }


  },

{
  name: "Pokemon TCG [ME05] Pitch Black Booster Box",
  img: "pitch black booster box.png",
  unitPrice: 8500,
  unitDP: 2550,
  status: "coming",
  details: {
    pack: "10 Cards",
    box: "36 Packs",
    case: "6 Boxes",
    language: "English"
  }
  },

{
  name: "Pokemon TCG [ME05] Pitch Black Booster Bundle",
  img: "pitch black booster bundle.png",
  unitPrice: 2000,
  unitDP: 600,
  status: "coming",
  details: {
    unit: "6 Packs",
    case: "25 Units",
    language: "English"
  }
  },

{ 
    name: "Pokemon TCG [ME05] Pitch Black Blister ",
    img: "Blister.png",
    unitPrice: 350,
    casePrice: 100800,
    unitDP: 105,
    caseDP: 30240,
    status: "coming",
  details: {
    unit: "1 Pack | 1 Coin | 1 Code Card ",
    case: "288 Units",
    language: "English"
  }

  },

{
    name: "Pokemon TCG [ME05] Pitch Black Sleeved Booster",
    img: "Pitch Black Sleeves.png",
    unitPrice: 290,
    casePrice: 41760,
    unitDP: 87,
    caseDP: 12528,
    status: "coming",
  details: {
    unit: "1 Pack",
    case: "144 Units",
    language: "English"
  }

  },

{ 
    name:"Pokemon TCG [ME05] Pitch Black Half Booster",
    img: "Half Booster.png",
    unitPrice: 4300,
    casePrice: 51600,
    unitDP: 1290,
    caseDP: 15480,
    status: "coming",
  details: {
     pack: "10 Cards",
    box: "18 Packs",
    case: "12 Boxes",
    language: "English"

  }

  },

{ 
    name:"Pokemon TCG [ME05] Pitch Black ETB",
    img: "Pitch Black ETB.png",
    unitPrice: 3600,
    casePrice: 36000,
    unitDP: 1080,
    caseDP: 10800,
    status: "coming",
  details: {
     pack: "10 Cards",
    box: "18 Packs",
    case: "12 Boxes",
    language: "English"
 }

  }


];

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
startTimers();


let calcItems = [];

function toggleCalculator() {
  document.getElementById("calcModal").classList.toggle("hidden");
}

/* LOAD PRODUCTS INTO DROPDOWN */
function loadCalcProducts() {
  const select = document.getElementById("calc-product");
  select.innerHTML = "";

  products.forEach((p, i) => {
    select.innerHTML += `<option value="${i}">
      ${p.name} - ₱${p.unitPrice}
    </option>`;
  });
}

function addItem() {
  const index = document.getElementById("calc-product").value;
  const p = products[index];

  calcItems.push({
    name: p.name,
    price: p.unitPrice,
    qty: 1
  });

  renderCalc();
}

function renderCalc() {
  const container = document.getElementById("calc-items");

  let html = "";
  let total = 0;
  let count = 0;

  calcItems.forEach((item, i) => {
    const sub = item.price * item.qty;
    total += sub;
    count += item.qty;

    html += `
      <div class="calc-row">
        <div>${item.name}</div>
        <div>₱${item.price.toLocaleString()}</div>

        <input type="number" value="${item.qty}"
          onchange="updateQty(${i}, this.value)" />

        <div>₱${(sub * 0.3).toLocaleString()}</div>

        <button onclick="removeItem(${i})">X</button>
      </div>
    `;
  });

  container.innerHTML = html;

  document.getElementById("calc-total").innerText =
    "₱" + total.toLocaleString();

  document.getElementById("calc-dp").innerText =
    "₱" + (total * 0.3).toLocaleString();

  document.getElementById("calc-count").innerText = count;
}

function updateQty(i, val) {
  calcItems[i].qty = parseInt(val) || 0;
  renderCalc();

}

function removeItem(i) {
  calcItems.splice(i, 1);
  renderCalc();

}

function toggleAllocation() {
  document.getElementById("allocationModal").classList.toggle("show");
}

function updateAllocation() {
  const alloc = parseFloat(document.getElementById("alloc-input").value) || 0;
  const units = parseFloat(document.getElementById("units-input").value) || 0;

  const exact = (alloc / 100) * units;
  const final = Math.floor(exact);

  document.getElementById("alloc-result").innerText = final;

  document.getElementById("alloc-formula").innerText =
    `${alloc.toFixed(2)}% × ${units} = ${exact.toFixed(2)} units`;

  document.getElementById("alloc-note").innerText =
    "Result is rounded down to whole units.";
}


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

    updatePlannerV2();

    renderProducts();

    startTimers();

});