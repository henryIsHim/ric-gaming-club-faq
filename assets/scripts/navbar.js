// Modern Navbar JavaScript for Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarCenter = document.querySelector('.navbar-center');
    
    if (navbarToggle && navbarCenter) {
        navbarToggle.addEventListener('click', function() {
            navbarCenter.classList.toggle('active');
            
            // Animate hamburger menu
            navbarToggle.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navbarCenter.classList.contains('active');
            navbarToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking on links
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCenter.classList.remove('active');
                navbarToggle.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navbar = document.querySelector('.navbar');
            if (!navbar.contains(event.target)) {
                navbarCenter.classList.remove('active');
                navbarToggle.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});