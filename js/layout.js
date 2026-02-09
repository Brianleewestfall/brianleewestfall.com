/* ================================================================
   AI Vision Designs — Layout Engine
   Loads shared header + footer, initializes interactions
   ================================================================ */

(function() {
    'use strict';

    // --- Auto-detect base path from script location ---
    var scripts = document.getElementsByTagName('script');
    var basePath = '';
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src || '';
        if (src.indexOf('layout.js') !== -1) {
            basePath = src.substring(0, src.lastIndexOf('js/layout.js'));
            break;
        }
    }

    // --- Inject favicon ---
    var fav = document.createElement("link");
    fav.rel = "icon";
    fav.type = "image/x-icon";
    fav.href = basePath + "images/favicon.ico";
    document.head.appendChild(fav);

    // --- Inject additions CSS ---
    var addCSS = document.createElement("link");
    addCSS.rel = "stylesheet";
    addCSS.href = basePath + "css/additions.css";
    document.head.appendChild(addCSS);

    // --- Load shared components ---
    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');

    function loadComponent(el, path) {
        if (!el) return Promise.resolve();
        return fetch(basePath + path)
            .then(function(resp) {
                if (resp.ok) return resp.text();
                console.warn('Component load failed:', basePath + path, resp.status);
                return '';
            })
            .then(function(html) {
                if (html) el.innerHTML = html;
            })
            .catch(function(e) {
                console.warn('Component fetch error:', basePath + path, e);
            });
    }

    Promise.all([
        loadComponent(headerEl, 'components/header.html'),
        loadComponent(footerEl, 'components/footer.html')
    ]).then(initInteractions);

    function initInteractions() {
        // --- Nav scroll effect ---
        var nav = document.querySelector('.nav');
        if (nav) {
            window.addEventListener('scroll', function() {
                nav.classList.toggle('scrolled', window.scrollY > 50);
            }, { passive: true });
            nav.classList.toggle('scrolled', window.scrollY > 50);
        }

        // --- Active nav link ---
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a[data-page]').forEach(function(link) {
            var page = link.getAttribute('data-page');
            if (
                (page === 'home' && (currentPage === '' || currentPage === 'index.html')) ||
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
        var hamburger = document.querySelector('.hamburger');
        var mobileMenu = document.querySelector('.mobile-menu');
        var mobileOverlay = document.querySelector('.mobile-overlay');

        if (hamburger && mobileMenu && mobileOverlay) {
            hamburger.addEventListener('click', function() {
                var isOpen = mobileMenu.classList.toggle('open');
                mobileOverlay.classList.toggle('open');
                hamburger.classList.toggle('active');
                hamburger.setAttribute('aria-expanded', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });

            mobileOverlay.addEventListener('click', closeMobile);
            mobileMenu.querySelectorAll('a').forEach(function(l) { l.addEventListener('click', closeMobile); });

            function closeMobile() {
                mobileMenu.classList.remove('open');
                mobileOverlay.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }

        // --- Smooth scroll for hash links ---
        document.querySelectorAll('a[href^="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                var t = document.querySelector(href);
                if (t) {
                    e.preventDefault();
                    var navH = nav ? nav.offsetHeight : 80;
                    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
                }
            });
        });

        // --- Scroll reveal ---
        var ro = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    ro.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) { ro.observe(el); });

        // --- Lazy load Vimeo iframes ---
        var vo = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) {
                    var src = e.target.getAttribute('data-src');
                    if (src) {
                        e.target.src = src;
                        e.target.removeAttribute('data-src');
                    }
                    vo.unobserve(e.target);
                }
            });
        }, { rootMargin: '200px' });
        document.querySelectorAll('iframe[data-src]').forEach(function(el) { vo.observe(el); });
    }
})();
