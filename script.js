let cart = [];


// ================================
// PRODUCT SIZE + PRICE CHANGE
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const selects = document.querySelectorAll(".size-select");

    selects.forEach(function (select) {

        select.addEventListener("change", function () {

            const card = select.closest(".product-card");

            const price = select.value;

            const priceElement =
                card.querySelector(".product-price");

            priceElement.innerText = "₹" + price;

        });

    });


    // Cart open
    const cartButton =
        document.querySelector(".cart");

    if (cartButton) {

        cartButton.style.cursor = "pointer";

        cartButton.addEventListener(
            "click",
            openCart
        );

    }

    createCartBox();
});


// ================================
// ADD TO CART
// ================================

function addToCart() {

    const button = document.activeElement;

    const card =
        button.closest(".product-card");

    if (!card) {
        return;
    }

    const name =
        card.querySelector("h3").innerText;

    const select =
        card.querySelector(".size-select");

    const selectedOption =
        select.options[select.selectedIndex];

    const price =
        Number(select.value);

    const weight =
        selectedOption.dataset.weight;


    // Same product + same weight
    const existing =
        cart.find(function (item) {

            return (
                item.name === name &&
                item.weight === weight
            );

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            weight: weight,
            price: price,
            quantity: 1
        });

    }


    updateCart();

    alert(
        "✅ " +
        name +
        " (" +
        weight +
        ") कार्ट में जोड़ दिया गया!"
    );
}


// ================================
// UPDATE CART
// ================================

function updateCart() {

    let totalItems = 0;

    cart.forEach(function (item) {

        totalItems += item.quantity;

    });


    const count =
        document.getElementById("cart-count");

    if (count) {

        count.innerText = totalItems;

    }


    renderCart();
}


// ================================
// CREATE CART
// ================================

function createCartBox() {

    if (document.getElementById("cart-box")) {

        return;

    }


    const box =
        document.createElement("div");

    box.id = "cart-box";


    box.innerHTML = `

        <div class="cart-overlay"
             onclick="closeCart()">
        </div>

        <div class="cart-panel">

            <button
                class="close-cart"
                onclick="closeCart()">
                ×
            </button>

            <h2>🛒 आपका कार्ट</h2>

            <div id="cart-items"></div>

            <div class="cart-total">
                कुल: ₹<span id="cart-total">0</span>
            </div>


            <div class="customer-form">

                <h3>ऑर्डर की जानकारी</h3>

                <input
                    type="text"
                    id="customer-name"
                    placeholder="आपका नाम"
                >

                <input
                    type="tel"
                    id="customer-phone"
                    placeholder="मोबाइल नंबर"
                >

                <textarea
                    id="customer-address"
                    placeholder="पूरा पता"
                    rows="3"
                ></textarea>


                <button
                    class="whatsapp-order"
                    onclick="sendWhatsAppOrder()">

                    📱 WhatsApp पर ऑर्डर भेजें

                </button>

            </div>

        </div>
    `;


    document.body.appendChild(box);
}


// ================================
// OPEN CART
// ================================

function openCart() {

    createCartBox();

    document
        .getElementById("cart-box")
        .classList.add("show");

    renderCart();
}


// ================================
// CLOSE CART
// ================================

function closeCart() {

    const box =
        document.getElementById("cart-box");

    if (box) {

        box.classList.remove("show");

    }
}


// ================================
// SHOW CART ITEMS
// ================================

function renderCart() {

    createCartBox();


    const items =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");


    if (cart.length === 0) {

        items.innerHTML = `
            <div class="empty-cart">
                🛒<br>
                आपका कार्ट खाली है।
            </div>
        `;

        totalElement.innerText = "0";

        return;
    }


    let total = 0;

    items.innerHTML = "";


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.weight} × ₹${item.price}
                </p>

            </div>


            <div class="quantity">

                <button
                    onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>


            <strong>
                ₹${itemTotal}
            </strong>


            <button
                class="remove-item"
                onclick="removeItem(${index})">

                🗑️

            </button>
        `;


        items.appendChild(div);

    });


    totalElement.innerText = total;
}


// ================================
// QUANTITY
// ================================

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


// ================================
// REMOVE
// ================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// ================================
// WHATSAPP ORDER
// ================================

function sendWhatsAppOrder() {

    if (cart.length === 0) {

        alert("❌ आपका कार्ट खाली है।");

        return;
    }


    const name =
        document
        .getElementById("customer-name")
        .value
        .trim();


    const phone =
        document
        .getElementById("customer-phone")
        .value
        .trim();


    const address =
        document
        .getElementById("customer-address")
        .value
        .trim();


    if (!name) {

        alert("कृपया अपना नाम लिखें।");

        return;
    }


    if (!phone) {

        alert("कृपया मोबाइल नंबर लिखें।");

        return;
    }


    if (!address) {

        alert("कृपया पूरा पता लिखें।");

        return;
    }


    let total = 0;


    let message =
        "नमस्ते Pannu Rasoi 👋\n\n";


    message +=
        "मुझे यह सामान ऑर्डर करना है:\n\n";


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        message +=
            `${index + 1}. ${item.name}\n`;

        message +=
            `   पैक: ${item.weight}\n`;

        message +=
            `   मात्रा: ${item.quantity}\n`;

        message +=
            `   कीमत: ₹${itemTotal}\n\n`;

    });


    message +=
        `कुल ऑर्डर: ₹${total}\n\n`;


    message +=
        "ग्राहक की जानकारी:\n";

    message +=
        `नाम: ${name}\n`;

    message +=
        `मोबाइल: ${phone}\n`;

    message +=
        `पता: ${address}\n\n`;


    message +=
        "कृपया मेरा ऑर्डर कन्फर्म करें।";


    // =================================
    // अपना WhatsApp नंबर
    // =================================

    const phoneNumber =
        "+919667028235";


    const url =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(url, "_blank");
}