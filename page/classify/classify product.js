document.addEventListener('DOMContentLoaded', () => {
    // Danh sách 11 sản phẩm
    const products = [
        { name: 'Moisturizing Cream', price: 25.99, image: 'https://placehold.co/400x240?text=Moisturizer' },
        { name: 'Lip Balm Set', price: 15.50, image: 'https://placehold.co/400x240?text=Lip+Balm' },
        { name: 'Face Mask Pack', price: 19.99, image: 'https://placehold.co/400x240?text=Face+Mask' },
        { name: 'Eyeliner Pencil', price: 8.99, image: 'https://placehold.co/400x240?text=Eyeliner' },
        { name: 'Sunscreen Lotion', price: 22.00, image: 'https://placehold.co/400x240?text=Sunscreen' },
        { name: 'Hair Serum', price: 18.75, image: 'https://placehold.co/400x240?text=Hair+Serum' },
        { name: 'Nail Polish Kit', price: 12.99, image: 'https://placehold.co/400x240?text=Nail+Polish' },
        { name: 'Perfume Bottle', price: 45.00, image: 'https://placehold.co/400x240?text=Perfume' },
        { name: 'Foundation', price: 30.00, image: 'https://placehold.co/400x240?text=Foundation' },
        { name: 'Blush Palette', price: 28.50, image: 'https://placehold.co/400x240?text=Blush' },
        { name: 'Setting Spray', price: 24.00, image: 'https://placehold.co/400x240?text=Setting+Spray' }
    ];

    const productGrid = document.querySelector('.product-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // GHI CHÚ: Biến để theo dõi số lượng sản phẩm đã hiển thị
    let productsShown = 0;
    const productsPerLoad = 8; // Tải 8 sản phẩm mỗi lần

    // GHI CHÚ: Hàm để tải và hiển thị thêm sản phẩm
    function loadProducts() {
        const startIndex = productsShown;
        const endIndex = startIndex + productsPerLoad;
        const productsToLoad = products.slice(startIndex, endIndex);

        productsToLoad.forEach(product => {
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
            // Thêm sản phẩm mới vào lưới mà không xóa các sản phẩm cũ
            productGrid.appendChild(card);
        });

        // Cập nhật số lượng sản phẩm đã hiển thị
        productsShown += productsToLoad.length;

        // Ẩn nút "Tải thêm" nếu đã hiển thị hết tất cả sản phẩm
        if (productsShown >= products.length) {
            loadMoreBtn.classList.add('hidden');
        }
    }

    // GHI CHÚ: Gán sự kiện click cho nút
    if (productGrid && loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadProducts);

        // Tải loạt sản phẩm đầu tiên khi trang vừa mở
        loadProducts();
    }
});