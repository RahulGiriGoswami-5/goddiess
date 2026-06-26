// ---- CART LOGIC (sessionStorage - clears when browser closes) ----

function getCart() {
    const data = sessionStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(p => p.name === item.name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    saveCart(cart);
    showAddedToast(item.name);
}

function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(p => p.name !== name);
    saveCart(cart);
    renderCartPage();
}

function updateQty(name, qty) {
    const cart = getCart();
    const item = cart.find(p => p.name === name);
    if (item) {
        item.qty = Math.max(1, parseInt(qty) || 1);
        saveCart(cart);
        renderCartPage();
    }
}

function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, p) => sum + p.qty, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = count;
}

function showAddedToast(name) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #088178;
            color: #fff;
            padding: 14px 22px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            z-index: 999999;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            transform: translateY(10px);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = `${name} added to cart`;
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
    }, 1800);
}

// ---- Wire up "Add to cart" buttons on any page that has them ----
function initAddToCartButtons() {
    document.querySelectorAll('.pro').forEach(pro => {
        const cartBtn = pro.querySelector('.fa-shopping-cart')?.closest('a');
        if (!cartBtn) return;
        const name = pro.querySelector('h5')?.textContent.trim() || 'Product';
        const priceText = pro.querySelector('h4')?.textContent.trim() || '$0';
        const price = parseFloat(priceText.replace('$', '')) || 0;
        const img = pro.querySelector('img')?.getAttribute('src') || '';

        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart({ name, price, img });
        });
    });
}

// ---- Render the cart.html page ----
function renderCartPage() {
    const tbody = document.getElementById('cart-body');
    if (!tbody) return; // not on cart page

    const cart = getCart();
    tbody.innerHTML = '';

    if (cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px;">Your cart is empty.</td></tr>`;
    }

    let subtotal = 0;
    cart.forEach(item => {
        const lineTotal = item.price * item.qty;
        subtotal += lineTotal;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><i class="fas fa-times" style="cursor:pointer;color:#ec544e;" onclick="removeFromCart('${item.name}')"></i></td>
            <td><img src="${item.img}" alt=""></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" min="1" value="${item.qty}" onchange="updateQty('${item.name}', this.value)"></td>
            <td>$${lineTotal.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    initAddToCartButtons();
    updateCartBadge();
    renderCartPage();
});