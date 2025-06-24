document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fixed header on scroll
    const header = document.querySelector('.navbar');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('navbar-scrolled', 'shadow-sm');
            } else {
                header.classList.remove('navbar-scrolled', 'shadow-sm');
            }
        });
    }

    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Hero video handling
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Ensure video plays when loaded
        heroVideo.addEventListener('loadedmetadata', function() {
            const playPromise = heroVideo.play();
            
            // Handle autoplay restrictions
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Autoplay prevented:', error);
                    // Show fallback image if video fails to play
                    const heroSection = document.querySelector('.hero-section');
                    if (heroSection) {
                        heroSection.style.backgroundImage = 'url("https://images.unsplash.com/photo-1601597111158-5fce897524b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")';
                        heroSection.style.backgroundSize = 'cover';
                        heroSection.style.backgroundPosition = 'center';
                    }
                });
            }
        });
        
        // Handle video loading errors
        heroVideo.addEventListener('error', function() {
            console.error('Error loading hero video');
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.backgroundImage = 'url("https://images.unsplash.com/photo-1601597111158-5fce897524b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")';
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
            }
        });
    }

    // Initialize carousel with interval
    const myCarousel = document.querySelector('#heroCarousel');
    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 5000,
            touch: true,
            ride: 'carousel'
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Language Toggle
    const languageToggle = document.getElementById('languageToggle');
    const langBtnText = document.getElementById('langBtnText');
    let currentLang = 'en';

    languageToggle.addEventListener('click', function() {
        if (currentLang === 'en') {
            triggerTranslation('kn', function(success) {
                if (success) {
                    currentLang = 'kn';
                    langBtnText.textContent = 'English';
                }
            });
        } else {
            triggerTranslation('en', function(success) {
                if (success) {
                    currentLang = 'en';
                    langBtnText.textContent = 'ಕನ್ನಡ';
                }
            });
        }
    });

    function triggerTranslation(targetLang, callback, attempt = 0) {
        var select = document.querySelector('select.goog-te-combo');
        if (select) {
            if (select.value !== targetLang) {
                select.value = targetLang;
                select.dispatchEvent(new Event('change'));
                setTimeout(function() { callback(true); }, 100); // Give time for translation
            } else {
                callback(true); // Already in target language
            }
        } else if (attempt < 20) { // Retry up to 20 times (2 seconds)
            setTimeout(function() {
                triggerTranslation(targetLang, callback, attempt + 1);
            }, 100);
        } else {
            callback(false); // Failed after retries
        }
    }

    // Smooth Scroll
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

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Service Cards Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Mobile Menu Toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Function to handle currency formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Function to handle EMI calculation
function calculateEMI(principal, rate, years) {
    const monthlyRate = rate / 12 / 100;
    const numPayments = years * 12;
    
    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                (Math.pow(1 + monthlyRate, numPayments) - 1) || 0;
    
    const totalPayment = emi * numPayments;
    const totalInterest = totalPayment - principal;
    
    return {
        emi: emi || 0,
        totalPayment: totalPayment || 0,
        totalInterest: totalInterest >= 0 ? totalInterest : 0
    };
}

// Function to handle fixed deposit calculation
function calculateFD(principal, rate, years) {
    const amount = principal * Math.pow(1 + (rate / 100), years);
    return Math.round(amount);
}
