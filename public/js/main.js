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
    const animateOnScrollOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it has counters inside, trigger them
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => triggerCounter(counter));
                
                animateObserver.unobserve(entry.target);
            }
        });
    }, animateOnScrollOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateObserver.observe(element);
    });

    // ----------------------------------------------------------------
    // 3. Navbar Sticky Glassmorphism scroll Transition
    // ----------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    function checkScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-[#0B1F3A]/95', 'backdrop-blur-[10px]', 'shadow-lg');
                navbar.classList.remove('bg-primary/95', 'backdrop-blur-md');
            } else {
                navbar.classList.add('bg-primary/95', 'backdrop-blur-md');
                navbar.classList.remove('bg-[#0B1F3A]/95', 'backdrop-blur-[10px]', 'shadow-lg');
            }
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // ----------------------------------------------------------------
    // 4. Stats Counter Animation Logic
    // ----------------------------------------------------------------
    function triggerCounter(counter) {
        if (counter.classList.contains('counted')) return;
        counter.classList.add('counted');

        const targetVal = parseInt(counter.getAttribute('data-target'), 10) || 0;
        let currentVal = 0;
        const duration = 2000; // 2 seconds as requested
        const steps = 60;
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
    }
});
