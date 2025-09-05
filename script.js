/* ==========================================
VARIABLES Y ELEMENTOS DEL DOM
========================================== */

// Obtener elementos del DOM
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const closeMenu = document.getElementById('closeMenu');
const langCurrent = document.getElementById('langCurrent');
const langDropdown = document.getElementById('langDropdown');

// Obtener todos los botones del acordeón
const accordionButtons = document.querySelectorAll('.nav-mobile-button');

// Obtener todas las opciones de idioma
const langOptions = document.querySelectorAll('.lang-option');

/* ==========================================
FUNCIONALIDAD DEL MENÚ MÓVIL
========================================== */

// Abrir menú móvil
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active'); // Animar botón hamburguesa
    navMobile.classList.toggle('active'); // Mostrar/ocultar menú
});

// Cerrar menú móvil con el botón X
closeMenu.addEventListener('click', () => {
    menuToggle.classList.remove('active'); // Restaurar botón hamburguesa
    navMobile.classList.remove('active'); // Ocultar menú
    closeAllAccordions(); // Cerrar todos los acordeones
});

// Cerrar menú móvil al hacer clic en un enlace directo
document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        closeAllAccordions();
    });
});

// Cerrar menú móvil al hacer clic en enlaces del acordeón
document.querySelectorAll('.accordion-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        closeAllAccordions();
    });
});

/* ==========================================
FUNCIONALIDAD DEL ACORDEÓN
========================================== */

// Función para cerrar todos los acordeones
function closeAllAccordions() {
    accordionButtons.forEach(button => {
        button.classList.remove('active');
        const content = button.nextElementSibling;
        content.classList.remove('active');
    });
}

// Añadir evento click a cada botón del acordeón
accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isActive = button.classList.contains('active');
        const content = button.nextElementSibling;
        
        // Si el acordeón está abierto, cerrarlo
        if (isActive) {
            button.classList.remove('active');
            content.classList.remove('active');
        } else {
            // Cerrar todos los otros acordeones primero
            closeAllAccordions();
            
            // Abrir el acordeón actual
            button.classList.add('active');
            content.classList.add('active');
        }
    });
});

/* ==========================================
FUNCIONALIDAD DEL SWITCH DE IDIOMAS
========================================== */

// Toggle del dropdown de idiomas
langCurrent.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que se cierre inmediatamente
    langCurrent.classList.toggle('active');
    langDropdown.classList.toggle('active');
});

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-switch')) {
        langCurrent.classList.remove('active');
        langDropdown.classList.remove('active');
    }
});

// Cambiar idioma
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedLang = option.dataset.lang;
        const selectedFlag = option.querySelector('.flag-icon').src;
        const selectedText = option.querySelector('.lang-text').textContent;
        
        // Actualizar el botón actual
        langCurrent.querySelector('.flag-icon').src = selectedFlag;
        langCurrent.querySelector('.lang-text').textContent = selectedText;
        
        // Cerrar dropdown
        langCurrent.classList.remove('active');
        langDropdown.classList.remove('active');
        
        // Aquí puedes agregar la lógica para cambiar el idioma de la página
        console.log('Idioma cambiado a:', selectedLang);
        
        // Ejemplo: cambiar atributo lang del HTML
        document.documentElement.lang = selectedLang;
    });
});

/* ==========================================
EFECTOS DEL HEADER AL HACER SCROLL
========================================== */

// Cambiar apariencia del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        // Header más opaco cuando se hace scroll
        header.style.background = 'rgba(51, 25, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        // Header semi-transparente en la parte superior
        header.style.background = 'rgba(51, 25, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
});

/* ==========================================
SMOOTH SCROLLING PARA ENLACES DE ANCLA
========================================== */

// Añadir smooth scrolling a todos los enlaces que empiecen con #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calcular posición considerando el header fijo
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


/* ==========================================
VARIABLES Y ELEMENTOS DEL DOM
========================================== */

// Obtener elementos principales
const hero = document.getElementById('hero');
const scrollIndicator = document.querySelector('.scroll-indicator');
const whatsappFloat = document.querySelector('.whatsapp-float');
const ctaButton = document.querySelector('.hero-cta-btn');

/* ==========================================
EFECTOS DE SCROLL
========================================== */

// Función para manejar efectos de scroll
function handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Efecto parallax en la imagen de fondo (solo en desktop)
    if (window.innerWidth > 1024) {
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Ocultar indicador de scroll después de scrollear un poco
    if (scrolled > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
    }
}

// Optimizar el scroll con requestAnimationFrame
let ticking = false;
function optimizedScroll() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => { ticking = false; }, 10);
    }
}

// Añadir event listener para scroll
window.addEventListener('scroll', optimizedScroll);

/* ==========================================
FUNCIONALIDAD DEL INDICADOR DE SCROLL
========================================== */

// Scroll suave al hacer clic en el indicador
scrollIndicator.addEventListener('click', () => {
    const heroHeight = hero.offsetHeight;
    window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
    });
});

/* ==========================================
ANIMACIONES DE ENTRADA
========================================== */

// Función para activar animaciones cuando los elementos son visibles
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const elementsToObserve = document.querySelectorAll('[data-aos]');
    elementsToObserve.forEach(el => observer.observe(el));
}

/* ==========================================
EFECTOS DEL BOTÓN CTA
========================================== */

// Efecto ripple en el botón CTA
ctaButton.addEventListener('click', function(e) {
    // Crear elemento ripple
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    // Estilos del ripple
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    // Añadir y remover el ripple
    this.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// CSS para la animación ripple (añadido dinámicamente)
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Añadir CSS al head
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

/* ==========================================
EFECTOS DEL BOTÓN WHATSAPP
========================================== */

// Tracking para analytics (opcional)
whatsappFloat.addEventListener('click', () => {
    // Aquí puedes añadir tracking de Google Analytics o similar
    console.log('WhatsApp button clicked');
    
    // Opcional: enviar evento a Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'Contact',
            'event_label': 'WhatsApp Float Button'
        });
    }
});

/* ==========================================
RESPONSIVE BEHAVIOR
========================================== */

// Función para ajustar comportamiento según el tamaño de pantalla
function handleResize() {
    const windowWidth = window.innerWidth;
    
    // Desactivar parallax en móviles para mejor performance
    if (windowWidth <= 1024) {
        hero.style.transform = 'none';
        hero.style.backgroundAttachment = 'scroll';
    } else {
        hero.style.backgroundAttachment = 'fixed';
    }
}

// Event listener para resize
window.addEventListener('resize', handleResize);

/* ==========================================
INICIALIZACIÓN
========================================== */

// Función de inicialización que se ejecuta cuando la página carga
function initHero() {
    // Ajustar comportamiento responsive
    handleResize();
    
    // Inicializar observador de elementos
    observeElements();
    
    // Añadir clases para animaciones iniciales
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('Hero section initialized successfully');
}

// Ejecutar inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
} else {
    initHero();
}

/* ==========================================
SMOOTH SCROLLING PARA ENLACES
========================================== */

// Smooth scrolling para el botón CTA
ctaButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const headerHeight = 90; // Altura del header
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});

/* ==========================================
PRELOAD DE IMÁGENES
========================================== */

// Precargar imagen de fondo para mejor performance
function preloadHeroImage() {
    const heroImage = new Image();
    heroImage.onload = function() {
        console.log('Hero image preloaded successfully');
        hero.classList.add('image-loaded');
    };
    heroImage.onerror = function() {
        console.warn('Failed to preload hero image');
    };
    heroImage.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
}

// Ejecutar preload
preloadHeroImage();

/* ==========================================
UTILIDADES Y HELPERS
========================================== */

// Función para debounce (optimizar eventos que se ejecutan frecuentemente)
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

// Aplicar debounce al resize
const debouncedResize = debounce(handleResize, 250);
window.removeEventListener('resize', handleResize);
window.addEventListener('resize', debouncedResize);

/* ==========================================
ACCESIBILIDAD
========================================== */

// Mejorar accesibilidad con teclado
document.addEventListener('keydown', function(e) {
    // Permitir navegación con Enter y Espacio en elementos interactivos
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target === scrollIndicator) {
            e.preventDefault();
            scrollIndicator.click();
        }
    }
    
    // Escape para cerrar elementos si fuera necesario
    if (e.key === 'Escape') {
        // Aquí se puede añadir lógica para cerrar modales, etc.
    }
});

// Añadir atributos de accesibilidad
scrollIndicator.setAttribute('tabindex', '0');
scrollIndicator.setAttribute('role', 'button');
scrollIndicator.setAttribute('aria-label', 'Scroll to next section');

whatsappFloat.setAttribute('aria-label', 'Contact us on WhatsApp');

console.log('Hero section fully loaded and ready');