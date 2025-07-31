document.querySelectorAll('.qty-increase, .qty-decrease').forEach(btn => {
  btn.addEventListener('click', function (e) {
    addRippleEffect(e, this);
    const qtyEl = this.parentNode.querySelector('.qty-number');
    let qty = parseInt(qtyEl.textContent);

    if (this.classList.contains('qty-increase')) qty++;
    else if (qty > 1) qty--;

    qtyEl.textContent = qty;
    updateTotals();
  });
});

document.querySelectorAll('.remove-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = this.closest('.cart-card');
    card.classList.add('fade-out');
    setTimeout(() => {
      card.remove();
      updateTotals();
      showNotification('🗑️ Item removed');
    }, 400);
  });
});

function updateTotals() {
  let subtotal = 0;
  document.querySelectorAll('.cart-card').forEach(card => {
    const priceText = card.querySelector('.price').textContent.replace(/[^\d]/g, '');
    const price = parseInt(priceText);
    const qty = parseInt(card.querySelector('.qty-number').textContent);
    const total = price * qty;

    card.querySelector('.item-total').textContent = total.toLocaleString('vi-VN') + '₫';
    subtotal += total;
  });

  document.querySelector('.subtotal').textContent = subtotal.toLocaleString('vi-VN') + '₫';
  const discount = 3000000;
  const total = subtotal - discount;
  document.querySelector('.total').textContent = total.toLocaleString('vi-VN') + '₫';
}

// Ripple Effect
function addRippleEffect(e, button) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const rect = button.getBoundingClientRect();
  ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
  ripple.style.left = e.clientX - rect.left - ripple.offsetWidth / 2 + 'px';
  ripple.style.top = e.clientY - rect.top - ripple.offsetHeight / 2 + 'px';
  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// Notification
function showNotification(msg) {
  const note = document.createElement('div');
  note.textContent = msg;
  note.style.cssText = `
    position: fixed; top: 100px; right: 24px;
    background: var(--gradient-obon); color: white;
    padding: 14px 20px; border-radius: 8px;
    box-shadow: var(--shadow-glow); z-index: 9999;
    transform: translateX(150%);
    transition: transform 0.4s ease;
  `;
  document.body.appendChild(note);
  setTimeout(() => (note.style.transform = 'translateX(0)'), 50);
  setTimeout(() => {
    note.style.transform = 'translateX(150%)';
    setTimeout(() => note.remove(), 400);
  }, 2500);
}
