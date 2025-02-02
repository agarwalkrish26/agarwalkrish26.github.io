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

// Image slider functionality
function setupImageSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const images = sliderContainer.querySelectorAll('img');
    let currentIndex = 0;
    
    // Clone first image and append to end for smooth infinite loop
    const firstImageClone = images[0].cloneNode(true);
    sliderContainer.appendChild(firstImageClone);
    
    const totalImages = images.length;
    
    function slideToNext() {
        currentIndex++;
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        sliderContainer.style.transition = 'transform 0.5s ease-in-out';
        
        if (currentIndex === totalImages) {
            setTimeout(() => {
                sliderContainer.style.transition = 'none';
                currentIndex = 0;
                sliderContainer.style.transform = 'translateX(0)';
            }, 500);
        }
    }
    
    // Auto scroll every 3 seconds
    setInterval(slideToNext, 3000);
}

// Call the function after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupImageSlider();
    // ... rest of your existing DOMContentLoaded code ...
});

// Initialize EmailJS
(function() {
    emailjs.init("02UrvtbLPtMKlI5Gd");
})();

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Prepare the template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message
            };
            
            // Send the email using EmailJS
            console.log('Form submitted, attempting to send email');
            emailjs.send('receive_email_portfolio', 'portfolio_contact_temp', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.error('Error sending email:', error);
                    alert('Oops! There was an error sending your message. Please try again later.');
                });
        });
    } else {
        console.error('Contact form not found in the DOM');
    }
});