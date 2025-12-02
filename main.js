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

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');
});

/* ---------------------- Close Mobile Menu on Link Click ---------------------- */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
        }
    });
});

/* ---------------------- Reset Menu on Window Resize ---------------------- */
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('show');
    }
});

/* ---------------------- Optional: Slide Down Animation ---------------------- */
/* This makes the mobile menu open/close smoothly */
const navMenuHeight = navMenu.scrollHeight;
navMenu.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
navMenu.style.overflow = 'hidden';
navMenu.classList.remove('show'); // initial state

// Toggle slide effect when hamburger clicked
hamburger.addEventListener('click', () => {
    if(navMenu.classList.contains('show')) {
        navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
        setTimeout(() => {
            navMenu.style.maxHeight = '0';
        }, 10);
    } else {
        navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
    }
});

/* ---------------------- Ensure Slides & Hero Text Load Smoothly ---------------------- */
window.addEventListener('load', () => {
    slides.forEach(slide => slide.style.opacity = '0');
    slides[currentSlide].style.opacity = '1';
});
