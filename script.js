// ============ LANGUAGE DROPDOWN FUNCTIONALITY ============ 
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const languageSwitch = document.querySelector('.language-switch');
    
    dropdown.classList.toggle('active');
    languageSwitch.classList.toggle('active');
}

function changeLanguage(lang) {
    const languageSwitch = document.querySelector('.language-switch span:last-child');
    const flag = document.querySelector('.language-switch .flag');
    
    if (lang === 'en') {
        languageSwitch.textContent = 'EN';
        flag.className = 'flag en';
    } else {
        languageSwitch.textContent = 'ES';
        flag.className = 'flag es';
    }
    
    // Close dropdown
    document.getElementById('languageDropdown').classList.remove('active');
    
    // Here you would implement actual language switching logic
    console.log('Language changed to:', lang);
}

// Close language dropdown when clicking outside
document.addEventListener('click', function(event) {
    const languageSwitch = document.querySelector('.language-switch');
    const dropdown = document.getElementById('languageDropdown');
    
    if (!languageSwitch.contains(event.target)) {
        dropdown.classList.remove('active');
        languageSwitch.classList.remove('active');
    }
});

// ============ MOBILE MENU FUNCTIONALITY ============
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu.classList.contains('active')) {
        // Cerrar menú
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        toggle.innerHTML = '☰';
        
        // Close all submenus
        const submenus = document.querySelectorAll('.mobile-submenu');
        const toggles = document.querySelectorAll('.submenu-toggle');
        submenus.forEach(submenu => submenu.classList.remove('active'));
        toggles.forEach(toggle => toggle.classList.remove('active'));
    } else {
        // Abrir menú
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        toggle.innerHTML = '×';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    toggle.innerHTML = '☰';
    
    // Close all submenus
    const submenus = document.querySelectorAll('.mobile-submenu');
    const toggles = document.querySelectorAll('.submenu-toggle');
    submenus.forEach(submenu => submenu.classList.remove('active'));
    toggles.forEach(toggle => toggle.classList.remove('active'));
}

function toggleSubmenu(element) {
    const submenu = element.nextElementSibling;
    const toggle = element.querySelector('.submenu-toggle');
    
    submenu.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Close other submenus
    const allSubmenus = document.querySelectorAll('.mobile-submenu');
    const allToggles = document.querySelectorAll('.submenu-toggle');
    
    allSubmenus.forEach(sub => {
        if (sub !== submenu) {
            sub.classList.remove('active');
        }
    });
    
    allToggles.forEach(tog => {
        if (tog !== toggle) {
            tog.classList.remove('active');
        }
    });
    
    // Prevent the link from being followed
    return false;
}

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ HEADER SCROLL EFFECT ============
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down
        header.classList.add('scroll-down');
    } else {
        // Scrolling up
        header.classList.remove('scroll-down');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ============ CLOSE MOBILE MENU ON RESIZE ============
window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
        closeMobileMenu();
    }
});

// ============ HERO PARALLAX EFFECT ============
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.3;
    
    if (parallax && window.innerWidth >= 768) {
        parallax.style.backgroundPositionY = speed + 'px';
    }
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations on load
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 200);
});

// ============ CAROUSEL FUNCTIONALITY ============
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let isTransitioning = false;

    // Crear dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => !isTransitioning && goToSlide(index));
        dots.appendChild(dot);
    });

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(n) {
        if (isTransitioning) return;
        isTransitioning = true;

        slides[currentSlide].classList.remove('active');
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        updateDots();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // Event Listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Autoplay
    setInterval(nextSlide, 5000);
});