// products.js
const products = [
    { img: 'https://via.placeholder.com/150?text=Product1', alt: 'Product 1', name: 'Product Name 1', price: '$19.99', rating: 4.5 },
    { img: 'https://via.placeholder.com/150?text=Product2', alt: 'Product 2', name: 'Product Name 2', price: '$24.99', rating: 3.8 },
    { img: 'https://via.placeholder.com/150?text=Product3', alt: 'Product 3', name: 'Product Name 3', price: '$29.99', rating: 4.2 },
    { img: 'https://via.placeholder.com/150?text=Product4', alt: 'Product 4', name: 'Product Name 4', price: '$14.99', rating: 5.0 },
    { img: 'https://via.placeholder.com/150?text=Product5', alt: 'Product 5', name: 'Product Name 5', price: '$39.99', rating: 4.0 },
    { img: 'https://via.placeholder.com/150?text=Product6', alt: 'Product 6', name: 'Product Name 6', price: '$49.99', rating: 4.7 },
    { img: 'https://via.placeholder.com/150?text=Product7', alt: 'Product 7', name: 'Product Name 7', price: '$59.99', rating: 3.5 },
    { img: 'https://via.placeholder.com/150?text=Product8', alt: 'Product 8', name: 'Product Name 8', price: '$69.99', rating: 4.9 },
    { img: 'https://via.placeholder.com/150?text=Product9', alt: 'Product 9', name: 'Product Name 9', price: '$79.99', rating: 4.1 },
    { img: 'https://via.placeholder.com/150?text=Product10', alt: 'Product 10', name: 'Product Name 10', price: '$89.99', rating: 4.6 },
];

function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.product-grid');
    products.forEach(prod => {
        const item = document.createElement('div');
        item.classList.add('product-item');
        item.innerHTML = `
            <img src="${prod.img}" alt="${prod.alt}">
            <h3>${prod.name}</h3>
            <p>${prod.price}</p>
            <div class="hover-overlay">
                <div class="rating">${getStars(prod.rating)}</div>
                <div class="icons">
                    <i class="fas fa-shopping-cart"></i>
                    <i class="fas fa-heart"></i>
                </div>
            </div>
        `;
        grid.appendChild(item);
    });
});