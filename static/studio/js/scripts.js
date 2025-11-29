console.log("Script loaded!");

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // 1. Lightbox for project/category images
    // ========================
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lb-img");
    const images = document.querySelectorAll(".project-img, .category-img, .slide-image");

    images.forEach(img => {
        img.addEventListener("click", () => {
            if (!lightbox) return;
            lightbox.classList.remove("hidden");
            lbImg.src = img.src;
        });
    });

    if (lightbox) {
        lightbox.addEventListener("click", () => {
            lightbox.classList.add("hidden");
            lbImg.src = "";
        });
    }

    // ========================
    // 2. Fade-up animations
    // ========================
    const fadeElements = document.querySelectorAll(".animate-fade-up");

    const fadeObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.animationPlayState = "running";
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // ========================
    // 3. Floating thumbnails animation (optional)
    // ========================
    const floatingThumbs = document.querySelectorAll(".floating-thumb");

    floatingThumbs.forEach(el => {
        el.addEventListener("mouseover", () => {
            el.style.transform = "scale(1.05)";
        });
        el.addEventListener("mouseout", () => {
            el.style.transform = "scale(1)";
        });
    });

    // ========================
    // 4. Hero logo hover effect
    // ========================
    const heroLogo = document.querySelector(".hero-logo img");
    if (heroLogo) {
        heroLogo.addEventListener("mouseover", () => {
            heroLogo.style.transform = "scale(1.08) rotate(-2deg)";
        });
        heroLogo.addEventListener("mouseout", () => {
            heroLogo.style.transform = "scale(1) rotate(0deg)";
        });
    }

    // ========================
    // 5. Hero Slideshow (auto-rotate all images)
    // ========================
    const slides = document.querySelectorAll('.slide-image');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Optional arrow controls
    window.changeSlide = function(n) {
        currentSlide = (currentSlide + n + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Show first image
    showSlide(currentSlide);

    // Auto-rotate all images every 4 seconds
    setInterval(nextSlide, 4000);

    // Preload slideshow images
    slides.forEach(img => { const pre = new Image(); pre.src = img.src; });

});
