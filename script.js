/* =============================================
   MANISH RANA PORTFOLIO — JavaScript
   Smooth animations, FAQ accordion, nav effects
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initFAQAccordion();
    initWorkCards();
    initFormInteractions();
    initSmoothScrolling();
    initParallaxHero();
});

/* ===== NAVIGATION ===== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.querySelector('.nav-links');

    // Scroll behavior for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        updateActiveNavLink();
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
            navbar.classList.toggle('menu-open');
            document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('open')) {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('open');
                navbar.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        });
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 150;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    // Check if at bottom of page
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        currentSection = 'contact';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* ===== SMOOTH SCROLLING ===== */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for reveal animation
    const revealElements = document.querySelectorAll(
        '.about-skills-header-col, .skills-container, .works-header, .faq-header, .faq-grid, .contact-inner'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ===== WORK CARDS ANIMATION ===== */
function initWorkCards() {
    const cards = document.querySelectorAll('.work-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Click handler for project cards
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const projectNum = card.getAttribute('data-project');
            // Navigate to project links
            if (projectNum === '1') {
                window.open('https://cheery-pegasus-71d26c.netlify.app/', '_blank');
            } else if (projectNum === '2') {
                window.open('https://test12418.netlify.app/', '_blank');
            }
        });
    });
}

/* ===== FAQ ACCORDION ===== */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ===== FORM INTERACTIONS ===== */
function initFormInteractions() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', function (e) {
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;

            btnText.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Re-enable after submission (the form submits to web3forms)
            setTimeout(() => {
                btnText.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 3000);
        });

        // Focus effects on form inputs
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('focused');
                if (this.value.trim() !== '') {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
            });
        });
    }
}

/* ===== PARALLAX HERO ===== */
function initParallaxHero() {
    const heroBg = document.querySelector('.hero-bg-img');

    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.4;
                heroBg.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
            }
        });

        // Set initial scale
        heroBg.style.transform = 'scale(1.1)';
        heroBg.style.transition = 'transform 0.1s linear';
    }
}

/* ===== CURSOR CUSTOM EFFECT (subtle) ===== */
(function () {
    // Only on desktop
    if (window.innerWidth < 768) return;

    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease, opacity 0.15s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    const cursorOuter = document.createElement('div');
    cursorOuter.style.cssText = `
        position: fixed;
        width: 32px;
        height: 32px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    `;
    document.body.appendChild(cursorOuter);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 4 + 'px';
        cursor.style.top = e.clientY - 4 + 'px';
        cursorOuter.style.left = e.clientX - 16 + 'px';
        cursorOuter.style.top = e.clientY - 16 + 'px';
    });

    // Hover effects for interactive elements
    const interactives = document.querySelectorAll('a, button, .faq-question, .work-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.style.width = '48px';
            cursorOuter.style.height = '48px';
            cursorOuter.style.marginLeft = '-8px';
            cursorOuter.style.marginTop = '-8px';
            cursorOuter.style.borderColor = 'rgba(0, 0, 0, 0.3)';
            cursor.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorOuter.style.width = '32px';
            cursorOuter.style.height = '32px';
            cursorOuter.style.marginLeft = '0';
            cursorOuter.style.marginTop = '0';
            cursorOuter.style.borderColor = 'rgba(0, 0, 0, 0.15)';
            cursor.style.transform = 'scale(1)';
        });
    });
})();

/* ===== TEXT SPLIT ANIMATION (for hero name) ===== */
(function () {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;

    // Add a subtle letter-by-letter animation on load
    const text = heroName.innerHTML;
    const lines = text.split('<br>');
    heroName.innerHTML = '';

    lines.forEach((line, lineIndex) => {
        const lineEl = document.createElement('div');
        lineEl.style.overflow = 'hidden';

        const innerEl = document.createElement('span');
        innerEl.textContent = line;
        innerEl.style.display = 'inline-block';
        innerEl.style.transform = 'translateY(100%)';
        innerEl.style.animation = `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + lineIndex * 0.15}s forwards`;

        lineEl.appendChild(innerEl);
        heroName.appendChild(lineEl);
    });

    // Add the keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            to {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
})();
