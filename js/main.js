// Main JavaScript file for Nirvana ProGraphics Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Navbar scroll effect
    initNavbarScrollEffect();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Scroll animations
    if (!prefersReducedMotion) {
        initScrollAnimations();
    }
    
    // Portfolio filter
    initPortfolioFilter();
    
    // Testimonials slider
    initTestimonialsSlider();
    
    // Contact form handling
    initContactForm();
    
    // Lazy loading for images
    initLazyLoading();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const heroButtons = document.querySelectorAll('.btn[href^="#"]');
    const allLinks = [...navLinks, ...heroButtons];
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.slide-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonials slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials every 5 seconds
    if (testimonials.length > 1) {
        setInterval(nextTestimonial, 5000);
    }
    
    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next testimonial
                    nextTestimonial();
                } else {
                    // Swipe right - previous testimonial
                    currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
                    showTestimonial(currentTestimonial);
                }
            }
        }
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!validateForm(name, email, subject, message)) {
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Form validation
function validateForm(name, email, subject, message) {
    // Clear previous error messages
    clearFormErrors();
    
    let isValid = true;
    
    // Name validation
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!subject || subject.trim().length < 3) {
        showFieldError('subject', 'Please enter a subject (at least 3 characters)');
        isValid = false;
    }
    
    // Message validation
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.style.borderColor = '#e74c3c';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

// Clear form errors
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    formFields.forEach(field => {
        field.style.borderColor = '#e0e0e0';
    });
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.padding = '1rem';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.marginTop = '1rem';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '500';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    
    messageDiv.textContent = message;
    
    const contactForm = document.getElementById('contact-form');
    contactForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Utility function to debounce events
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate any layout-dependent features here
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
}, 250));

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .error-message {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-message {
        animation: slideIn 0.3s ease;
    }
    
    img {
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Console message for developers
console.log('🎨 Nirvana ProGraphics Portfolio Website');
console.log('Designed and developed by Praveen Vidhate');
console.log('For inquiries: hello@nirvanaprographics.com');