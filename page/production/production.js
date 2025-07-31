// ==============================
// 1️⃣ Đổi ảnh chính khi click thumbnail
// ==============================
function changeImage(img) {
  const mainImg = document.getElementById("mainImg");
  mainImg.src = img.src;

  document.querySelectorAll(".obon-thumbs img")
    .forEach(t => t.classList.remove("active"));

  img.classList.add("active");
}

// ==============================
// 2️⃣ Chuyển tab hiển thị nội dung + hiệu ứng
// ==============================
function openTab(evt, tabName) {
  document.querySelectorAll(".tab-content")
    .forEach(c => c.classList.remove("active", "fade-in"));

  document.querySelectorAll(".tab-btn")
    .forEach(b => b.classList.remove("active"));

  const tab = document.getElementById(tabName);
  tab.classList.add("active");
  setTimeout(() => tab.classList.add("fade-in"), 10); // animation mượt

  evt.currentTarget.classList.add("active");
}

// ==============================
// 3️⃣ Nút Read More trong Description
// ==============================
function toggleReadMore(btn) {
  const extra = btn.nextElementSibling;
  extra.classList.toggle("show");

  if (extra.classList.contains("show")) {
    btn.innerHTML = `<i class="fa-solid fa-angles-up"></i> Show Less`;
  } else {
    btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Read More`;
  }
}

// ==============================
// 4️⃣ Load More Reviews
// ==============================
function loadMoreReviews(btn) {
  const newReview = document.createElement("div");
  newReview.className = "review-item fade-in";
  newReview.innerHTML = `
    <img src="https://i.pravatar.cc/50?img=${Math.floor(Math.random()*50)}" alt="User">
    <div>
      <p>⭐⭐⭐⭐⭐ <strong>Love it!</strong> <span class="date">- just now</span></p>
      <p>"Great quality and fast shipping. Highly recommend!"</p>
    </div>`;
  btn.before(newReview);

  showNotification(`<i class="fa-solid fa-comment-dots"></i> New review loaded!`);
}

// ==============================
// 5️⃣ Giỏ hàng demo (Add to Cart)
// ==============================
let cartCount = 0;
let cartTotal = 0;
const cartBtn = document.querySelector(".cart-btn");

document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const qty = parseInt(document.getElementById("qty")?.value) || 1;
    const price = 39.99;
    cartCount += qty;
    cartTotal += price * qty;
    updateCartDisplay();

    btn.classList.add("added");
    btn.innerHTML = `<i class="fa-solid fa-check"></i> Added!`;
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to Cart`;
    }, 1500);
  });
});

function updateCartDisplay() {
  if (cartBtn) {
    cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cartCount}) - $${cartTotal.toFixed(2)}`;
  }
}

// ==============================
// 6️⃣ Notification
// ==============================
function showNotification(message) {
  const n = document.createElement("div");
  n.className = "notification";
  n.innerHTML = message;
  document.body.appendChild(n);

  requestAnimationFrame(() => n.classList.add("visible"));
  setTimeout(() => n.classList.remove("visible"), 3000);
  n.addEventListener("transitionend", () => n.remove());
}

// ==============================
// 7️⃣ Xử lý nút Add trong Related Products
// ==============================
document.querySelectorAll(".related-card .btn-action").forEach(btn => {
  btn.addEventListener("click", () => {
    showNotification(`<i class="fa-solid fa-cart-plus"></i> Added to cart!`);
  });
});

// ==============================
// 8️⃣ Xử lý tìm kiếm demo
// ==============================
const searchInput = document.querySelector(".search-box input");
const searchBtn   = document.querySelector(".search-box button");

if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") handleSearch();
  });
}

function handleSearch() {
  const term = searchInput.value.trim();
  if (!term) return showNotification(`<i class="fa-solid fa-triangle-exclamation"></i> Please enter a keyword!`);
  showNotification(`<i class="fa-solid fa-magnifying-glass"></i> Searching for: ${term}`);
}

// ==============================
// 9️⃣ Keyboard Shortcuts
// ==============================
document.addEventListener("keydown", e => {
  if (e.key === "/" && !["INPUT","TEXTAREA"].includes(e.target.tagName)) {
    e.preventDefault();
    if (searchInput) searchInput.focus();
  }
  if (e.key === "Escape" && searchInput) searchInput.blur();
});

// ==============================
// 🔟 Khởi tạo khi load trang
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  showNotification(`<i class="fa-solid fa-gift"></i> Welcome to SynthiaMall Obon Festival!`);
  const defBtn = document.querySelector(".tab-btn.active");
  if (defBtn) {
    openTab({ currentTarget: defBtn }, defBtn.getAttribute("onclick").split("'")[1]);
  }
});
// ==============================
// 🔥 SORT RELATED PRODUCTS
// ==============================
const relatedSortSelect = document.getElementById("relatedSortSelect");
const relatedGrid = document.getElementById("relatedGrid");

if (relatedSortSelect && relatedGrid) {
  relatedSortSelect.addEventListener("change", () => {
    const relatedItems = Array.from(relatedGrid.querySelectorAll(".related-card"));
    const sortValue = relatedSortSelect.value;

    relatedItems.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price);
      const priceB = parseFloat(b.dataset.price);

      if (sortValue === "priceLow") return priceA - priceB;
      if (sortValue === "priceHigh") return priceB - priceA;
      return 0; // giữ nguyên cho popular, new
    });

    relatedGrid.innerHTML = "";
    relatedItems.forEach(item => relatedGrid.appendChild(item));
  });
}

