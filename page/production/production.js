// Đổi ảnh chính khi click thumbnail
function changeImage(img) {
  document.getElementById("mainImg").src = img.src;
}

// Chuyển tab
function openTab(evt, tabName) {
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}
