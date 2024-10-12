// Function to handle the color scheme based on scroll position
function updateColorScheme() {
    const header = document.querySelector('header');
    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');

    const homeSectionHeight = homeSection.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY < homeSectionHeight) {
        // When in the "blue_bg" (Home section)
        header.style.backgroundColor = 'white'; // Nav bar is white
        header.style.color = 'rgb(0, 115, 206)'; // Text in nav bar is rgb(0, 115, 206)
        homeSection.style.backgroundImage = "url('blue_bg.jpg')";
        aboutSection.style.backgroundImage = "none"; // Reset background for next section

        // Change link text color to rgb(0, 115, 206) in navigation
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.style.color = 'rgb(0, 115, 206)';
        });

        // Change text color in the home section
        document.querySelector('.hero-content h1').style.color = 'white'; // Outside nav bar: white text
        document.querySelector('.hero-content p').style.color = 'white';
    } else {
        // When in the "white_bg" (About section)
        header.style.backgroundColor = 'rgb(0, 115, 206)'; // Nav bar is rgb(0, 115, 206)
        header.style.color = 'white'; // Text in nav bar is white
        aboutSection.style.backgroundImage = "url('white_bg.jpg')";

        // Change link text color to white in navigation
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.style.color = 'white';
        });

        // Change text color in the about section (outside nav bar)
        document.querySelector('#about .hero-content h1').style.color = 'rgb(0, 115, 206)'; // Text outside nav bar is rgb(0, 115, 206)
        document.querySelector('#about .hero-content p').style.color = 'rgb(0, 115, 206)';
    }
}

// Apply color scheme on page load and ensure it's applied correctly based on scroll position
window.addEventListener('load', function() {
    // Apply the color scheme based on initial scroll position
    updateColorScheme();

    // Fix the initial state by forcing a scroll event
    window.scrollBy(0, 1);  // Scroll down 1px to trigger scroll event
    window.scrollBy(0, -1); // Scroll back up 1px
});

// Apply color scheme on scroll
window.addEventListener('scroll', updateColorScheme);
