/**
 * SteelCrest Roofing - High Performance Interactivity & Micro-Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 1. Sliding Mobile Menu Drawer Control
    // ----------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');

    function openMobileMenu() {
        if (mobileMenu && mobileMenuBackdrop) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenuBackdrop.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    }

    function closeMobileMenu() {
        if (mobileMenu && mobileMenuBackdrop) {
            mobileMenu.classList.add('translate-x-full');
            mobileMenuBackdrop.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }

    // ----------------------------------------------------------------
    // 2. High-Performance Intersection Observer Scroll Reveal
    // ----------------------------------------------------------------
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });

    // ----------------------------------------------------------------
    // 3. Navbar Sticky Glassmorphism scroll Transition
    // ----------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    function checkScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-primary/95', 'shadow-md', 'backdrop-blur-md');
                navbar.classList.remove('bg-primary');
            } else {
                navbar.classList.add('bg-primary');
                navbar.classList.remove('bg-primary/95', 'shadow-md', 'backdrop-blur-md');
            }
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Trigger initial load check

    // ----------------------------------------------------------------
    // 4. Stats Counter Animation on Viewport Entry
    // ----------------------------------------------------------------
    const counterElements = document.querySelectorAll('.counter');
    const counterObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetVal = parseInt(counter.getAttribute('data-target'), 10) || 0;
                let currentVal = 0;
                const duration = 1200; // Animation duration in ms
                const steps = 40;
                const increment = targetVal / steps;
                const stepTime = duration / steps;

                const updateCount = () => {
                    if (currentVal < targetVal) {
                        currentVal += increment;
                        let suffix = '';
                        if (counter.innerText.includes('%')) suffix = '%';
                        else if (counter.innerText.includes('+')) suffix = '+';
                        
                        counter.innerText = Math.ceil(currentVal) + suffix;
                        setTimeout(updateCount, stepTime);
                    } else {
                        let suffix = '';
                        if (counter.innerText.includes('%')) suffix = '%';
                        else if (counter.innerText.includes('+')) suffix = '+';
                        counter.innerText = targetVal + suffix;
                    }
                };

                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
});
