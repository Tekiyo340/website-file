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
            }/* === Basic Reset & Global Styles === */
:root {
        --primary - color: #007bff;
        --primary - dark: #0056b3;
        --secondary - color: #6c757d;
        --light - color: #f8f9fa;
        --dark - color: #343a40;
        --text - color: #495057;
        --heading - color: #212529;
        --white - color: #ffffff;
        --border - color: #dee2e6;
        --gradient - start: #007bff;
        --gradient - mid: #00c6ff;
        --gradient - accent1: #ee7752;
        --gradient - accent2: #e73c7e;
        --shadow - light: rgba(0, 0, 0, 0.1);
        --shadow - dark: rgba(0, 0, 0, 0.15);
        --nav - height: 70px;
    }

* {
        margin: 0;
        padding: 0;
        box- sizing: border - box;
}

html {
    scroll- behavior: smooth;
scroll - padding - top: var(--nav - height);
    /* Match nav height */
}

body {
    font - family: 'Poppins', sans - serif;
    line - height: 1.7;
    color: var(--text - color);
    background - color: var(--white - color);
    overflow - x: hidden;
    /* Prevent horizontal scroll */
}

h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    font - weight: 700;
    /* Bolder headings */
    color: var(--heading - color);
    line - height: 1.3;
    margin - bottom: 1rem;
}

h1 {
    font - size: clamp(2.5rem, 6vw, 4rem);
}

h2 {
    font - size: clamp(2rem, 5vw, 2.8rem);
    text - align: center;
    margin - bottom: 1.5rem;
}

h3 {
    font - size: clamp(1.3rem, 4vw, 1.6rem);
    margin - bottom: 0.8rem;
}

h4 {
    font - size: clamp(1.1rem, 3vw, 1.2rem);
    margin - bottom: 0.7rem;
    font - weight: 600;
}

p {
    margin - bottom: 1rem;
}

a {
    text - decoration: none;
    color: var(--primary - color);
    transition: color 0.3s ease;
}

a:hover {
    color: var(--primary - dark);
}

ul {
    list - style: none;
}

img {
    max - width: 100 %;
    height: auto;
    display: block;
}

.container {
    /* General purpose container if needed */
    max - width: 1140px;
    margin: 0 auto;
    padding: 0 20px;
}

.content - section {
    padding: 80px 20px;
    max - width: 1200px;
    /* Slightly wider */
    margin: 0 auto;
}

.alt - bg {
    background - color: var(--light - color);
}

.section - underline {
    width: 80px;
    height: 4px;
    background: linear - gradient(90deg, var(--primary - color), var(--gradient - mid));
    margin: -10px auto 40px auto;
    /* Pull up slightly */
    border - radius: 2px;
}

.btn {
    display: inline - block;
    padding: 12px 30px;
    border - radius: 50px;
    font - weight: 600;
    font - size: 1rem;
    cursor: pointer;
    text - align: center;
    transition: all 0.3s ease;
    border: none;
    box - shadow: 0 5px 15px var(--shadow - light);
    text - transform: uppercase;
    letter - spacing: 0.5px;
}

.btn - primary {
    background: linear - gradient(45deg, var(--primary - color), var(--primary - dark));
    color: var(--white - color);
}

.btn - primary:hover {
    transform: translateY(-3px) scale(1.03);
    box - shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
}

.btn - submit {
    background: linear - gradient(45deg, #28a745, #218838);
    color: var(--white - color);
    width: 100 %;
    margin - top: 15px;
    padding: 15px 30px;
    /* Larger padding */
}

.btn - submit:hover {
    transform: translateY(-3px);
    box - shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
}

.btn - submit i {
    margin - left: 8px;
}


/* === Header === */
header {
    position: relative;
    height: 100vh;
    min - height: 600px;
    /* Ensure minimum height */
    color: var(--white - color);
    overflow: hidden;
    display: flex;
    /* Use flex for alignment */
    align - items: center;
    justify - content: center;
}

.animated - gradient - header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100 %;
    height: 100 %;
    z - index: -2;
    /* Behind everything */
    background: linear - gradient(-45deg, var(--gradient - start), var(--gradient - mid), var(--gradient - accent1), var(--gradient - accent2));
    background - size: 400 % 400 %;
    animation: gradientBG 20s ease infinite;
}

/* Add a subtle overlay */
header::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100 %;
    height: 100 %;
    background: rgba(0, 0, 0, 0.3);
    /* Darken the gradient slightly */
    z - index: -1;
}


@keyframes gradientBG {
    0 % {
        background- position: 0 % 50 %;
}

50 % {
    background- position: 100 % 50 %;
    }

100 % {
    background- position: 0 % 50 %;
    }
}

.header - content - wrapper {
    display: flex;
    align - items: center;
    justify - content: space - around;
    /* Space out text and image */
    max - width: 1200px;
    width: 90 %;
    padding: 20px;
    z - index: 1;
    flex - wrap: wrap;
    /* Allow wrapping on smaller screens */
    gap: 30px;
}

.header - text {
    flex - basis: 55 %;
    /* Give text slightly more space */
    min - width: 300px;
    /* Minimum width */
    text - align: left;
}

.header - text h1 {
    text - shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
}

.header - text p {
    font - size: clamp(1.1rem, 3vw, 1.6rem);
    margin - bottom: 2.5rem;
    font - weight: 300;
    text - shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
    color: #eee;
    max - width: 500px;
    /* Limit width */
}

.header - image {
    flex - basis: 35 %;
    /* Space for image */
    min - width: 250px;
    /* Minimum width */
    display: flex;
    justify - content: center;
    align - items: center;
}

.profile - image {
    width: clamp(200px, 30vw, 350px);
    /* Responsive size */
    height: clamp(200px, 30vw, 350px);
    border - radius: 50 %;
    object - fit: cover;
    border: 5px solid rgba(255, 255, 255, 0.8);
    box - shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.scroll - down - link {
    position: absolute;
    bottom: 30px;
    left: 50 %;
    transform: translateX(-50 %);
    color: rgba(255, 255, 255, 0.7);
    font - size: 1.8rem;
    animation: bounce 2s infinite;
    z - index: 5;
}

.scroll - down - link:hover {
    color: var(--white - color);
}

@keyframes bounce {

    0 %,
        20 %,
        50 %,
        80 %,
        100 % {
            transform: translateX(-50 %) translateY(0);
        }

    40 % {
        transform: translateX(-50 %) translateY(- 10px);
}

60 % {
    transform: translateX(-50 %) translateY(- 5px);
    }
}


/* === Navigation === */
#navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100 %;
    height: var(--nav - height);
    background: rgba(255, 255, 255, 0.85);
    backdrop - filter: blur(12px);
    z - index: 1000;
    box - shadow: 0 3px 12px var(--shadow - light);
    transition: top 0.4s ease -in -out, background - color 0.3s ease;
}

#navbar.nav - scrolled {
    background: rgba(255, 255, 255, 0.95);
    /* More opaque on scroll */
    box - shadow: 0 5px 15px var(--shadow - dark);
}

#navbar.nav - hidden {
    top: calc(-1 * var(--nav - height));
    /* Hide navbar */
}

.nav - container {
    max - width: 1200px;
    height: 100 %;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify - content: space - between;
    align - items: center;
    position: relative;
    /* Needed for absolute positioning of mobile menu */
}

.logo {
    color: var(--primary - color);
    font - size: 2rem;
    font - weight: 700;
    transition: transform 0.3s ease;
}

.logo:hover {
    transform: scale(1.05);
}

.nav - links {
    display: flex;
    align - items: center;
}

.nav - link {
    /* Common style for all nav links */
    color: var(--dark - color);
    font - weight: 600;
    padding: 8px 12px;
    margin: 0 5px;
    /* Reduced margin */
    position: relative;
    transition: color 0.3s ease;
}

.nav - links > li {
    margin - left: 10px;
}

/* Adjust spacing between main items */

.nav - link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50 %;
    transform: translateX(-50 %);
    width: 0;
    height: 2px;
    background - color: var(--primary - color);
    transition: width 0.3s ease;
}

.nav - link: hover,
.nav - link.active {
    color: var(--primary - color);
}

.nav - link: hover:: after,
.nav - link.active::after {
    width: 70 %;
    /* Underline doesn't touch edges */
}

.auth - links - desktop {
    display: flex;
    align - items: center;
    margin - left: 15px;
}

.auth - links - mobile {
    display: none;
}

/* Hide mobile auth links initially */

.auth - link {
    margin - left: 10px;
    padding: 7px 18px;
    border: 1.5px solid var(--primary - color);
    border - radius: 20px;
    color: var(--primary - color);
    font - size: 0.9rem;
}

.auth - link.register - btn {
    background - color: var(--primary - color);
    color: var(--white - color);
}

.auth - link:hover {
    background - color: var(--primary - dark);
    border - color: var(--primary - dark);
    color: var(--white - color)!important;
    /* Override specific hover */
}

.auth - link: hover::after {
    display: none;
}

/* No underline for buttons */

/* --- Animated Hamburger Menu --- */
.menu - toggle {
    display: none;
    /* Hidden on desktop */
    flex - direction: column;
    justify - content: space - around;
    width: 30px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z - index: 1001;
    /* Above nav links */
}

.bar {
    display: block;
    width: 100 %;
    height: 3px;
    background - color: var(--dark - color);
    border - radius: 2px;
    transition: all 0.3s ease -in -out;
}

/* Hamburger Animation */
.menu - toggle.active.bar: nth - child(1) {
    transform: translateY(8.5px) rotate(45deg);
}

.menu - toggle.active.bar: nth - child(2) {
    opacity: 0;
}

.menu - toggle.active.bar: nth - child(3) {
    transform: translateY(-8.5px) rotate(-45deg);
}

/* === About Section === */
.about - content {
    display: flex;
    flex - wrap: wrap;
    gap: 40px;
    align - items: center;
}

.about - image {
    flex: 1 1 300px;
    /* Flex basis */
    text - align: center;
    /* Center image if it's smaller */
}

.about - image img {
    border - radius: 10px;
    box - shadow: 0 8px 25px var(--shadow - light);
    max - width: 400px;
    /* Max width for about image */
    margin: 0 auto;
    /* Center if container is wider */
}

.about - text {
    flex: 1 1 500px;
    /* Allow text to take more space */
}

.about - stats {
    margin - top: 30px;
    display: flex;
    gap: 30px;
    flex - wrap: wrap;
}

.about - stats div {
    text - align: center;
    background: var(--light - color);
    padding: 15px 20px;
    border - radius: 8px;
    box - shadow: 0 4px 10px var(--shadow - light);
    min - width: 120px;
}

.about - stats span {
    display: block;
    font - size: 1.8rem;
    font - weight: 700;
    color: var(--primary - color);
    margin - bottom: 5px;
}


/* === Services Section === */
.services - grid {
    display: grid;
    grid - template - columns: repeat(auto - fit, minmax(260px, 1fr));
    gap: 30px;
    margin - top: 40px;
}

.service - card {
    background: var(--white - color);
    padding: 40px 30px;
    text - align: center;
    border - radius: 10px;
    box - shadow: 0 6px 20px var(--shadow - light);
    transition: transform 0.3s ease, box - shadow 0.3s ease;
    border - top: 4px solid var(--primary - color);
    /* Accent border */
}

.service - card:hover {
    transform: translateY(-10px);
    box - shadow: 0 12px 30px var(--shadow - dark);
}

.service - icon {
    color: var(--primary - color);
    margin - bottom: 25px;
    transition: transform 0.3s ease;
}

.service - card: hover.service - icon {
    transform: scale(1.1);
}


/* === Skills Section === */
.skills - container {
    display: flex;
    flex - direction: column;
    gap: 30px;
    margin - top: 30px;
}

.skill - category {
    background: var(--white - color);
    /* Can be alt-bg if section isn't */
    padding: 25px;
    border - radius: 8px;
    box - shadow: 0 5px 15px var(--shadow - light);
}

.skill - category h4 {
    color: var(--primary - dark);
    margin - bottom: 15px;
    padding - bottom: 8px;
    border - bottom: 2px solid var(--border - color);
    display: inline - block;
    /* Fit border to text */
}

.skills - list {
    display: flex;
    flex - wrap: wrap;
    gap: 12px;
}

.skills - list span {
    background - color: #e9ecef;
    /* Lighter grey */
    color: var(--secondary - color);
    padding: 8px 18px;
    border - radius: 20px;
    font - weight: 500;
    /* Medium weight */
    font - size: 0.9rem;
    transition: all 0.3s ease;
}

.skills - list span:hover {
    background - color: var(--primary - color);
    color: var(--white - color);
    transform: scale(1.05);
}


/* === Testimonials Section === */
.testimonial - grid {
    display: grid;
    grid - template - columns: repeat(auto - fit, minmax(320px, 1fr));
    gap: 30px;
    margin - top: 40px;
}

.testimonial - card {
    background: var(--white - color);
    padding: 30px;
    border - radius: 10px;
    box - shadow: 0 8px 25px var(--shadow - light);
    display: flex;
    /* Align image and text */
    gap: 20px;
    align - items: flex - start;
    /* Align items to the top */
    position: relative;
    overflow: hidden;
    /* For pseudo-elements */
}

.testimonial - card::before {
    /* Subtle quote background */
    content: '\f10d';
    /* Font Awesome quote-left */
    font - family: 'Font Awesome 6 Free';
    font - weight: 900;
    position: absolute;
    top: 10px;
    right: 15px;
    font - size: 4rem;
    color: var(--primary - color);
    opacity: 0.08;
    z - index: 0;
}


.testimonial - image - frame {
    flex - shrink: 0;
    /* Prevent image from shrinking */
    width: 80px;
    height: 80px;
    border - radius: 50 %;
    overflow: hidden;
    /* Clip image to circle */
    border: 3px solid var(--primary - color);
    box - shadow: 0 4px 10px var(--shadow - light);
}

.testimonial - image - frame img {
    width: 100 %;
    height: 100 %;
    object - fit: cover;
}

.testimonial - content {
    position: relative;
    /* For z-index if needed */
    z - index: 1;
}

.testimonial - content blockquote p {
    font - style: italic;
    margin - bottom: 15px;
    color: #555;
    font - size: 1.05rem;
    /* Slightly larger quote text */
    line - height: 1.6;
}

.testimonial - content cite {
    display: block;
    margin - top: 10px;
    font - weight: 600;
    color: var(--heading - color);
    font - style: normal;
}

.testimonial - content cite strong {
    display: block;
    font - size: 1.1rem;
    color: var(--primary - dark);
}

/* === Contact Form === */
.contact - intro {
    text - align: center;
    max - width: 650px;
    margin: -10px auto 40px auto;
    /* Pull up slightly */
    font - size: 1.1rem;
}

.contact - form {
    max - width: 750px;
    margin: 30px auto 0 auto;
    background: var(--white - color);
    padding: 40px;
    border - radius: 10px;
    box - shadow: 0 10px 30px var(--shadow - light);
}

.form - group {
    margin - bottom: 25px;
    position: relative;
    /* For icon positioning */
}

.form - group input,
.form - group textarea {
    width: 100 %;
    padding: 15px 15px 15px 45px;
    /* Add left padding for icon */
    border: 1px solid var(--border - color);
    border - radius: 8px;
    font - size: 1rem;
    font - family: inherit;
    background - color: var(--light - color);
    transition: border - color 0.3s ease, box - shadow 0.3s ease;
    color: var(--text - color);
}

.form - group input:: placeholder,
.form - group textarea::placeholder {
    color: #999;
}

.form - group input: focus,
.form - group textarea:focus {
    outline: none;
    border - color: var(--primary - color);
    background - color: var(--white - color);
    box - shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

.form - group textarea {
    resize: vertical;
    min - height: 140px;
    padding - top: 15px;
    /* Adjust padding for textarea */
    padding - left: 45px;
}

.form - icon {
    position: absolute;
    left: 15px;
    top: 50 %;
    transform: translateY(-50 %);
    color: var(--secondary - color);
    transition: color 0.3s ease;
}

.form - group input: focus +.form - icon,
.form - group textarea: focus +.form - icon {
    color: var(--primary - color);
}

.textarea - icon {
    top: 20px;
    /* Adjust icon position for textarea */
    transform: translateY(0);
}


/* === Footer === */
footer {
    background - color: var(--dark - color);
    color: #adb5bd;
    /* Lighter grey */
    padding: 70px 20px 30px 20px;
    margin - top: 60px;
}

.footer - container {
    max - width: 1200px;
    margin: 0 auto;
}

.footer - grid {
    display: grid;
    grid - template - columns: repeat(auto - fit, minmax(220px, 1fr));
    /* Responsive columns */
    gap: 40px 30px;
    /* Row gap, Column gap */
    margin - bottom: 40px;
}

.footer - col h4 {
    color: var(--white - color);
    margin - bottom: 25px;
    font - size: 1.2rem;
    position: relative;
    padding - bottom: 10px;
}

.footer - col h4::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background - color: var(--primary - color);
}

.footer - col p {
    font - size: 0.95rem;
    margin - bottom: 15px;
    /* Spacing for contact info */
    line - height: 1.6;
}

.footer - col p i {
    /* Icons in contact info */
    margin - right: 8px;
    color: var(--primary - color);
    width: 15px;
    /* Align icons */
    text - align: center;
}


.footer - col a {
    color: #adb5bd;
    display: block;
    margin - bottom: 12px;
    font - size: 0.95rem;
    transition: color 0.3s ease, padding - left 0.3s ease;
}

.footer - col a:hover {
    color: var(--white - color);
    padding - left: 8px;
}

.social - icons {
    margin - top: 20px;
}

.social - icons a {
    color: #adb5bd;
    font - size: 1.4rem;
    margin - right: 15px;
    transition: color 0.3s ease, transform 0.3s ease;
    display: inline - block;
    /* Allow transform */
}

.social - icons a:hover {
    color: var(--primary - color);
    transform: scale(1.1);
}

/* Remove default link styling from social icons */
.footer - col.social - icons a:hover {
    padding - left: 0;
}


.btn - footer - contact {
    background: var(--primary - color);
    color: var(--white - color);
    font - size: 0.9rem;
    padding: 8px 18px;
    margin - top: 10px;
}

.btn - footer - contact:hover {
    background: var(--primary - dark);
    box - shadow: none;
    transform: none;
}


.footer - bottom {
    text - align: center;
    padding - top: 30px;
    border - top: 1px solid #495057;
    /* Darker border */
    color: #adb5bd;
    font - size: 0.9rem;
}

.footer - bottom i {
    transition: color 0.3s ease;
}

.footer - bottom:hover i {
    color: var(--gradient - accent2);
}

/* Heart color change on hover */


/* === Responsive Design === */
@media(max - width: 992px) {
    .header - content - wrapper {
        flex - direction: column;
        text - align: center;
    }

    .header - text {
        text - align: center;
        flex - basis: auto;
    }

    .header - image {
        flex - basis: auto;
        margin - top: 30px;
    }

    .profile - image {
        width: clamp(180px, 40vw, 280px);
        height: clamp(180px, 40vw, 280px);
    }

    .about - content {
        flex - direction: column;
    }

    .about - image {
        order: 1;
    }

    /* Image below text on mobile */
    .about - text {
        order: 2;
        text - align: center;
    }

    .about - stats {
        justify - content: center;
    }

    .nav - links {
        /* Mobile Menu Styling */
        display: flex;
        /* Keep as flex for centering */
        flex - direction: column;
        justify - content: center;
        /* Center items vertically */
        align - items: center;
        /* Center items horizontally */
        position: fixed;
        top: 0;
        right: -100 %;
        /* Start off-screen */
        width: 80 %;
        /* Partial width */
        max - width: 350px;
        /* Max width */
        height: 100vh;
        background: var(--white - color);
        box - shadow: -5px 0 15px var(--shadow - dark);
        transition: right 0.4s ease -in -out;
        padding - top: var(--nav - height);
        /* Space for fixed nav */
        z - index: 1000;
        /* Below toggle */
    }

    .nav - links.active {
        right: 0;
        /* Slide in */
    }

    /* Overlay for when menu is open */
    body.menu - open::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100 %;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z - index: 999;
        /* Below menu, above content */
        opacity: 1;
        transition: opacity 0.4s ease;
    }

    body: not(.menu - open)::before {
        opacity: 0;
        pointer - events: none;
    }


    .nav - links > li {
        margin: 15px 0;
        width: 100 %;
        text - align: center;
    }

    .nav - link {
        font - size: 1.3rem;
        padding: 10px 0;
        width: 80 %;
        display: block;
        /* Full width */
        margin: 0 auto;
        /* Center link text */
    }

    .nav - link::after {
        display: none;
    }

    /* No underline on mobile */
    .nav - link: hover,
    .nav - link.active {
        background: var(--light - color);
        color: var(--primary - color);
        border - radius: 5px;
    }

    .menu - toggle {
        display: flex;
    }

    /* Show hamburger */

    .auth - links - desktop {
        display: none;
    }

    /* Hide desktop auth */
    .auth - links - mobile {
        display: flex;
        flex - direction: column;
        /* Stack buttons */
        align - items: center;
        margin - top: 30px;
        width: 80 %;
    }

    .auth - links - mobile.auth - link {
        margin: 8px 0;
        width: 100 %;
        /* Full width button */
        text - align: center;
        font - size: 1.1rem;
        padding: 10px 20px;
    }

    .footer - grid {
        grid - template - columns: repeat(auto - fit, minmax(250px, 1fr));
    }
}


@media(max - width: 576px) {
    header {
        height: auto;
        min - height: 90vh;
        padding - top: var(--nav - height);
        padding - bottom: 60px;
    }

    /* Adjust header height */
    .header - content - wrapper {
        width: 95 %;
        gap: 20px;
    }

    .header - text h1 {
        font - size: 2.2rem;
    }

    .header - text p {
        font - size: 1.1rem;
        margin - bottom: 1.5rem;
    }

    .profile - image {
        width: 150px;
        height: 150px;
        border - width: 4px;
    }

    h2 {
        font - size: 1.8rem;
    }

    .content - section {
        padding: 60px 15px;
    }

    .btn {
        padding: 10px 25px;
        font - size: 0.9rem;
    }

    .services - grid,
    .testimonial - grid {
        grid - template - columns: 1fr;
    }

    /* Stack cards */
    .testimonial - card {
        flex - direction: column;
        align - items: center;
        text - align: center;
    }

    .testimonial - image - frame {
        margin - bottom: 15px;
    }

    .contact - form {
        padding: 30px 20px;
    }

    .form - group input,
    .form - group textarea {
        padding: 12px 12px 12px 40px;
    }

    /* Adjust padding */
    .form - icon {
        left: 12px;
    }

    .textarea - icon {
        top: 15px;
    }

    .footer - grid {
        grid - template - columns: 1fr;
        gap: 30px;
    }

    /* Single column footer */
    .footer - col {
        text - align: center;
    }

    .footer - col h4::after {
        left: 50 %;
        transform: translateX(-50 %);
    }

    .footer - col.social - icons {
        text - align: center;
    }

    .footer - col a:hover {
        padding - left: 0;
    }
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