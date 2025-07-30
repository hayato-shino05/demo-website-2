// slider.js
document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.mySwiper', {
        loop: true,
        autoplay: { delay: 2500 },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
});