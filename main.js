// ================================
// Hero Text Animation
// ================================
const heroLines = ['heroText1', 'heroText2', 'heroText3'];
heroLines.forEach((id, lineIndex) => {
    const heroText = document.getElementById(id);
    if (!heroText) return; // skip if element not on this page
    const textContent = heroText.textContent;
    heroText.textContent = '';
    textContent.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${lineIndex * 0.5 + i * 0.03}s`;
        heroText.appendChild(span);
    });
});

// ================================
// Slideshow Functionality
// ================================
const slides = document.querySelectorAll('.slide');
const slideBtns = document.querySelectorAll('.slide-btn');
let currentSlide = 0;
const slideIntervalTime = 2500;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        if (slideBtns[i]) slideBtns[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

slideBtns.forEach(btn => {
    btn.addEventListener('click', () => showSlide(parseInt(btn.dataset.slide)));
});

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlideFunc);

if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

// ================================
// Hamburger Menu Functionality
// ================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    // Initially hide menu on mobile
    if (window.innerWidth <= 768) {
        navMenu.style.maxHeight = '0px';
        navMenu.style.overflow = 'hidden';
        navMenu.style.transition = 'max-height 0.5s ease';
    }

    hamburger.addEventListener('click', () => {
        if (navMenu.style.maxHeight === '0px' || navMenu.style.maxHeight === '') {
            // Open menu
            navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
        } else {
            // Close menu
            navMenu.style.maxHeight = '0px';
        }
    });

    // Close menu when a link is clicked (mobile)
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.maxHeight = '0px';
            }
        });
    });
}

// ================================
// Handle Window Resize
// ================================
window.addEventListener('resize', () => {
    if (!navMenu) return;
    if (window.innerWidth > 768) {
        navMenu.style.maxHeight = '';
        navMenu.style.overflow = '';
    } else {
        navMenu.style.maxHeight = '0px';
        navMenu.style.overflow = 'hidden';
    }
});
