document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            name: 'Moisturizing Cream',
            price: 25.99,
            image: 'https://placehold.co/400x240?text=Moisturizer'
        },
        {
            name: 'Lip Balm Set',
            price: 15.50,
            image: 'https://placehold.co/400x240?text=Lip+Balm'
        },
        {
            name: 'Face Mask Pack',
            price: 19.99,
            image: 'https://placehold.co/400x240?text=Face+Mask'
        },
        {
            name: 'Eyeliner Pencil',
            price: 8.99,
            image: 'https://placehold.co/400x240?text=Eyeliner'
        },
        {
            name: 'Sunscreen Lotion',
            price: 22.00,
            image: 'https://placehold.co/400x240?text=Sunscreen'
        },
        {
            name: 'Hair Serum',
            price: 18.75,
            image: 'https://placehold.co/400x240?text=Hair+Serum'
        },
        {
            name: 'Nail Polish Kit',
            price: 12.99,
            image: 'https://placehold.co/400x240?text=Nail+Polish'
        },
        {
            name: 'Perfume Bottle',
            price: 45.00,
            image: 'https://placehold.co/400x240?text=Perfume'
        }
    ];

    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }
});