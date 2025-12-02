/* ---------------------- Hero Text Animation (only if elements exist) ---------------------- */
const lines = ['heroText1', 'heroText2', 'heroText3'];
lines.forEach((id, lineIndex) => {
    const heroText = document.getElementById(id);
    if (!heroText) return; // skip if not on this page
    const textContent = heroText.textContent;
    heroText.textContent = '';
    textContent.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${lineIndex * 0.5 + i * 0.03}s`;
        heroText.appendChild(span);
    });
});

/* ---------------------- Slideshow Functionality (only if slides exist) ---------------------- */
const slides = document.querySelectorAll('.slide');
if (slides.length) {
    const slideBtns = document.querySelectorAll('.slide-btn');
    let currentSlide = 0;
    const slideIntervalTime = 2500;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            if(slideBtns[i]) slideBtns[i].classList.toggle('active', i === index);
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
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
    if(prevBtn) prevBtn.addEventListener('click', prevSlideFunc);

    slideInterval = setInterval(nextSlide, slideIntervalTime);

    window.addEventListener('load', () => {
        slides.forEach(slide => slide.style.opacity = '0');
        slides[currentSlide].style.opacity = '1';
    });
}

/* ---------------------- Hamburger Menu (works on all pages) ---------------------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if(hamburger && navMenu){
    // Initial CSS for slide + fade effect
    navMenu.style.overflow = 'hidden';
    navMenu.style.maxHeight = '0';
    navMenu.style.opacity = '0';
    navMenu.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if(navMenu.style.maxHeight === '0px' || navMenu.style.maxHeight === ''){
            navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
            navMenu.style.opacity = '1';
        } else {
            navMenu.style.maxHeight = '0';
            navMenu.style.opacity = '0';
        }
    });

    // Close menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768){
                hamburger.classList.remove('active');
                navMenu.style.maxHeight = '0';
                navMenu.style.opacity = '0';
            }
        });
    });

    // Reset menu on resize
    window.addEventListener('resize', () => {
        if(window.innerWidth > 768){
            hamburger.classList.remove('active');
            navMenu.style.maxHeight = 'none';
            navMenu.style.opacity = '1';
        } else {
            navMenu.style.maxHeight = '0';
            navMenu.style.opacity = '0';
        }
    });
}
