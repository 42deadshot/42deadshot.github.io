// ================================
// Hero Text Animation
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const heroLines = ['heroText1', 'heroText2', 'heroText3'];
    heroLines.forEach((id, lineIndex) => {
        const heroText = document.getElementById(id);
        if (!heroText) return; // skip if element not on this page
        const textContent = heroText.textContent;
        heroText.textContent = '';
        textContent.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            span.style.animationDelay = `${lineIndex * 0.5 + i * 0.03}s`;
            heroText.appendChild(span);
        });
    });

    // ================================
    // Hero Slideshow Functionality
    // ================================
    const slides = document.querySelectorAll('.hero-slide');
    const slideBtns = document.querySelectorAll('.hero-btn');
    let currentSlide = 0;
    const slideIntervalTime = 5000; // Increased to 5 seconds for better readability
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

    // Add click handlers for slide buttons
    slideBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showSlide(parseInt(btn.dataset.slide));
            // Reset interval when manually changing slides
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, slideIntervalTime);
            }
        });
    });

    // Start slideshow if slides exist
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
        }

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
            
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
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('open');
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
            // Reset mobile menu styles on desktop
            navMenu.style.maxHeight = '';
            navMenu.style.overflow = '';
            navMenu.classList.remove('open');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        } else {
            // Ensure menu is closed on mobile when resizing
            navMenu.style.maxHeight = '0px';
            navMenu.classList.remove('open');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });

    // ================================
    // Smooth Scrolling for Anchor Links
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ================================
    // Form Enhancement
    // ================================
    const contactForm = document.querySelector('form[action^="mailto:"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Enhanced mailto functionality
            const formData = new FormData(this);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const subject = formData.get('subject') || '';
            const message = formData.get('message') || '';
            const service = formData.get('service') || '';
            const phone = formData.get('phone') || '';
            
            // Construct a well-formatted email body
            let body = `Dear Fretistan Ltd,%0D%0A%0D%0A`;
            body += `I am interested in your construction services and would like to request more information.%0D%0A%0D%0A`;
            body += `PROJECT DETAILS:%0D%0A`;
            body += `Name: ${name}%0D%0A`;
            body += `Email: ${email}%0D%0A`;
            if (phone) body += `Phone: ${phone}%0D%0A`;
            if (service) body += `Service Interest: ${service}%0D%0A`;
            body += `%0D%0A`;
            body += `MESSAGE:%0D%0A`;
            body += `${message}%0D%0A%0D%0A`;
            body += `I look forward to hearing from you and discussing my project in more detail.%0D%0A%0D%0A`;
            body += `Best regards,%0D%0A`;
            body += `${name}`;
            
            // Update the form action with formatted subject and body
            const mailtoLink = `mailto:fretistancompanyltd@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Open the email client
            window.location.href = mailtoLink;
            
            // Prevent default form submission
            e.preventDefault();
            
            // Show a success message
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 0.5rem;"></i> Opening Email Client...';
            submitBtn.style.background = 'var(--success)';
            
            // Reset button after a few seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // ================================
    // Intersection Observer for Animations
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.value-card, .project-card, .category-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ================================
    // Enhanced Hover Effects
    // ================================
    const cards = document.querySelectorAll('.value-card, .project-card, .category-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ================================
    // Scroll to Top Button
    // ================================
    let scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.id = 'scrollToTop';
        scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-orange);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(242, 133, 0, 0.3);
        `;
        document.body.appendChild(scrollToTopBtn);
    }

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ================================
    // Loading Animation
    // ================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    console.log('Fretistan Ltd website loaded successfully! 🏗️');
});