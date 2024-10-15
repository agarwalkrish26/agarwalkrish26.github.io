function updateColorScheme() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - headerHeight;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            if (section.classList.contains('scheme-1')) {
                header.style.backgroundColor = 'white';
                header.style.color = 'rgb(0, 115, 206)';
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.style.color = 'rgb(0, 115, 206)';
                });
            } else if (section.classList.contains('scheme-2')) {
                header.style.backgroundColor = 'rgb(0, 115, 206)';
                header.style.color = 'white';
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.style.color = 'white';
                });
            }
        }
    });
}

window.addEventListener('load', function() {
    updateColorScheme();
    // Trigger scroll event to ensure correct scheme on load
    window.scrollBy(0, 1);
    window.scrollBy(0, -1);
});

window.addEventListener('scroll', updateColorScheme);

// Optional: Trigger updateColorScheme on hash change (when clicking nav links)
window.addEventListener('hashchange', function() {
    // Use setTimeout to allow the browser to jump to the section before updating
    setTimeout(updateColorScheme, 100);
});

// Toggle Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
});

// Handle Project Card Clicks for Touch Devices
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            card.classList.toggle('active');
        }
    });
});
