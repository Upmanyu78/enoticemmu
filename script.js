// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle sticky header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const company = document.getElementById('company').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send this data to a server
        // For demonstration purposes, we'll just log it
        console.log({
            name,
            email,
            phone,
            company,
            message
        });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add responsive navigation for mobile devices
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        
        // Create mobile menu button if it doesn't exist yet
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.classList.add('mobile-menu-btn');
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            const nav = document.querySelector('nav');
            header.insertBefore(mobileBtn, nav);
            
            mobileBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.innerHTML = nav.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
        }
    };
    
    // Call on load and on resize
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            createMobileMenu();
        }
    });
    
    // Add animation to sections when they come into view
    const observeElements = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    observeElements.forEach(element => {
        observer.observe(element);
    });
});

// Additional CSS for animations and mobile menu
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    header.sticky {
        padding: 10px 5%;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
            position: absolute;
            top: 15px;
            right: 20px;
        }
        
        nav {
            width: 100%;
            height: 0;
            overflow: hidden;
            transition: height 0.3s ease;
        }
        
        nav.active {
            height: auto;
        }
        
        nav ul {
            flex-direction: column;
            width: 100%;
            padding-top: 15px;
        }
        
        nav ul li {
            margin: 10px 0;
            width: 100%;
            text-align: center;
        }
        
        .dropdown-content {
            position: static;
            box-shadow: none;
            display: none;
            width: 100%;
        }
        
        .dropdown:hover .dropdown-content {
            display: none;
        }
        
        .dropdown.active .dropdown-content {
            display: block;
        }
    }
`;
document.head.appendChild(style);