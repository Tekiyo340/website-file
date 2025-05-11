document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize AOS ---
    AOS.init({
        duration: 800,      // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true,         // whether animation should happen only once - while scrolling down
        mirror: false,      // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding window should trigger the animation
    });


    // --- Mobile Navigation Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const navLinkItems = document.querySelectorAll('.nav-link'); // Get all including auth for closing

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open'); // Toggle body class for overlay/scroll lock

            // Toggle aria-expanded attribute
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);

            // Lock/unlock body scroll
            if (body.classList.contains('menu-open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close mobile menu when a link is clicked
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.classList.remove('menu-open');
                    body.style.overflow = ''; // Ensure scroll is restored
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close menu if clicking outside of it (on the overlay)
        body.addEventListener('click', (event) => {
            if (body.classList.contains('menu-open') &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)) {

                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

    }


    // --- Sticky Navbar & Hide on Scroll Down ---
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    if (navbar) {
        const navHeight = navbar.offsetHeight;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add scrolled class for background change
            if (scrollTop > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }

            // Hide/show navbar logic
            if (scrollTop > lastScrollTop && scrollTop > navHeight * 2) { // Only hide if scrolled down a bit
                // Scroll Down
                navbar.classList.add('nav-hidden');
            } else {
                // Scroll Up or near top
                if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) { // Don't reveal if at bottom
                    navbar.classList.remove('nav-hidden');
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }, { passive: true }); // Improve scroll performance
    }


    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section[id], header[id]'); // Include header#home
    const navLinksHighlight = document.querySelectorAll('.nav-links .nav-link'); // Only target main links for highlight

    const activateNavLink = (link) => {
        navLinksHighlight.forEach(lnk => lnk.classList.remove('active'));
        if (link) {
            link.classList.add('active');
        }
    };

    const onScroll = () => {
        let currentSection = null;
        const scrollY = window.pageYOffset;
        const navOffset = navbar ? navbar.offsetHeight : 70; // Offset for fixed nav

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navOffset - 50; // Adjust trigger point
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        // If near the bottom, force highlight the last section (contact)
        if (window.innerHeight + scrollY >= document.body.offsetHeight - 100) {
            currentSection = sections[sections.length - 1].getAttribute('id');
        }

        // Find the corresponding link
        let activeLink = null;
        navLinksHighlight.forEach(link => {
            if (link.getAttribute('href') === `#${currentSection}`) {
                activeLink = link;
            }
        });

        activateNavLink(activeLink);
    };

    window.addEventListener('scroll', onScroll);
    // Initial check in case the page loads scrolled
    onScroll();


    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded