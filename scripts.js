// Cart functionality with modern UX
let cartCount = 0;
let cartTotal = 0;
const cartBtn = document.querySelector('.cart-btn');

// Function to attach add-to-cart listeners
function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const priceText = productCard.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            
            cartCount++;
            cartTotal += price;
            
            // Update cart display
            cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cartCount}) - $${cartTotal.toFixed(2)}`;
            
            // Modern feedback animation
            this.style.background = 'var(--sage-mint)';
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            
            // Product card animation
            productCard.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.background = '';
                this.innerHTML = 'Add to Cart';
                productCard.style.transform = '';
            }, 1500);
        });
    });
}

// Enhanced search functionality
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleSearch();
});

function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Modern notification style
        showNotification(`🔍 Searching for: ${searchTerm}`);
    }
}

// Modern notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: var(--gradient-sunset);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: var(--shadow-warm);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add dynamic styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    /* Smooth scrolling */
    html {
        scroll-behavior: smooth;
    }
    
    /* Loading states */
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Performance optimization: Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle responsive adjustments
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile', isMobile);
    }, 250);
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        searchInput.focus();
    }
    
    if (e.key === 'Escape') {
        searchInput.blur();
    }
});

// Modern loading states
function showLoading(element) {
    element.classList.add('loading');
    element.style.position = 'relative';
    
    const loader = document.createElement('div');
    loader.innerHTML = '🏮';
    loader.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        animation: spin 1s linear infinite;
    `;
    loader.className = 'loader';
    element.appendChild(loader);
}

function hideLoading(element) {
    element.classList.remove('loading');
    const loader = element.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    showNotification('🏮 Welcome to SynthiaMall Obon Festival Collection!');

    // Render featured products
    const featuredGrid = document.querySelector('#featured-grid');
    if (featuredGrid && typeof products !== 'undefined') {
        console.log('Rendering featured products:', products);
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            featuredGrid.appendChild(productCard);
        });
    } else {
        console.error('Featured products not defined or grid not found. Check if products.js is loaded before scripts.js.');
    }

    // Render cheap products
    const cheapGrid = document.querySelector('#cheap-grid');
    if (cheapGrid && typeof cheapProducts !== 'undefined') {
        console.log('Rendering cheap products:', cheapProducts);
        cheapProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            cheapGrid.appendChild(productCard);
        });
    } else {
        console.error('Cheap products not defined or grid not found. Check products.js.');
    }

    // Render new products
    const newGrid = document.querySelector('#new-grid');
    if (newGrid && typeof newProducts !== 'undefined') {
        console.log('Rendering new products:', newProducts);
        newProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            newGrid.appendChild(productCard);
        });
    } else {
        console.error('New products not defined or grid not found. Check products.js.');
    }

    // Attach listeners và animation cho tất cả cards sau khi render toàn bộ
    attachAddToCartListeners();

    const allCards = document.querySelectorAll('.product-card');
    if (allCards.length === 0) {
        console.error('No product cards found. Check if grids exist in HTML and products are defined.');
    }
    allCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    allCards.forEach(el => observer.observe(el));
});