/* ---------------------- Hero Text Animation ---------------------- */
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

/* ---------------------- Slideshow Functionality ---------------------- */
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

/* ---------------------- Hamburger Menu Toggle ---------------------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Set initial CSS for sliding effect
navMenu.style.overflow = 'hidden';
navMenu.style.maxHeight = '0';
navMenu.style.transition = 'max-height 0.5s ease';

/* Hamburger click toggles menu slide down */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    if(navMenu.style.maxHeight === '0px' || navMenu.style.maxHeight === '') {
        navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
    } else {
        navMenu.style.maxHeight = '0';
    }
});

/* Close mobile menu when a nav link is clicked */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768){
            hamburger.classList.remove('active');
            navMenu.style.maxHeight = '0';
        }
    });
});

/* Reset menu on window resize if desktop */
window.addEventListener('resize', () => {
    if(window.innerWidth > 768){
        hamburger.classList.remove('active');
        navMenu.style.maxHeight = 'none'; // allow full desktop menu display
    } else {
        navMenu.style.maxHeight = '0'; // reset for mobile
    }
});

/* ---------------------- Ensure Slides & Hero Text Load Smoothly ---------------------- */
window.addEventListener('load', () => {
    slides.forEach(slide => slide.style.opacity = '0');
    slides[currentSlide].style.opacity = '1';
});
