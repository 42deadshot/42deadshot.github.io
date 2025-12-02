// ---------------------- HERO TEXT ANIMATION ----------------------
const lines = ['heroText1', 'heroText2', 'heroText3'];

lines.forEach((id, lineIndex) => {
    const heroText = document.getElementById(id);
    const textContent = heroText.textContent;
    heroText.textContent = '';
    textContent.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${lineIndex * 0.5 + i * 0.03}s`;
        heroText.appendChild(span);
    });
});

// ---------------------- HERO SLIDESHOW ----------------------
const slides = document.querySelectorAll('.slide');
const slideBtns = document.querySelectorAll('.slide-btn');
let currentSlide = 0;
const slideIntervalTime = 2500;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        slideBtns[i].classList.toggle('active', i === index);
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

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlideFunc);

slideInterval = setInterval(nextSlide, slideIntervalTime);

// ---------------------- HAMBURGER MENU FUNCTIONALITY ----------------------
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    // Toggle menu visibility
    navMenu.classList.toggle('open');

    // Animate height for push-down effect
    if (navMenu.classList.contains('open')) {
        navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
    } else {
        navMenu.style.maxHeight = '0';
    }
});

// Collapse menu when any link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navMenu.style.maxHeight = '0';
        }
    });
});

// ---------------------- RESPONSIVE IMAGE FIX ----------------------
document.querySelectorAll('img').forEach(img => {
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.objectFit = 'cover';
});
