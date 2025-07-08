// LogikMeter JavaScript functionality

// Language management
let currentLanguage = 'en';

// Language data
const translations = {
    en: {
        // Navigation
        'Home': 'Home',
        'Dashboard': 'Dashboard',
        'Topics': 'Topics',
        'Login': 'Login',
        'Sign Up': 'Sign Up',
        'Wallet': 'Wallet',
        'Settings': 'Settings',
        'Logout': 'Logout',
        
        // Home page
        'Welcome to LogikMeter': 'Welcome to LogikMeter',
        'Create, discuss, and vote on important topics with AI-powered analysis. Earn LMC coins for meaningful participation.': 'Create, discuss, and vote on important topics with AI-powered analysis. Earn LMC coins for meaningful participation.',
        'Get Started': 'Get Started',
        'Learn More': 'Learn More',
        'Key Features': 'Key Features',
        'AI-Powered Analysis': 'AI-Powered Analysis',
        'Get intelligent topic breakdowns and structured discussions': 'Get intelligent topic breakdowns and structured discussions',
        'Earn LMC Coins': 'Earn LMC Coins',
        'Get rewarded for creating topics and participating in discussions': 'Get rewarded for creating topics and participating in discussions',
        'Fair Voting System': 'Fair Voting System',
        'Transparent and secure voting on discussion outcomes': 'Transparent and secure voting on discussion outcomes',
        
        // Common
        'or': 'or',
        'Email': 'Email',
        'Password': 'Password',
        'Cancel': 'Cancel',
        'Close': 'Close',
        'Filter': 'Filter',
        'Search': 'Search',
        'All rights reserved.': 'All rights reserved.',
        'Intelligent discussion platform with AI-powered analysis': 'Intelligent discussion platform with AI-powered analysis'
    },
    fa: {
        // Navigation
        'Home': 'خانه',
        'Dashboard': 'داشبورد',
        'Topics': 'موضوعات',
        'Login': 'ورود',
        'Sign Up': 'ثبت نام',
        'Wallet': 'کیف پول',
        'Settings': 'تنظیمات',
        'Logout': 'خروج',
        
        // Home page
        'Welcome to LogikMeter': 'به لاجیک‌متر خوش آمدید',
        'Create, discuss, and vote on important topics with AI-powered analysis. Earn LMC coins for meaningful participation.': 'موضوعات مهم را با تحلیل هوش مصنوعی ایجاد، بحث و رای دهی کنید. برای مشارکت معنادار سکه LMC کسب کنید.',
        'Get Started': 'شروع کنید',
        'Learn More': 'بیشتر بدانید',
        'Key Features': 'ویژگی‌های کلیدی',
        'AI-Powered Analysis': 'تحلیل هوش مصنوعی',
        'Get intelligent topic breakdowns and structured discussions': 'تجزیه و تحلیل هوشمند موضوعات و بحث‌های ساختاریافته دریافت کنید',
        'Earn LMC Coins': 'کسب سکه LMC',
        'Get rewarded for creating topics and participating in discussions': 'برای ایجاد موضوعات و شرکت در بحث‌ها پاداش دریافت کنید',
        'Fair Voting System': 'سیستم رای‌گیری عادلانه',
        'Transparent and secure voting on discussion outcomes': 'رای‌گیری شفاف و امن بر روی نتایج بحث',
        
        // Common
        'or': 'یا',
        'Email': 'ایمیل',
        'Password': 'رمز عبور',
        'Cancel': 'لغو',
        'Close': 'بستن',
        'Filter': 'فیلتر',
        'Search': 'جستجو',
        'All rights reserved.': 'تمام حقوق محفوظ است.',
        'Intelligent discussion platform with AI-powered analysis': 'پلتفرم بحث هوشمند با تحلیل هوش مصنوعی'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeComponents();
    initializeEventListeners();
});

// Language functions
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    
    // Update current language display
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = lang.toUpperCase();
    }
    
    // Update all translatable elements
    updateTranslations();
    
    // Update Bootstrap RTL classes if needed
    updateRTLClasses(lang === 'fa');
}

function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    changeLanguage(savedLanguage);
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const englishText = element.getAttribute('data-en');
        const persianText = element.getAttribute('data-fa');
        
        if (currentLanguage === 'fa' && persianText) {
            element.textContent = persianText;
        } else if (currentLanguage === 'en' && englishText) {
            element.textContent = englishText;
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-placeholder-en]');
    placeholderElements.forEach(element => {
        const englishPlaceholder = element.getAttribute('data-placeholder-en');
        const persianPlaceholder = element.getAttribute('data-placeholder-fa');
        
        if (currentLanguage === 'fa' && persianPlaceholder) {
            element.placeholder = persianPlaceholder;
        } else if (currentLanguage === 'en' && englishPlaceholder) {
            element.placeholder = englishPlaceholder;
        }
    });
}

function updateRTLClasses(isRTL) {
    const body = document.body;
    if (isRTL) {
        body.classList.add('rtl');
        // Update specific Bootstrap classes for RTL
        const elements = document.querySelectorAll('.me-2, .me-3, .ms-3, .text-md-end');
        elements.forEach(element => {
            if (element.classList.contains('me-2')) {
                element.classList.remove('me-2');
                element.classList.add('ms-2');
            }
            if (element.classList.contains('me-3')) {
                element.classList.remove('me-3');
                element.classList.add('ms-3');
            }
        });
    } else {
        body.classList.remove('rtl');
        // Restore original Bootstrap classes
        const elements = document.querySelectorAll('.ms-2, .ms-3');
        elements.forEach(element => {
            if (element.classList.contains('ms-2')) {
                element.classList.remove('ms-2');
                element.classList.add('me-2');
            }
            if (element.classList.contains('ms-3')) {
                element.classList.remove('ms-3');
                element.classList.add('me-3');
            }
        });
    }
}

// Component initialization
function initializeComponents() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Initialize any custom components
    initializeCustomComponents();
}

function initializeCustomComponents() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn[data-loading]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            showButtonLoading(this);
        });
    });
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize filters
    initializeFilters();
}

// Event listeners
function initializeEventListeners() {
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
    
    // Modal events
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            // Reset form when modal opens
            const form = this.querySelector('form');
            if (form) {
                form.reset();
            }
        });
    });
    
    // Navigation active state
    updateActiveNavigation();
}

// Utility functions
function showButtonLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
    button.disabled = true;
    
    // Restore button after 2 seconds (simulate API call)
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
        showButtonLoading(submitButton);
    }
    
    // Simulate form processing
    setTimeout(() => {
        showNotification('Form submitted successfully!', 'success');
        
        // Close modal if form is in a modal
        const modal = form.closest('.modal');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
}

function performSearch(event) {
    const query = event.target.value.toLowerCase();
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            card.closest('.col-md-6, .col-lg-4').style.display = 'block';
        } else {
            card.closest('.col-md-6, .col-lg-4').style.display = 'none';
        }
    });
}

// Filter functionality
function initializeFilters() {
    const filterButton = document.getElementById('applyFilters');
    if (filterButton) {
        filterButton.addEventListener('click', applyFilters);
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const topicCards = document.querySelectorAll('.topic-card');
    
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const selectedStatus = statusFilter ? statusFilter.value : '';
    
    topicCards.forEach(card => {
        const categoryBadge = card.querySelector('.badge:first-child');
        const statusBadge = card.querySelector('.badge:last-child');
        
        const cardCategory = categoryBadge ? categoryBadge.textContent.toLowerCase() : '';
        const cardStatus = statusBadge ? statusBadge.textContent.toLowerCase() : '';
        
        let showCard = true;
        
        if (selectedCategory && !cardCategory.includes(selectedCategory.toLowerCase())) {
            showCard = false;
        }
        
        if (selectedStatus && !cardStatus.includes(selectedStatus.toLowerCase())) {
            showCard = false;
        }
        
        card.closest('.col-md-6, .col-lg-4').style.display = showCard ? 'block' : 'none';
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animation utilities
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle responsive navigation
function handleResponsiveNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }
}

// Initialize responsive navigation
document.addEventListener('DOMContentLoaded', handleResponsiveNav);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
        // Refresh any real-time data here
    }
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // You could send this to an error reporting service
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Export functions for use in other scripts
window.LogikMeter = {
    changeLanguage,
    showNotification,
    showButtonLoading
};