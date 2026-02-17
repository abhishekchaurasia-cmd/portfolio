/* ============================================
   PORTFOLIO — Animation & Interaction Engine
   Powered by GSAP + ScrollTrigger
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ---- Preloader ----
    // ---- Preloader ----
    initPreloader();

    // ---- Three.js Hero ----
    initThreeHero();

    // ---- Navigation Toggle ----
    initNavigation();

    // ---- Scroll Reveal Animations ----
    initScrollReveals();

    // ---- Counter Animation ----
    initCounters();

    // ---- Skills Carousel Drag ----
    initSkillsCarousel();

    // ---- Skill Bars Animation ----
    initSkillBars();

    // ---- Smooth Scroll ----
    initSmoothScroll();

    // ---- Parallax Effects ----
    initParallax();

    // ---- Magnetic Buttons ----
    initMagneticButtons();

    // ---- Custom Cursor Trail ----
    initCursorTrail();
});


/* =============================================
   NAVIGATION
   ============================================= */
function initNavigation() {
    const toggle = document.getElementById('menuToggle');
    const sideNav = document.getElementById('sideNav');
    const navLinks = sideNav.querySelectorAll('[data-nav]');
    let savedScrollY = 0;

    toggle.addEventListener('click', () => {
        const isOpening = !sideNav.classList.contains('open');

        if (isOpening) {
            savedScrollY = window.scrollY;
            document.body.style.top = `-${savedScrollY}px`;
            document.body.classList.add('nav-open');
        } else {
            document.body.classList.remove('nav-open');
            document.body.style.top = '';
            window.scrollTo(0, savedScrollY);
        }

        toggle.classList.toggle('active');
        sideNav.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
            document.body.style.top = '';
            toggle.classList.remove('active');
            sideNav.classList.remove('open');
            // Let the smooth scroll handle repositioning
        });
    });
}


/* =============================================
   HERO ANIMATIONS
   ============================================= */
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Name reveal - slide up from below
    tl.to('.hero__name .line-inner', {
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.3
    });

    // Title fade in
    tl.to('.hero__title', {
        opacity: 1,
        duration: 0.8,
        y: 0
    }, '-=0.4');

    // Stats stagger in
    tl.to('.hero__stat', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12
    }, '-=0.3');

    // Scroll indicator
    tl.fromTo('.hero__scroll',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
    );

    // Hero background subtle zoom
    gsap.fromTo('.hero__bg',
        { scale: 1.1 },
        { scale: 1, duration: 2, ease: 'power2.out', delay: 0.2 }
    );
}


/* =============================================
   SCROLL REVEAL ANIMATIONS
   ============================================= */
function initScrollReveals() {
    // Reveal Up Elements
    gsap.utils.toArray('.reveal-up').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none none'
                },
                delay: i % 4 * 0.1 // stagger within rows
            }
        );
    });

    // Reveal Left Elements
    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -60 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal Right Elements
    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: 60 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Accent Lines
    gsap.utils.toArray('.accent-line').forEach(line => {
        gsap.fromTo(line,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.2,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: line,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Section split titles — text stroke animation
    gsap.utils.toArray('.section__split-title').forEach(title => {
        const topWord = title.querySelector('.top-word');
        const bottomWord = title.querySelector('.bottom-word');

        if (topWord && bottomWord) {
            gsap.fromTo(topWord,
                { x: -40, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            gsap.fromTo(bottomWord,
                { x: 40, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 0.8,
                    delay: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    });

    // Experience cards: top accent line sweep
    gsap.utils.toArray('.experience-card').forEach(card => {
        gsap.fromTo(card,
            { '--sweep-scale': 0 },
            {
                '--sweep-scale': 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Footer tagline
    gsap.fromTo('.footer__tagline',
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
}


/* =============================================
   COUNTER ANIMATION
   ============================================= */
function initCounters() {
    const counters = document.querySelectorAll('.hero__stat-number[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '+';

        gsap.to(counter, {
            innerText: target,
            duration: 2,
            delay: 1.2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function () {
                counter.textContent = Math.round(parseFloat(counter.textContent)) + suffix;
            },
            onComplete: function () {
                counter.textContent = target + suffix;
            }
        });
    });
}


/* =============================================
   SKILLS CAROUSEL (Drag + Auto-Scroll)
   ============================================= */
function initSkillsCarousel() {
    const carousel = document.getElementById('skillsCarousel');
    if (!carousel) return;

    // 1. Clone cards for infinite loop
    const originalCards = Array.from(carousel.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });

    let isDown = false;
    let startX;
    let scrollLeft;
    let scrollSpeed = 0.8;

    // Centralized LOOP logic: listen to any scroll change
    carousel.addEventListener('scroll', () => {
        const halfWidth = carousel.scrollWidth / 2;
        if (carousel.scrollLeft >= halfWidth) {
            carousel.scrollLeft = 0;
        } else if (carousel.scrollLeft <= 0) {
            // Need a tiny offset to avoid snapping back to 0 immediately if speed is positive
            if (!isDown && scrollSpeed < 0) {
                carousel.scrollLeft = halfWidth;
            }
        }
    });

    // Auto-scroll logic
    function autoScroll() {
        if (!isDown) {
            carousel.scrollLeft += scrollSpeed;
        }
        requestAnimationFrame(autoScroll);
    }
    autoScroll();

    // Mouse Drag events
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch support (mobile) - simplified
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        isDown = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    }, { passive: true });
}


/* =============================================
   SKILL BARS ANIMATION ON SCROLL
   ============================================= */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-card__bar-fill');

    bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') + '%';

        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(bar, {
                    width: targetWidth,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
}


/* =============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


/* =============================================
   PARALLAX EFFECTS
   ============================================= */
function initParallax() {
    // Hero section parallax on scroll
    gsap.to('.hero__content', {
        yPercent: 30,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Project card images subtle parallax
    gsap.utils.toArray('.project-card__image img').forEach(img => {
        gsap.fromTo(img,
            { yPercent: -5 },
            {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                    trigger: img.closest('.project-card'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            }
        );
    });

    // About section image parallax
    const aboutImg = document.querySelector('.about__image-wrapper img');
    if (aboutImg) {
        gsap.fromTo(aboutImg,
            { yPercent: -8 },
            {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.about__content',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            }
        );
    }
}


/* =============================================
   MAGNETIC BUTTONS (Hover attraction effect)
   ============================================= */
function initMagneticButtons() {
    const magneticEls = document.querySelectorAll('.cta-section__btn, .topbar__cta');

    magneticEls.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}


/* =============================================
   CUSTOM CURSOR TRAIL
   ============================================= */
function initCursorTrail() {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.createElement('div');
    cursor.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid rgba(200, 255, 0, 0.5);
    pointer-events: none;
    z-index: 10000;
    transition: width 0.2s, height 0.2s, border-color 0.2s;
    transform: translate(-50%, -50%);
  `;
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #c8ff00;
    pointer-events: none;
    z-index: 10001;
    transform: translate(-50%, -50%);
  `;
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Trailing circle with smooth follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Enlarge cursor on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .project-card, .skill-card, .social-card, .experience-card');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.borderColor = 'rgba(200, 255, 0, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'rgba(200, 255, 0, 0.5)';
        });
    });
}


/* =============================================
   TOPBAR SCROLL BEHAVIOR
   ============================================= */
(function () {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            topbar.style.padding = '12px 40px';
            topbar.style.background = 'rgba(10, 10, 10, 0.7)';
            topbar.style.backdropFilter = 'blur(15px)';
            topbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        } else {
            topbar.style.padding = '24px 40px';
            topbar.style.background = 'transparent';
            topbar.style.backdropFilter = 'none';
            topbar.style.borderBottom = '1px solid transparent';
        }
    });
})();


/* =============================================
   PRELOADER ANIMATION
   ============================================= */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCounter');
    const bar = document.getElementById('preloaderBar');

    if (!preloader || !counter || !bar) return;

    // Freeze scroll during load
    document.body.style.overflow = 'hidden';

    let count = 0;
    const duration = 2000; // 2 seconds normal load
    const step = 20;

    const timer = setInterval(() => {
        if (count < 100) {
            // Randomize speed for "realistic" load feel
            const increment = Math.floor(Math.random() * 5) + 1;
            count = Math.min(count + increment, 100);

            counter.textContent = count;
            bar.style.width = count + '%';
        } else {
            clearInterval(timer);
            // Completion sequence
            setTimeout(() => {
                preloader.classList.add('done');
                document.body.style.overflow = '';

                // Trigger hero animations after loader is gone
                initHeroAnimations();
            }, 600);
        }
    }, step);
}
/* =============================================
   THREE.JS HERO EFFECT
   ============================================= */
function initThreeHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Helper: Create texture from character
    function createCharTexture(char, font = 'bold 64px "Courier New", monospace') {
        const ctxCanvas = document.createElement('canvas');
        ctxCanvas.width = 128;
        ctxCanvas.height = 128;
        const ctx = ctxCanvas.getContext('2d');

        ctx.fillStyle = '#c8ff00'; // Accent color
        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(char, 64, 64);

        const texture = new THREE.CanvasTexture(ctxCanvas);
        return texture;
    }

    // Particle Groups
    const symbols = ['0', '1', '< >', '{ }', '/>', 'var'];
    const particleSystems = [];

    symbols.forEach(symbol => {
        const geometry = new THREE.BufferGeometry();
        const count = 150; // particles per symbol
        const posArray = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 25; // Wider spread
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.4, // Larger for text
            map: createCharTexture(symbol),
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, material);
        // Random start rotation
        points.rotation.x = Math.random() * Math.PI;
        points.rotation.y = Math.random() * Math.PI;

        scene.add(points);
        particleSystems.push({ mesh: points, speed: (Math.random() * 0.05) + 0.02 });
    });

    camera.position.z = 5;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    // Animate
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        particleSystems.forEach((system, i) => {
            const { mesh, speed } = system;
            // Rotate each system slightly differently
            mesh.rotation.y = elapsedTime * speed * (i % 2 === 0 ? 1 : -1);
            mesh.rotation.z = elapsedTime * speed * 0.5;

            // Mouse parallax
            mesh.position.x += (mouseX * 0.01 - mesh.position.x) * 0.05;
            mesh.position.y += (-mouseY * 0.01 - mesh.position.y) * 0.05;
        });

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
