/* ================================================================
   AI Vision Designs — Layout Engine
   Loads shared header + footer, initializes interactions
   ================================================================ */

(function() {
    'use strict';

    // --- Load shared components ---
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');

    async function loadComponent(el, path) {
        if (!el) return;
        try {
            const resp = await fetch(path);
            if (resp.ok) {
                el.innerHTML = await resp.text();
            } else {
                console.warn('Component load failed:', path, resp.status);
            }
        } catch(e) {
            console.warn('Component fetch error:', path, e);
        }
    }

    Promise.all([
        loadComponent(headerEl, '/components/header.html'),
        loadComponent(footerEl, '/components/footer.html')
    ]).then(initInteractions);

    function initInteractions() {
        // --- Nav scroll effect ---
        const nav = document.querySelector('.nav');
        if (nav) {
            window.addEventListener('scroll', () => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
            }, { passive: true });
            // Trigger on load in case page is already scrolled
            nav.classList.toggle('scrolled', window.scrollY > 50);
        }

        // --- Active nav link ---
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
            const page = link.getAttribute('data-page');
            if (
                (page === 'home' && (currentPage === '' || currentPage === '/' || currentPage === 'index.html')) ||
                (page === 'about' && currentPage === 'about.html') ||
                (page === 'safety' && currentPage === 'pool-safety.html') ||
                (page === 'services' && (
                    currentPage === 'architectural-visualization.html' ||
                    currentPage === 'forensic-visualization.html' ||
                    currentPage === 'pool-landscape-design.html' ||
                    currentPage === 'commercial-visualization.html'
                ))
            ) {
                link.classList.add('active');
            }
        });

        // --- Hamburger / Mobile Menu ---
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileOverlay = document.querySelector('.mobile-overlay');

        if (hamburger && mobileMenu && mobileOverlay) {
            hamburger.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.toggle('open');
                mobileOverlay.classList.toggle('open');
                hamburger.classList.toggle('active');
                hamburger.setAttribute('aria-expanded', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });

            mobileOverlay.addEventListener('click', closeMobile);
            mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMobile));

            function closeMobile() {
                mobileMenu.classList.remove('open');
                mobileOverlay.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }

        // --- Smooth scroll for hash links ---
        document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(a => {
            a.addEventListener('click', function(e) {
                let href = this.getAttribute('href');
                // Handle /#section links on the homepage
                if (href.startsWith('/#')) {
                    if (currentPage === '' || currentPage === '/' || currentPage === 'index.html') {
                        href = href.substring(1); // strip leading /
                    } else {
                        return; // Let browser navigate to homepage
                    }
                }
                const t = document.querySelector(href);
                if (t) {
                    e.preventDefault();
                    const navH = nav ? nav.offsetHeight : 80;
                    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
                }
            });
        });

        // --- Scroll reveal ---
        const ro = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    ro.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => ro.observe(el));

        // --- Lazy load Vimeo iframes ---
        const vo = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const src = e.target.getAttribute('data-src');
                    if (src) {
                        e.target.src = src;
                        e.target.removeAttribute('data-src');
                    }
                    vo.unobserve(e.target);
                }
            });
        }, { rootMargin: '200px' });
        document.querySelectorAll('iframe[data-src]').forEach(el => vo.observe(el));
    }
})();
