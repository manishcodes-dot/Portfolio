/* =============================================
   MANISH RANA PORTFOLIO — JavaScript
   Smooth animations, FAQ accordion, nav effects
   ============================================= */

// Force manual scroll restoration so website always opens at top landing page
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    initLenis();
    initNavigation();
    initScrollAnimations();
    initFAQAccordion();
    initWorkCards();
    initFormInteractions();
    initSmoothScrolling();
    initHeroScrollTransition();
});

/* ===== RIGHT-SIDE HOVER NAVIGATION SIDEBAR ===== */
function initNavigation() {
    const sidebar = document.getElementById('right-sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const hoverBg = document.querySelector('.sidebar-hover-bg');

    if (!sidebar) return;

    // Hover background follower dynamic animation
    sidebarLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            if (hoverBg) {
                const linkRect = this.getBoundingClientRect();
                const navContainer = this.closest('.sidebar-nav');
                if (navContainer) {
                    const navRect = navContainer.getBoundingClientRect();
                    const topPos = linkRect.top - navRect.top;
                    hoverBg.style.transform = `translateY(${topPos}px)`;
                    hoverBg.style.opacity = '1';
                }
            }
        });
    });

    const navContainer = document.querySelector('.sidebar-nav');
    if (navContainer) {
        navContainer.addEventListener('mouseleave', () => {
            if (hoverBg) {
                hoverBg.style.opacity = '0';
            }
        });
    }

    // Scroll listener for section observer
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

// Update active sidebar nav link & active bar indicator based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const activeBar = document.querySelector('.sidebar-active-bar');
    const tickMarks = document.querySelectorAll('.tick-mark');
    const scrollPos = window.scrollY + 200;

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

    let activeIndex = 0;
    sidebarLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
            activeIndex = index;
        }
    });

    // Position active bar indicator
    const activeLink = document.querySelector('.sidebar-link.active');
    if (activeLink && activeBar) {
        const linkRect = activeLink.getBoundingClientRect();
        const navContainer = activeLink.closest('.sidebar-nav');
        if (navContainer) {
            const navRect = navContainer.getBoundingClientRect();
            const topPos = linkRect.top - navRect.top + (linkRect.height / 2) - 11;
            activeBar.style.transform = `translateY(${topPos}px)`;
        }
    }

    // Update tick mark active state on collapsed strip
    if (tickMarks.length > 0) {
        tickMarks.forEach(t => t.classList.remove('active-tick'));
        const tickIndex = Math.min(tickMarks.length - 1, Math.floor((activeIndex / Math.max(1, sidebarLinks.length - 1)) * (tickMarks.length - 1)));
        if (tickMarks[tickIndex]) {
            tickMarks[tickIndex].classList.add('active-tick');
        }
    }
}

/* ===== SMOOTH SCROLLING ===== */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href === '#home') {
                if (window.lenis) {
                    window.lenis.scrollTo(0);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                const target = document.querySelector(href);
                if (target) {
                    if (window.lenis) {
                        window.lenis.scrollTo(target, { offset: -80 });
                    } else {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
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
            } else if (projectNum === '3' || projectNum === '4') {
                window.open('blank.html', '_blank');
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

/* ===== LENIS SMOOTH SCROLL ===== */
let lenis;
function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2
    });
    window.lenis = lenis;

    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }
}

/* ===== HERO SCROLL-DRIVEN DISSOLVE TRANSITION ===== */
/* ===== HERO SCROLL-DRIVEN DISSOLVE TRANSITION ===== */
function initHeroScrollTransition() {
    const heroSection = document.querySelector('#home.hero');
    const dissolveGrid = document.querySelector('.dissolve-grid');
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    const heroIndicator = document.querySelector('.hero-scroll-indicator');

    if (!heroSection || !dissolveGrid || !heroBg || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    if (typeof gsap.registerPlugin !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        } else if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }

    const BLOCK_SIZE = 24; // Configurable solid grid block size in pixels (smaller, sleeker blocks)
    let cells = [];
    let rows = 0;
    let cols = 0;

    function createGrid() {
        dissolveGrid.innerHTML = '';
        cells = [];

        const width = heroSection.clientWidth;
        const height = heroSection.clientHeight;

        cols = Math.ceil(width / BLOCK_SIZE);
        rows = Math.ceil(height / BLOCK_SIZE);

        dissolveGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        dissolveGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'dissolve-cell';

                // Bottom-to-Top Normalized Y: 0 at bottom of screen, 1 at top of screen
                const normY = 1 - (r / Math.max(1, rows - 1));
                const normX = c / Math.max(1, cols - 1);

                // Wavefront position starting from bottom to top
                const wavePos = 0.85 * normY + 0.15 * normX;

                // Deterministic pseudo-random noise hash per cell
                const rawHash = Math.abs(Math.sin((r + 1) * 12.9898 + (c + 1) * 78.233) * 43758.5453) % 1;
                
                // Scatter threshold offset (-0.1 to +0.1)
                const thresholdOffset = (rawHash - 0.5) * 0.2;

                cells.push({
                    el: cell,
                    threshold: wavePos + thresholdOffset
                });

                dissolveGrid.appendChild(cell);
            }
        }
    }

    createGrid();

    // Ensure 100% full visibility of landing page on initial load
    gsap.set(heroBg, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    gsap.set(dissolveGrid, { autoAlpha: 0 });

    // GSAP ScrollTrigger timeline pinned strictly to the Hero section
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: '+=50%',
            pin: true,
            scrub: 0.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress = self.progress; // 0.0 to 1.0

                // Toggle grid overlay visibility strictly during active scroll phase
                if (progress > 0.01 && progress < 0.99) {
                    gsap.set(dissolveGrid, { autoAlpha: 1 });
                } else {
                    gsap.set(dissolveGrid, { autoAlpha: 0 });
                }

                // Distance-based math formula with quadratic density falloff for solid cells
                const waveCenter = progress * 1.3 - 0.15; // Wave sweeps from -0.15 to 1.15
                const bandWidth = 0.15; // Width of active dissolve band

                for (let i = 0; i < cells.length; i++) {
                    const cell = cells[i];
                    const dist = cell.threshold - waveCenter;

                    if (Math.abs(dist) <= bandWidth) {
                        // Inside active wave front: solid block with quadratic density falloff
                        const normDist = dist / bandWidth;
                        const factor = 1 - (normDist * normDist); // 1.0 at center, 0.0 at edges
                        cell.el.style.opacity = factor.toFixed(3);
                        cell.el.style.transform = `scale(${0.85 + 0.15 * factor})`;
                    } else {
                        // Outside active band: completely transparent
                        cell.el.style.opacity = '0';
                        cell.el.style.transform = 'scale(1)';
                    }
                }
            }
        }
    });

    // Animate Hero background clipping from Bottom to Top (100% height down to 0% height)
    tl.to(heroBg, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        ease: 'none'
    }, 0);

    // Fade out Hero text content gracefully during scroll
    if (heroContent) {
        tl.to(heroContent, {
            opacity: 0,
            ease: 'none'
        }, 0);
    }

    // Fade out Hero scroll indicator gracefully during scroll
    if (heroIndicator) {
        tl.to(heroIndicator, {
            opacity: 0,
            ease: 'none'
        }, 0);
    }

    // Window resize handler with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createGrid();
            ScrollTrigger.refresh();
        }, 200);
    });
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

