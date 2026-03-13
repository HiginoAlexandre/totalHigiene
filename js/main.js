// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initMobileMenu();
    initHeaderHideShow();
    initDynamicText();
    initStatsCounter();
    initSmoothScroll();
    initDepoimentosSlider();
    initFormSubmission();
    initBeforeAfterHover();
    initPricingHover();
});

// ===== HEADER SHOW/HIDE ON SCROLL =====
function initHeaderHideShow() {
    const header = document.querySelector('.header');
    
    if (!header) return;

    let lastScrollTop = 0;
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Scroll para baixo e já passou do topo
        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Esconde o header
            header.style.transform = 'translateY(-100%)';
        } 
        // Scroll para cima
        else if (scrollTop < lastScrollTop) {
            // Mostra o header
            header.style.transform = 'translateY(0)';
        }
        
        // Se estiver no topo, garante que o header está visível
        if (scrollTop === 0) {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// ===== AOS ANIMATION =====
function initAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== DYNAMIC TEXT =====
function initDynamicText() {
    const dynamicWord = document.getElementById('dynamic-word');
    if (!dynamicWord) return;
    
    const words = ['Sofás', 'Colchões', 'Carros', 'Cadeiras', 'Estofados', 'Tapetes'];
    let index = 0;
    
    setInterval(() => {
        index = (index + 1) % words.length;
        dynamicWord.style.opacity = '0';
        
        setTimeout(() => {
            dynamicWord.textContent = words[index];
            dynamicWord.style.opacity = '1';
        }, 200);
    }, 2000);
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.hero__stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
        
        animated = true;
    }
    
    const heroStats = document.querySelector('.hero__stats');
    if (!heroStats) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(heroStats);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== DEPOIMENTOS SLIDER =====
function initDepoimentosSlider() {
    const items = document.querySelectorAll('.depoimentos__item');
    const dots = document.querySelectorAll('.depoimentos__dot');
    
    if (!items.length || !dots.length) return;
    
    let currentIndex = 0;
    
    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        items[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }, 5000);
}

// ===== BEFORE AFTER HOVER =====
function initBeforeAfterHover() {
    const items = document.querySelectorAll('.before-after__item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const before = item.querySelector('.before');
            const after = item.querySelector('.after');
            
            if (before && after) {
                before.style.width = '25%';
                after.style.width = '75%';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const before = item.querySelector('.before');
            const after = item.querySelector('.after');
            
            if (before && after) {
                before.style.width = '50%';
                after.style.width = '50%';
            }
        });
    });
}

// ===== PRICING HOVER =====
function initPricingHover() {
    const cards = document.querySelectorAll('.pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ===== FORM SUBMISSION =====
function initFormSubmission() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulação de envio
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== ACTIVE MENU ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header__menu-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id') || '';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});