/* ===================================================================
 * Sublime - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

    "use strict";

    var cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

        $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // svg fallback
    if (typeof Modernizr !== 'undefined' && !Modernizr.svg) {
        $(".header-logo img").attr("src", "images/logo.png");
    }


    /* Preloader
     * -------------------------------------------------- */
    var ssPreloader = function () {
        $("html").addClass('ss-preload');

        const fadeOutPreloader = function () {
            // Already hidden or in progress
            if ($("html").hasClass('ss-loaded')) return;

            $('html, body').animate({ scrollTop: 0 }, 'normal');
            $("#loader").fadeOut("slow", function () {
                $("#preloader").delay(300).fadeOut("slow");
            });
            $("html").removeClass('ss-preload').addClass('ss-loaded');
        };

        // Standard load behavior
        if (document.readyState === 'complete') {
            fadeOutPreloader();
        } else {
            $WIN.on('load', fadeOutPreloader);
        }

        // FAIL-SAFE: If window.load doesn't fire for some reason (e.g. adblocker blocking a script)
        // Force preloader out after 3 seconds
        setTimeout(fadeOutPreloader, 3000);
    };


    /* Menu on Scrolldown
     * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function () {

        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function () {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


    /* OffCanvas Menu
     * ------------------------------------------------------ */
    var ssOffCanvas = function () {

        var menuTrigger = $('.header-menu-toggle'),
            nav = $('.header-nav'),
            closeButton = nav.find('.header-nav__close'),
            siteBody = $('body'),
            mainContents = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function (e) {
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function (e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function (e) {
            if (!$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span')) {
                siteBody.removeClass('menu-is-open');
            }
        });

    };


    /* Masonry
     * ---------------------------------------------------- */
    var ssMasonryFolio = function () {

        var containerBricks = $('.masonry');

        // containerBricks.imagesLoaded(function () {
        //     containerBricks.masonry({
        //         itemSelector: '.masonry__brick',
        //         resize: true
        //     });
        // });
    };


    /* photoswipe
     * ----------------------------------------------------- */
    var ssPhotoswipe = function () {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // get items
        $folioItems.each(function (i) {

            var $folio = $(this),
                $thumbLink = $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $sizeAttr = $thumbLink.data('size'),
                $size = $sizeAttr ? $sizeAttr.split('x') : [1050, 700],
                $width = $size[0],
                $height = $size[1];

            var item = {
                src: $href,
                w: $width,
                h: $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        // $folioItems.each(function (i) {

        //     $(this).on('click', function (e) {
        //         e.preventDefault();
        //         var options = {
        //             index: i,
        //             showHideOpacity: true
        //         }

        //         // initialize PhotoSwipe
        //         var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
        //         lightBox.init();
        //     });

        // });
    };


    /* slick slider
     * ------------------------------------------------------ */
    var ssSlickSlider = function () {

        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500
        });
    };


    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var ssSmoothScroll = function () {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


    /* Alert Boxes
     * ------------------------------------------------------ */
    var ssAlertBoxes = function () {

        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });

    };


    /* Animate On Scroll
     * ------------------------------------------------------ */
    var ssAOS = function () {

        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


    /* Theater Mode & Cinematic Backdrop (Option B: Particles)
     * ------------------------------------------------------------------- */
    var ssTheaterMode = function () {
        const canvas = document.getElementById('theater-backdrop-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let isTheaterActive = false;
        let animationFrameId;
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Track mouse for bokeh parallax
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        class Bokeh {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 100 + 50;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.parallaxFactor = Math.random() * 0.05 + 0.01;
            }

            update() {
                this.x += this.speedX + (mouse.x - canvas.width / 2) * this.parallaxFactor * 0.1;
                this.y += this.speedY + (mouse.y - canvas.height / 2) * this.parallaxFactor * 0.1;

                if (this.x < -this.size) this.x = canvas.width + this.size;
                if (this.x > canvas.width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = canvas.height + this.size;
                if (this.y > canvas.height + this.size) this.y = -this.size;
            }

            draw() {
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(255, 79, 216, ${this.opacity})`);
                gradient.addColorStop(1, 'rgba(255, 79, 216, 0)');
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 15; i++) {
                particles.push(new Bokeh());
            }
        };

        const animate = () => {
            if (!isTheaterActive) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        // Lity Event Delegation (One-time setup)
        $(document).on('mouseenter', '.lity-close', function() {
            document.body.classList.add('hover-theater-close');
        }).on('mouseleave', '.lity-close', function() {
            document.body.classList.remove('hover-theater-close');
        });

        // Lity Hooks
        // Arguments for Lity 1.6.6+: (event, wrapper, instance)
        $(document).on('lity:ready', function (event, wrapper, instance) {
            // Find video in content (event.target is the content element in Lity)
            const video = $(event.target).find('video')[0];
            
            isTheaterActive = true;
            document.body.classList.add('theater-active');
            initParticles();

            // Store the true instance (the function object with .close())
            window.currentLityInstance = instance;

            if (video) {
                video.addEventListener('play', () => {
                    cancelAnimationFrame(animationFrameId);
                    animate();
                });
                video.addEventListener('pause', () => {
                    cancelAnimationFrame(animationFrameId);
                });

                if (!video.paused) animate();
            } else {
                animate();
            }
        });

        $(document).on('lity:close', function () {
            isTheaterActive = false;
            document.body.classList.remove('theater-active');
            document.body.classList.remove('hover-theater-close');
            window.currentLityInstance = null;
            cancelAnimationFrame(animationFrameId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    };


    /* Initialize
     * ------------------------------------------------------ */
    (function clInit() {

        try { ssPreloader(); } catch (e) { console.error(e); }
        try { ssMenuOnScrolldown(); } catch (e) { console.error(e); }
        try { ssOffCanvas(); } catch (e) { console.error(e); }
        try { ssMasonryFolio(); } catch (e) { console.error(e); }
        try { ssPhotoswipe(); } catch (e) { console.error(e); }
        try { ssSlickSlider(); } catch (e) { console.error(e); }
        try { ssSmoothScroll(); } catch (e) { console.error(e); }
        try { ssAlertBoxes(); } catch (e) { console.error(e); }
        try { ssAOS(); } catch (e) { console.error(e); }
        try { ssAdvancedCursor(); } catch (e) { console.error(e); }
        try { ssEditorialAnimations(); } catch (e) { console.error(e); }
        try { ssTheaterMode(); } catch (e) { console.error(e); }

    })();

/* ===================================================================
 * Editorial Services Animations (GSAP)
 * ------------------------------------------------------------------- */
function ssEditorialAnimations() {

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Elegant Reveal Effect
    const cinematicTitle = document.querySelector('.cinematic-title');
    if (cinematicTitle) {
        gsap.to(cinematicTitle, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".services-header-elite",
                start: "top 85%",
            }
        });
        // Initial state
        gsap.set(cinematicTitle, { y: 30, opacity: 0 });
    }

    // 2. Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3; // 30% pull
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;

            gsap.to(btn, {
                x: x,
                y: y,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 3. Blob Respirations / Parallax
    const panels = document.querySelectorAll('.service-panel');
    panels.forEach(panel => {
        const blob = panel.querySelector('.blob-wrapper');
        if (!blob) return;

        // Idle breathing timeline
        gsap.to(blob, {
            scale: 1.05,
            rotation: 2,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Mouse morph / parallax
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.05; // 5% pull
            const y = (e.clientY - rect.top - rect.height / 2) * 0.05;

            gsap.to(blob, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        });

        panel.addEventListener('mouseleave', () => {
            gsap.to(blob, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    // 4. Interactive Vertical Timeline (Process Section)
    const timelineContainer = document.querySelector('.interactive-timeline');
    const timelineFill = document.querySelector('.timeline-fill');
    const timelineNodes = document.querySelectorAll('.timeline-node');

    if (timelineContainer && timelineFill) {
        // Animate the line height pouring down
        ScrollTrigger.create({
            trigger: timelineContainer,
            start: "top center", // Start when the top of timeline hits center of viewport
            end: "bottom center", // End when the bottom hits center
            animation: gsap.to(timelineFill, { height: "100%", ease: "none" }),
            scrub: true // Tie it directly to the scrollbar
        });

        // Activate individual nodes when they cross the center
        timelineNodes.forEach(node => {
            ScrollTrigger.create({
                trigger: node,
                start: "center center",
                onEnter: () => node.classList.add('is-active'),
                onLeaveBack: () => node.classList.remove('is-active')
            });
        });
    }

    // 5. Hero Title Interactive Hover (Letter-by-Letter)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Grab the text and split into characters
        const text = heroTitle.innerText.trim();
        heroTitle.innerHTML = ''; // Clear existing text

        // Wrap each character in a span
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            span.classList.add('hero-char');
            heroTitle.appendChild(span);
        });
    }

}

/* ===================================================================
 * Advanced Custom Cursor Logic (GSAP quickSetter)
 * ------------------------------------------------------------------- */
function ssAdvancedCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const cursorText = cursorRing ? cursorRing.querySelector('.cursor-text') : null;

    if (!cursorDot || !cursorRing) return;

    // Set up GSAP quickSetters for high performance 60fps rendering
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    const setDotX = gsap.quickSetter(cursorDot, "x", "px");
    const setDotY = gsap.quickSetter(cursorDot, "y", "px");
    const setRingX = gsap.quickSetter(cursorRing, "x", "px");
    const setRingY = gsap.quickSetter(cursorRing, "y", "px");

    // Variables for lerp math (linear interpolation)
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Update mouse coordinates instantly
    let cursorInitialized = false;
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Reveal cursor on first move
        if (!cursorInitialized) {
            gsap.to([cursorDot, cursorRing], { opacity: 1, duration: 0.5 });
            cursorInitialized = true;
        }
    });

    // Lerp function for smoothness
    const lerp = (start, end, amt) => {
        return (1 - amt) * start + amt * end;
    };

    // Main animation loop inside GSAP ticker
    gsap.ticker.add(() => {
        // Dot follows fast (amt = 0.6) for precision
        dotPos.x = lerp(dotPos.x, mouse.x, 0.6);
        dotPos.y = lerp(dotPos.y, mouse.y, 0.6);

        // Ring follows slower (amt = 0.15) for that elegant, heavy "floating" feel
        ringPos.x = lerp(ringPos.x, mouse.x, 0.15);
        ringPos.y = lerp(ringPos.y, mouse.y, 0.15);

        setDotX(dotPos.x);
        setDotY(dotPos.y);
        setRingX(ringPos.x);
        setRingY(ringPos.y);
    });

    // --- Magnetic & Morphing Interaction States ---

    // 1. Expand on Links and Buttons
    const expandElements = document.querySelectorAll('a, button, .btn');
    expandElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Only expand if it's NOT a project card thumb
            if (!el.closest('.item-folio__thumb') && !el.closest('.item-service')) {
                document.body.classList.add('hover-expand');
            }
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover-expand');
        });
    });

    // 2. View Text Pill on Project Cards
    const viewElements = document.querySelectorAll('.item-folio__thumb a, .item-service');
    viewElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hover-view');
            if (cursorText) cursorText.innerText = 'View';
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover-view');
            if (cursorText) cursorText.innerText = '';
        });
    });

    // 2b. Hero Spotlight Text Effect
    const spotlightElements = document.querySelectorAll('.hero-title');
    spotlightElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hover-spotlight');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover-spotlight');
        });
    });

    // 2c. Services Pink Spotlight Text Effect
    const pinkSpotlightElements = document.querySelectorAll('.services-spotlight-text, .cinematic-title');
    pinkSpotlightElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hover-pink-spotlight');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover-pink-spotlight');
        });
    });

    // 3. Global Click Ripple
    window.addEventListener('mousedown', () => {
        document.body.classList.add('cursor-active');
    });
    window.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-active');
    });

}

})(jQuery);
