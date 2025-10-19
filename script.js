// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe individual elements
    const animateElements = document.querySelectorAll('.skill-category, .project-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("xtQ5zLYAs9jD2W_ec");
})();

// Contact form handling with EmailJS
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Update button state
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // EmailJS parameters
    const templateParams = {
        user_name: name,
        user_email: email,
        message: message,
        to_email: 'nsadha92@gmail.com' // Your email address
    };
    
    // Send email using EmailJS
    emailjs.send('service_ewky8nq', 'bo07305', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Sorry, there was an error sending your message. Please try again or contact me directly at nsadha92@gmail.com');
        })
        .finally(function() {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
});

// Add smooth hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add typing effect to home subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.home-subtitle');
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 80);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('.home-section');
    const rate = scrolled * -0.5;
    
    if (homeSection) {
        homeSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #64FFDA !important;
    }
`;
document.head.appendChild(style);