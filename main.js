// -----------------------------
// Hamburger Menu
// -----------------------------
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');

    // Push content down when menu opens
    if (navMenu.classList.contains('show')) {
        document.body.style.marginTop = navMenu.scrollHeight + 'px';
    } else {
        document.body.style.marginTop = '0';
    }
});

// Close menu when any link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if(navMenu.classList.contains('show')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
            document.body.style.marginTop = '0';
        }
    });
});


// -----------------------------
// Hero Text Animation
// -----------------------------
const lines = ['heroText1','heroText2','heroText3'];
lines.forEach((id,lineIndex)=>{
    const heroText = document.getElementById(id);
    if(!heroText) return;
    const textContent = heroText.textContent;
    heroText.textContent = '';
    textContent.split('').forEach((char,i)=>{
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${lineIndex*0.5 + i*0.03}s`;
        heroText.appendChild(span);
    });
});


// -----------------------------
// Slideshow
// -----------------------------
const slides = document.querySelectorAll('.slide');
const slideBtns = document.querySelectorAll('.slide-btn');
let currentSlide = 0;
const slideIntervalTime = 2500;
let slideInterval;

function showSlide(index){
    slides.forEach((slide,i)=>{
        slide.classList.toggle('active', i===index);
        if(slideBtns[i]) slideBtns[i].classList.toggle('active', i===index);
    });
    currentSlide = index;
}

function nextSlide(){
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlideFunc(){
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Slide button click
slideBtns.forEach(btn => {
    btn.addEventListener('click', () => showSlide(parseInt(btn.dataset.slide)));
});

// Slide arrow buttons
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if(nextBtn) nextBtn.addEventListener('click', nextSlide);
if(prevBtn) prevBtn.addEventListener('click', prevSlideFunc);

// Auto slideshow
slideInterval = setInterval(nextSlide, slideIntervalTime);


// -----------------------------
// Image resizing (all images fit container)
// -----------------------------
const allImages = document.querySelectorAll('img');
allImages.forEach(img => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
});


// -----------------------------
// Fade-in animation utility
// -----------------------------
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
