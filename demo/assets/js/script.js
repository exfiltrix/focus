// ===== SCRIPT.JS =====

// ===== NAVBAR TOGGLE (mobile) =====
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('nav--open');
    });

    // закрывать меню при клике по ссылке
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--open');
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
if (nav) {
    let lastScroll = 0;
    const scrollThreshold = 50;

    const scrollContainer = document.querySelector('.scroll-container');
    const scrollElement = scrollContainer || window;

    const handleScroll = () => {
        const currentScroll = scrollContainer
            ? scrollContainer.scrollTop
            : (window.pageYOffset || document.documentElement.scrollTop);

        if (currentScroll > scrollThreshold) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = currentScroll;
    };

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}


// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const container = document.querySelector('.scroll-container');
            const navHeight = 70;

            if (container) {
                const rect = target.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const offset = rect.top - containerRect.top + container.scrollTop - navHeight;

                container.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            } else {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Standard scroll - no animations
const scrollContainer = document.querySelector('.scroll-container');


console.log('Fullscreen presentation website loaded successfully with animated team block and auto-rotation.');

// Video Play and Animation on Scroll
const videoIntroSection = document.getElementById('video-intro');
const videoIntroContainer = document.querySelector('.video-intro__container');
const introVideo = document.getElementById('introVideo');

if (videoIntroSection && videoIntroContainer && introVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class for animation
                videoIntroContainer.classList.add('is-visible');

                // Explicitly set muted to true (even if in HTML) and log its state
                introVideo.muted = true;
                console.log('Video muted state before play:', introVideo.muted);

                // Ensure video is ready to play (enough data loaded)
                if (introVideo.readyState >= 3) { // HAVE_FUTURE_DATA
                    if (introVideo.paused) {
                        introVideo.play().catch(error => {
                            console.log("Autoplay prevented:", error);
                        });
                    }
                } else {
                    // If not enough data, wait for it
                    introVideo.addEventListener('canplaythrough', function handler() {
                        if (introVideo.paused) {
                            introVideo.play().catch(error => {
                                console.log("Autoplay prevented (after canplaythrough):", error);
                            });
                        }
                        introVideo.removeEventListener('canplaythrough', handler);
                    });
                    introVideo.load(); // Try to force loading
                }

            } else {
                // Remove class and pause video when out of view
                videoIntroContainer.classList.remove('is-visible');
                if (!introVideo.paused) {
                    introVideo.pause();
                }
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    videoObserver.observe(videoIntroSection);
}