/**
 * =====================================
 * MINEA CHHAY - PROFESSIONAL RESUME
 * Interactive JavaScript
 * =====================================
 */

'use strict';

// =====================================
// CONFIGURATION
// =====================================
const CONFIG = {
    // Scroll animation configuration
    scroll: {
        revealThreshold: 0.15,  // 15% of element visible
        revealOnce: true       // Only reveal once
    },

    // Counter animation configuration
    counter: {
        duration: 2000,        // ms to complete
        easing: easeOutQuart   // Easing function
    }
};

// =====================================
// UTILITY FUNCTIONS
// =====================================

/**
 * Easing function - ease out quart
 */
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

/**
 * Linear interpolation
 */
function lerp(start, end, t) {
    return start + (end - start) * t;
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight * (1 - threshold) && rect.bottom >= 0;
}

/**
 * Debounce function
 */
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

// =====================================
// NAVIGATION
// =====================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect
    const handleNavScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', debounce(handleNavScroll, 10));

    // Active nav section tracking
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                setActiveNavLink(id);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/**
 * Set active navigation link
 */
function setActiveNavLink(id) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        }
    });
}

// =====================================
// SCROLL REVEAL ANIMATIONS
// =====================================
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: CONFIG.scroll.revealThreshold
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    if (CONFIG.scroll.revealOnce) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        reveals.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        reveals.forEach(element => {
            element.classList.add('visible');
        });
    }
}

// =====================================
// ANIMATED COUNTERS
// =====================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

/**
 * Animate counter from 0 to target
 */
function animateCounter(element, target) {
    const duration = CONFIG.counter.duration;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = CONFIG.counter.easing(progress);
        const current = Math.floor(lerp(0, target, easedProgress));

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// =====================================
// SKILL BARS ANIMATION
// =====================================
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = fill.getAttribute('data-width');
                    fill.style.width = `${width}%`;
                    observer.unobserve(fill);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        skillFills.forEach(fill => {
            fill.style.width = '0';
            observer.observe(fill);
        });
    } else {
        // Fallback
        skillFills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = `${width}%`;
        });
    }
}

// =====================================
// SCROLL TO TOP BUTTON
// =====================================
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (!scrollTopBtn) return;

    const toggleVisibility = () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', debounce(toggleVisibility, 10));

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =====================================
// TIMELINE ANIMATION
// =====================================
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        timelineItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 100}ms`;
            observer.observe(item);
        });
    }
}

// =====================================
// KEYBOARD NAVIGATION
// =====================================
function initKeyboardNav() {
    // Handle tab navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// =====================================
// PERFORMANCE MONITORING
// =====================================
function initPerformanceMonitor() {
    // Reduce animations for users who prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        CONFIG.scroll.revealThreshold = 0;
        CONFIG.counter.duration = 0;
    }

    // Listen for changes
    prefersReducedMotion.addEventListener('change', (e) => {
        if (e.matches) {
            CONFIG.scroll.revealThreshold = 0;
            CONFIG.counter.duration = 0;
        } else {
            CONFIG.scroll.revealThreshold = 0.15;
            CONFIG.counter.duration = 2000;
        }
    });
}

// =====================================
// CONTEXTUAL TIPS (Accessibility)
// =====================================
function initAccessibility() {
    // Ensure all interactive elements are properly labeled
    const interactiveElements = document.querySelectorAll('button, a[href], input, select, textarea');

    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
            const text = element.textContent.trim();
            if (text && element.tagName !== 'BUTTON') {
                element.setAttribute('aria-label', text);
            }
        }
    });

    // Handle focus visible
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals/menus
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');

            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// =====================================
// INITIALIZE ALL
// =====================================
function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMReady);
    } else {
        onDOMReady();
    }
}

function onDOMReady() {
    initNavigation();
    initRevealAnimations();
    initCounters();
    initSkillBars();
    initScrollTop();
    initTimelineAnimation();
    initKeyboardNav();
    initPerformanceMonitor();
    initAccessibility();

    // Log initialization complete (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Resume website initialized successfully');
    }
}

// Start initialization
init();

// =====================================
// EXPORT FOR DEBUGGING (if needed)
// =====================================
window.ResumeWebsite = {
    CONFIG,
    version: '1.0.0'
};
