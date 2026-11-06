
/* HERO IMAGE SLIDER */

let currentSlide = 0;

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Automatically change image every 5 seconds
setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 5000);


/* PRODUCT CAROUSEL */

function scrollProducts(direction) {
    const carousel = document.getElementById('product-carousel');

    carousel.scrollBy({
        left: direction * 250,
        behavior: 'smooth'
    });
}


/* SHOPPING CART */

let cart = [];

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + ' added to cart!');
}


function updateCart() {

    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let totalItems = 0;
    let totalPrice = 0;

    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    }

    cart.forEach((item, index) => {

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>RM ${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartTotal.textContent = 'RM ' + totalPrice.toFixed(2);
}


/* REMOVE ITEM */

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


/* OPEN / CLOSE CART */

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('open');
}


/* WHATSAPP CHECKOUT */

function checkout() {

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const phoneNumber = '60132582804'; // Replace with your WhatsApp number

    let message = 'Hello! I would like to place an order:\n\n';

    let total = 0;

    cart.forEach(item => {

        let subtotal = item.price * item.quantity;

        message += `${item.name} x ${item.quantity} = RM ${subtotal.toFixed(2)}\n`;

        total += subtotal;
    });

    message += `\nTotal: RM ${total.toFixed(2)}`;
    message += '\n\nThank you!';

    const whatsappURL =
        'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);

    window.open(whatsappURL, '_blank');
}
