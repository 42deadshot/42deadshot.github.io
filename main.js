/* ---------------------- Hamburger Menu Slide-Down ---------------------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if(hamburger && navMenu){
    // Initialize menu state
    navMenu.style.maxHeight = '0';
    navMenu.style.opacity = '0';
    navMenu.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
    navMenu.classList.remove('show');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if(navMenu.classList.contains('show')){
            navMenu.classList.remove('show');
            navMenu.style.maxHeight = '0';
            navMenu.style.opacity = '0';
        } else {
            navMenu.classList.add('show');
            navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
            navMenu.style.opacity = '1';
        }
    });

    // Close menu when nav link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768){
                hamburger.classList.remove('active');
                navMenu.classList.remove('show');
                navMenu.style.maxHeight = '0';
                navMenu.style.opacity = '0';
            }
        });
    });

    // Reset on resize
    window.addEventListener('resize', () => {
        if(window.innerWidth > 768){
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
            navMenu.style.maxHeight = 'none';
            navMenu.style.opacity = '1';
        } else {
            navMenu.style.maxHeight = '0';
            navMenu.style.opacity = '0';
        }
    });
}
