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

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > scrollThreshold) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}


// Problem-Solution Toggle
const toggleBtn = document.getElementById('toggleBtn');
const problemPanel = document.getElementById('problemPanel');
const solutionPanel = document.getElementById('solutionPanel');
let showingSolution = false;

if (toggleBtn && problemPanel && solutionPanel) {
    toggleBtn.addEventListener('click', () => {
        showingSolution = !showingSolution;

        if (showingSolution) {
            problemPanel.classList.add('hidden');
            solutionPanel.classList.add('active');
            toggleBtn.textContent = 'Вернуться к Проблемам';
        } else {
            problemPanel.classList.remove('hidden');
            solutionPanel.classList.remove('active');
            toggleBtn.textContent = 'Показать Решение';
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const navHeight = 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations for Elements
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
        }
    });
}, observerOptions);

// Observe roadmap steps
document.querySelectorAll('.roadmap__step').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(step);
});

// Observe pricing cards
document.querySelectorAll('.pricing__card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Demo Video Play Button
const playButton = document.getElementById('playButton');
const demoVideo = document.getElementById('demoVideo');

if (playButton && demoVideo) {
    playButton.addEventListener('click', () => {
        playButton.classList.add('hidden');
        demoVideo.play();
    });

    demoVideo.addEventListener('play', () => {
        playButton.classList.add('hidden');
    });

    demoVideo.addEventListener('pause', () => {
        if (demoVideo.currentTime < demoVideo.duration) {
            playButton.classList.remove('hidden');
        }
    });

    demoVideo.addEventListener('ended', () => {
        playButton.classList.remove('hidden');
    });
}

/* === TEAM CAROUSEL — ФОТО + АВТОСМЕНА === */

const teamMembers = [
    {
        name: 'Мухаммаджонов Бехруз Тохиржон угли',
        rolePrimary: 'Backend',
        roleSecondary: 'Developer',
        skills: ['Python', 'C++', 'JavaScript', 'Node.js', 'С#', '.Net', '.ASP', 'PostgreSQL', 'MS SQL', 'Server'],
        image: 'assets/images/team/behruz.png',
        github: 'https://beorht.github.io/my_portfolio/' // замени на реальный
    },
    {
        name: 'Нормирзаев Билолиддин Анвар угли',
        rolePrimary: 'Fronted',
        roleSecondary: 'Developer',
        skills: ['Python', 'JavaScript', 'HTML/CSS', 'PostgreSQL', 'Node.js'],
        image: 'assets/images/team/billy.png',
        github: 'https://github.com/B1l0l1dd1n' // замени на реальный
    },
    {
        name: 'Мирмахмудов Фаррух Боходир угли',
        rolePrimary: 'UI/UX',
        roleSecondary: 'Designer',
        skills: ['UI/UX Design', 'Python', 'HTML/CSS', 'JavaScript', 'Graphic Design', 'SQL', 'Linux Administration'],
        image: 'assets/images/team/farruh.png',
        github: 'https://progstyle.netlify.app/' // замени на реальный
    },
    {
        name: 'Сайдазимов Эмир-Саид Русланович',
        rolePrimary: 'Project',
        roleSecondary: 'Manager',
        skills: ['3D-моделирование', 'e-commerce (Shopify)', 'Python', 'HTML/CSS', 'JavaScript', 'React', 'Angular', 'PostgreSQl', 'MySql', 'Node.js'],
        image: 'assets/images/team/emir.png',
        github: 'https://github.com/DAKARCHIK' // замени на реальный
    },
    {
        name: 'Иброхимов Акмалхон Мирзохидович',
        rolePrimary: 'System',
        roleSecondary: 'Architect',
        skills: ['Android (Kotlin, Java)', 'Jetpack Compose', 'MVVM', 'Clean Architecture', 'Hilt (DI)', 'Retrofit', 'Room', 'Paging3', 'Flow', 'Python', 'SQL'],
        image: 'assets/images/team/akmal.png',
        github: 'https://github.com/AkmalkhonIbrokhimov' // замени на реальный
    }
];

const teamCardsContainer = document.getElementById('teamCards');
const prevBtn = document.getElementById('prevMember');
const nextBtn = document.getElementById('nextMember');
const dotsContainer = document.getElementById('teamDots');

let currentTeamIndex = 0;
let teamCarouselInterval;

let teamSlides = [];
let dots = [];

// Генерация слайдов и точек
if (teamCardsContainer && dotsContainer) {
    teamMembers.forEach((member, index) => {
        const slide = document.createElement('div');
        slide.classList.add('team__slide');
        if (index === 0) slide.classList.add('team__slide--active');

        slide.innerHTML = `
    <div class="team__ring"></div>
    <div class="team__photo-circle">
        ${member.image
                ? `<img src="${member.image}" alt="${member.name}" class="team__photo-img">`
                : `<span class="team__photo-initials">${member.initials || ''}</span>`
            }
    </div>
    <div class="team__role">
        <span class="team__role-word team__role-word--primary">${member.rolePrimary}</span>
        <span class="team__role-word team__role-word--secondary">${member.roleSecondary}</span>
    </div>
    <div class="team__name">${member.name}</div>
    <div class="team__skills-list">
        ${member.skills.map(skill => `<span class="team__skill">${skill}</span>`).join('')}
    </div>
    ${member.github ? `
        <a href="${member.github}" target="_blank" rel="noopener noreferrer" class="team__portfolio-btn">
            Portfolio →
        </a>
    ` : ''}
`;

        teamCardsContainer.appendChild(slide);
    });

    teamSlides = Array.from(document.querySelectorAll('.team__slide'));

    teamMembers.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('team__dot');
        if (index === 0) dot.classList.add('team__dot--active');
        dot.addEventListener('click', () => {
            showTeamMember(index);
            resetTeamCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    dots = Array.from(document.querySelectorAll('.team__dot'));
}

function showTeamMember(index) {
    if (!teamSlides.length) return;

    teamSlides.forEach(slide => slide.classList.remove('team__slide--active'));
    dots.forEach(dot => dot.classList.remove('team__dot--active'));

    if (teamSlides[index]) {
        teamSlides[index].classList.add('team__slide--active');
    }
    if (dots[index]) {
        dots[index].classList.add('team__dot--active');
    }

    currentTeamIndex = index;
}

function startTeamCarousel() {
    if (!teamSlides.length) return;
    teamCarouselInterval = setInterval(() => {
        currentTeamIndex = (currentTeamIndex + 1) % teamSlides.length;
        showTeamMember(currentTeamIndex);
    }, 4000); // чуть быстрее, меньше «висящего» статичного кадра
}

function resetTeamCarousel() {
    clearInterval(teamCarouselInterval);
    startTeamCarousel();
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (!teamSlides.length) return;
        currentTeamIndex = (currentTeamIndex - 1 + teamSlides.length) % teamSlides.length;
        showTeamMember(currentTeamIndex);
        resetTeamCarousel();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (!teamSlides.length) return;
        currentTeamIndex = (currentTeamIndex + 1) % teamSlides.length;
        showTeamMember(currentTeamIndex);
        resetTeamCarousel();
    });
}

// Pause auto-advance on hover
const teamCarousel = document.querySelector('.team__carousel');
if (teamCarousel) {
    teamCarousel.addEventListener('mouseenter', () => {
        clearInterval(teamCarouselInterval);
    });

    teamCarousel.addEventListener('mouseleave', () => {
        startTeamCarousel();
    });
}

// Запуск карусели
if (teamSlides.length) {
    showTeamMember(0);
    startTeamCarousel();
}

// Animate chart bars on scroll
const chartBars = document.querySelectorAll('.chart-bar');
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetHeight = bar.style.getPropertyValue('--height');
            bar.style.height = '0';

            setTimeout(() => {
                bar.style.transition = 'height 1s ease';
                bar.style.height = targetHeight;
            }, 100);
        }
    });
}, { threshold: 0.3 });

chartBars.forEach(bar => {
    chartObserver.observe(bar);
});

// ----------------- REPLACED: Enhanced scroll snap & wheel handling -----------------
// Поведение прокрутки: теперь wheel слушается и на window, и на .scroll-container.
// Обрабатываем wheel, клавиши и якоря; исключаем поля ввода и элементы с .no-smooth.
// Простая сглаживающая анимация через RAF.

const scrollContainer = document.querySelector('.scroll-container');

(function setupSmoothForwarding() {
    if (!scrollContainer) return;

    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.info('prefers-reduced-motion — используем нативный скролл');
        return;
    }

    // smoothing state
    let target = scrollContainer.scrollTop;
    let current = scrollContainer.scrollTop;
    let rafId = null;
    const EASE = 0.06; // Reduced for smoother animation
    const MAX_DELTA = 400; // Reduced for smoother scrolling
    const MIN_DIFF = 0.1; // Smaller threshold for smoother stop

    function normalizeDelta(e) {
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= window.innerHeight;
        // Apply smoother scaling for larger deltas
        if (Math.abs(delta) > MAX_DELTA) {
            delta = delta > 0 ? MAX_DELTA : -MAX_DELTA;
        }
        return delta;
    }

    function clampTarget() {
        const max = Math.max(0, scrollContainer.scrollHeight - scrollContainer.clientHeight);
        if (target < 0) target = 0;
        if (target > max) target = max;
    }

    // Smooth easing function (ease-out cubic)
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function rafRender() {
        const diff = target - current;
        const absDiff = Math.abs(diff);

        if (absDiff < MIN_DIFF) {
            current = target;
            scrollContainer.scrollTop = Math.round(current);
            rafId = null;
            return;
        }

        // Use adaptive easing - smoother when close to target
        const distance = absDiff;
        const maxDistance = scrollContainer.clientHeight;
        const normalizedDistance = Math.min(distance / maxDistance, 1);

        // Adaptive ease factor - slower when close to target
        const adaptiveEase = EASE * (0.5 + 0.5 * normalizedDistance);

        current += diff * adaptiveEase;
        scrollContainer.scrollTop = Math.round(current);

        if (Math.abs(target - current) >= MIN_DIFF) {
            rafId = requestAnimationFrame(rafRender);
        } else {
            current = target;
            scrollContainer.scrollTop = Math.round(current);
            rafId = null;
        }
    }

    function startRAF() {
        if (!rafId) rafId = requestAnimationFrame(rafRender);
    }

    function isInteractiveElement(node) {
        if (!node) return false;
        const tag = node.tagName;
        if (!tag) return false;
        const interactiveTags = ['INPUT', 'TEXTAREA', 'SELECT', 'DETAILS'];
        if (interactiveTags.includes(tag)) return true;
        if (node.isContentEditable) return true;
        if (node.closest && node.closest('.no-smooth')) return true;
        return false;
    }

    // main wheel handler — apply to container
    function handleWheel(e) {
        // do not interfere with native interactions
        if (isInteractiveElement(e.target)) return;
        if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) return;

        e.preventDefault();
        const delta = normalizeDelta(e);
        target += delta;
        clampTarget();
        startRAF();
    }

    // forward wheel events from window -> container
    function onWindowWheel(e) {
        // if target is interactive, ignore
        if (isInteractiveElement(e.target)) return;

        // If the pointer is inside an iframe or some other element, still forward
        // We call the same handler but with the same event.
        handleWheel(e);
    }

    // keyboard navigation (PageUp/PageDown/Home/End)
    function onKeyDown(e) {
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
        if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) return;

        const page = scrollContainer.clientHeight * 0.9;
        if (e.key === 'PageDown') { target += page; e.preventDefault(); }
        else if (e.key === 'PageUp') { target -= page; e.preventDefault(); }
        else if (e.key === 'End') { target = scrollContainer.scrollHeight - scrollContainer.clientHeight; e.preventDefault(); }
        else if (e.key === 'Home') { target = 0; e.preventDefault(); }
        else return;
        clampTarget();
        startRAF();
    }

    // anchor clicks inside document
    function onDocumentClick(e) {
        const a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();

        const rect = el.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const offset = rect.top - containerRect.top + scrollContainer.scrollTop;
        target = offset;
        clampTarget();
        startRAF();
        history.pushState ? history.pushState(null, '', '#' + id) : (location.hash = '#' + id);
    }

    // touch handling: allow native scroll but sync target/current on end
    scrollContainer.addEventListener('touchstart', () => { /* passive */ }, { passive: true });
    scrollContainer.addEventListener('touchend', () => {
        target = scrollContainer.scrollTop;
        current = scrollContainer.scrollTop;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    });

    // watch for DOM changes to update bounds
    const mo = new MutationObserver(() => clampTarget());
    mo.observe(scrollContainer, { childList: true, subtree: true, attributes: true });

    // expose setter cleanup (optional)
    window.__setSmoothTarget = function (val) {
        if (typeof val === 'number') {
            target = val;
            clampTarget();
            startRAF();
        }
    };

    window.__smoothScrollCleanup = function () {
        try {
            scrollContainer.removeEventListener('wheel', handleWheel);
            window.removeEventListener('wheel', onWindowWheel);
            window.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('click', onDocumentClick);
            mo.disconnect();
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            scrollContainer.classList.remove('scroll-smooth-active');
            console.info('[smooth] cleanup done');
        } catch (err) {
            console.warn('[smooth] cleanup error', err);
        }
    };

    // init bindings
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('wheel', onWindowWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });
    document.addEventListener('click', onDocumentClick);
    window.addEventListener('resize', clampTarget, { passive: true });

    // sync after images load
    function waitImagesLoaded(timeout = 2000) {
        const imgs = Array.from(scrollContainer.querySelectorAll('img'));
        const pending = imgs.filter(i => !i.complete);
        if (!pending.length) return Promise.resolve();
        return new Promise(resolve => {
            let done = 0;
            pending.forEach(img => {
                img.addEventListener('load', () => { done++; if (done === pending.length) resolve(); }, { once: true });
                img.addEventListener('error', () => { done++; if (done === pending.length) resolve(); }, { once: true });
            });
            setTimeout(resolve, timeout);
        });
    }

    waitImagesLoaded().then(() => {
        target = scrollContainer.scrollTop;
        current = scrollContainer.scrollTop;
        scrollContainer.classList.add('scroll-smooth-active');
    });
})();

// Prevent rapid scroll events from causing issues
let lastScrollTime = 0;
const scrollThrottle = 100; // milliseconds

if (scrollContainer) {
    // keep a lightweight throttle for any legacy handlers
    scrollContainer.addEventListener('wheel', () => {
        const now = Date.now();
        if (now - lastScrollTime < scrollThrottle) {
            return;
        }
        lastScrollTime = now;
    }, { passive: true });
}

// Add hover effect to tech badges
document.querySelectorAll('.tech__badge').forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0)';
    });
});

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

// Highlight active roadmap step on scroll
const roadmapSteps = document.querySelectorAll('.roadmap__step');

const roadmapObserverOptions = {
    root: null, // relative to the viewport
    rootMargin: '0px 0px -50% 0px', // Trigger when step enters upper half of viewport
    threshold: 0 // As soon as any part of the element enters the root
};

const roadmapObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('roadmap__step--active');
        } else {
            entry.target.classList.remove('roadmap__step--active');
        }
    });
}, roadmapObserverOptions);

roadmapSteps.forEach(step => {
    roadmapObserver.observe(step);
});