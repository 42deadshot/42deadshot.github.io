/* ================================
   MOBILE MENU TOGGLE
================================ */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/* ================================
   HERO SLIDESHOW
================================ */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideBtns = document.querySelectorAll('.slide-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slideBtns.forEach(btn => btn.classList.remove('active'));

    slides[index].classList.add('active');
    slideBtns[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

let slideInterval;

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

if (slides.length > 0) {
    startSlideshow();

    prevBtn?.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });

    nextBtn?.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });

    slideBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideshow();
            startSlideshow();
        });
    });

    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }
}

/* ================================
   SMOOTH SCROLLING
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ================================
   FORM VALIDATION + SUBMISSION
================================ */
const contactForm = document.getElementById('contactForm');

function showMessage(text, type) {
    document.querySelectorAll('.message').forEach(m => m.remove());

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;

    const form = document.getElementById('contactForm');
    if (form) form.insertBefore(message, form.firstChild);
    else document.body.insertBefore(message, document.body.firstChild);

    setTimeout(() => message.remove(), 5000);
}

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showMessage('Thank you for your message! We will respond shortly.', 'success');
            this.reset();

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

        }, 2000);
    });
}

/* ================================
   SCROLL ANIMATIONS (FADE-IN)
================================ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.project-card, .service-card, .category-card, .value-card, .team-member, .benefit-item, .faq-item')
    .forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

/* ================================
   COUNTER ANIMATION
================================ */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

/* ================================
   LAZY LOADING IMAGES
================================ */
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

/* ================================
   PARALLAX EFFECT
================================ */
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('.slide').forEach(slide => {
        slide.style.transform = `translateY(${scrollY * 0.45}px)`;
    });
});

/* ================================
   BACK TO TOP BUTTON
================================ */
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================
   SOCIAL ICON TOOLTIP (NEW VERSION)
================================ */
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const platform = link.dataset.platform;
        if (!platform) return;

        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = platform;

        link.style.position = 'relative';
        link.appendChild(tooltip);
    });

    link.addEventListener('mouseleave', () => {
        const tooltip = link.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});

console.log('%c🏗️ Fretistan Ltd — Construction Excellence', 'color:#1B3B6F; font-size:16px; font-weight:bold;');
console.log('%cNeed professional construction services? Contact us today.', 'color:#F2A900; font-size:14px;');
