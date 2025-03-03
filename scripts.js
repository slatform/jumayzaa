// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileNav = document.querySelector('.mobile-nav');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const countdownElement = document.getElementById('countdown');

// Initialize current slide index
let currentSlide = 0;

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initAnimations();
    startCountdown();
    initProductInteractions();
    
    // Set page transition on load
    document.body.classList.add('page-transition');
    setTimeout(() => {
        document.body.classList.add('active');
    }, 100);
});

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Hero Slider Functions
function initHeroSlider() {
    // Reset all slides
    resetSlides();
    
    // Set first slide as current
    slides[0].classList.add('current');
    
    // Set event listeners for slider navigation
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
}

function resetSlides() {
    slides.forEach(slide => {
        slide.classList.remove('current');
    });
}

function nextSlide() {
    resetSlides();
    
    if(currentSlide === slides.length - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    
    slides[currentSlide].classList.add('current');
}

function prevSlide() {
    resetSlides();
    
    if(currentSlide === 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide--;
    }
    
    slides[currentSlide].classList.add('current');
}

// Countdown Timer for Next Drop
function startCountdown() {
    // Set the date for next drop (example: 7 days from now)
    const dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 7);
    dropDate.setHours(10, 0, 0, 0); // 10 AM
    
    function updateCountdown() {
        const now = new Date();
        const difference = dropDate - now;
        
        if (difference <= 0) {
            // Drop has arrived
            countdownElement.innerHTML = "LIVE NOW";
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Format and display countdown
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Product interactions and animations
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Hover effect for product cards
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
        
        // Quick view functionality
        const viewButton = card.querySelector('.view-button');
        if (viewButton) {
            viewButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Here you would typically open a quick view modal
                // For demonstration purposes, we'll just log the product name
                const productName = card.querySelector('.product-title').textContent;
                console.log(`Quick view for: ${productName}`);
                
                // In a real implementation, you would fetch product details
                // and display them in a modal
            });
        }
    });
}

// Scroll animations
function initAnimations() {
    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        // Shrink header on scroll
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '20px 0';
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                entry.target.classList.add('page-transition');
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Newsletter subscription handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (isValidEmail(email)) {
            // Here you would typically send this to your backend
            console.log(`Subscribing email: ${email}`);
            
            // Show success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thanks for subscribing!';
            successMessage.classList.add('success-message');
            successMessage.style.color = '#ffffff';
            successMessage.style.marginTop = '10px';
            
            // Replace form with success message
            this.innerHTML = '';
            this.appendChild(successMessage);
        } else {
            // Show error for invalid email
            alert('Please enter a valid email address');
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Product filter functionality (for shop page)
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const productItems = document.querySelectorAll('.product-card');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter products
                productItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Add skeletal loading states for images
function addSkeletalLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Create placeholder for each image
        img.classList.add('image-loading');
        
        // When image loads, remove the loading class
        img.addEventListener('load', () => {
            img.classList.remove('image-loading');
        });
    });
}

// Initialize additional features if they exist on the page
if (document.querySelector('.filter-button')) {
    initProductFilters();
}

// Add to cart functionality
document.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart') || e.target.closest('.add-to-cart')) {
        e.preventDefault();
        
        // Get product info (in a real app, you'd get more details)
        const productCard = e.target.closest('.product-card');
        let productName = '';
        let productPrice = '';
        
        if (productCard) {
            productName = productCard.querySelector('.product-title').textContent;
            productPrice = productCard.querySelector('.product-price').textContent;
        }
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
            
            // Add animation to cart icon
            cartCount.classList.add('pulse');
            setTimeout(() => {
                cartCount.classList.remove('pulse');
            }, 300);
        }
        
        // Show added to cart notification
        const notification = document.createElement('div');
        notification.classList.add('cart-notification');
        notification.textContent = `${productName} added to cart`;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});