// Add this at the beginning of your script.js
document.addEventListener('DOMContentLoaded', () => {
    // Add 'loaded' class to body after a slight delay
    setTimeout(() => {
        document.body.classList.add('loaded');
        // Remove loader
        const loader = document.querySelector('.loader');
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000); // Adjust time as needed
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section');
const navLinks_ = document.querySelectorAll('.nav-links a');

const observerOptions = {
    threshold: 0.3 // Trigger when 30% of section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks_.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding nav link
            const activeId = entry.target.id;
            const correspondingLink = document.querySelector(`.nav-links a[href="#${activeId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => observer.observe(section));