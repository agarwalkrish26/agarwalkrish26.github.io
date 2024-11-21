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
const navLinks = document.getElementById('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            card.classList.toggle('active');
            const front = card.querySelector('.project-front');
            const back = card.querySelector('.project-back');
            if (card.classList.contains('active')) {
                front.style.transform = 'rotateY(-180deg)';
                back.style.transform = 'rotateY(0)';
            } else {
                front.style.transform = 'rotateY(0)';
                back.style.transform = 'rotateY(180deg)';
            }
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("02UrvtbLPtMKlI5Gd"); // Replace with your actual EmailJS user ID
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