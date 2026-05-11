let cart = [];

const products = [
{
    name: "Sample Product",
    price: 1500,
    stock: 12,
    img: "firstpartner.png"
},
{
    name: "Sample Product 2",
    price: 2200,
    stock: 12,
    img: "firstpartner.png"
}
];

function renderProducts(){

    const container =
    document.getElementById("productContainer");

    let html = "";

    products.forEach((p, i) => {

        html += `
        <div class="product-card">

            <img src="assets/${p.img}">

            <h3>${p.name}</h3>

            <div class="price">
                ₱${p.price.toLocaleString()}
            </div>

            <div class="stock">
    Stocks: ${p.stock}
</div>

            <div class="qty-box">

                <button onclick="changeQty(this,-1)">
                    -
                </button>

                <input
                type="number"
                class="qty-input"
                value=""
                min="">

                <button onclick="changeQty(this,1)">
                    +
                </button>

            </div>


${p.stock <= 0 ? `

<button
class="btn btn-gold disabled-btn"
disabled>

Out of Stock

</button>

` : `

<button
class="btn btn-gold"
onclick="addToCart(${i}, this)">

Add to Cart

</button>

`}
      </div>
        `;
    });

    container.innerHTML = html;
}

function changeQty(button, amount){

    const input =
    button.parentElement.querySelector(".qty-input");

    let qty = parseInt(input.value) || 0;

    qty += amount;

    if(qty < 1){
        qty = 1;
    }

    input.value = qty;
}

function addToCart(index, button){

    const card =
    button.closest(".product-card");

   const qty =
parseInt(
    card.querySelector(".qty-input").value
) || 1;
   

    const product = products[index];

    // CHECK STOCK
    if(qty > product.stock){

        alert("Not enough stock!");

        return;
    }

    // ADD TO CART
    cart.push({
        ...product,
        qty
    });

    // REMOVE STOCK
    product.stock -= qty;

    // REFRESH PRODUCTS
    renderProducts();

    // UPDATE CART
    updateCart();
}

function toggleCart(){

    const drawer =
    document.getElementById("cartDrawer");

    console.log(drawer);

    drawer.classList.toggle("open");
}
function updateCart(){

    let total = 0;
    let count = 0;

    const cartItems =
    document.getElementById("cartItems");

    let cartHTML = "";

    cart.forEach(item => {

        total += item.price * item.qty;
        count += item.qty;

        cartHTML += `
        <div class="cart-item">

            <img
            src="assets/${item.img}"
            class="cart-item-img">

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ${item.qty} × ₱${item.price.toLocaleString()}
                </p>

            </div>

        </div>
        `;
    });

    cartItems.innerHTML = cartHTML;

    document.getElementById("cart-total")
    .innerText =
    "₱" + total.toLocaleString();

    document.getElementById("cart-count")
    .innerText = count;

    document.getElementById("drawer-total")
    .innerText =
    "₱" + total.toLocaleString();

    document.getElementById("drawer-dp")
    .innerText =
    "₱" + (total * 0.30).toLocaleString();
}

function toggleCart(){

    const drawer =
    document.getElementById("cartDrawer");

    drawer.classList.toggle("show");
}

function toggleQR(){

    const modal =
    document.getElementById("qrModal");

    modal.classList.toggle("hidden");

    // TOTAL
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
    });

    // FULL PAYMENT
    document.querySelector(".pay-now")
    .innerText =
    "TO BE PAID NOW: ₱" +
    total.toLocaleString();

    // NO BALANCE
    document.getElementById("checkoutBalance")
    .innerText = "₱0";
}

renderProducts();