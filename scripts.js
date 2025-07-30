// Cart functionality with modern UX
let cartCount = 0;
let cartTotal = 0;
const cartBtn = document.querySelector('.cart-btn');

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

// Category interactions with modern UX
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.querySelector('span').textContent;
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 140, 66, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        
        this.appendChild(ripple);
        
        showNotification(`🛍️ Browse ${category} category`);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
});

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

// Observe elements for animation
document.querySelectorAll('.product-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

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
    // Stagger animation for initial load
    const cards = document.querySelectorAll('.product-card, .category-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    showNotification('🏮 Welcome to SynthiaMall Obon Festival Collection!');
});