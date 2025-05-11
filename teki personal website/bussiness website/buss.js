document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle (Basic Example) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-header nav'); // Assuming your nav is a direct child or select appropriately

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            siteNav.style.display = siteNav.style.display === 'flex' ? 'none' : 'flex';
            // For a proper mobile menu, you'd toggle a class and style it to be a vertical dropdown
            // e.g., siteNav.classList.toggle('mobile-active');
            // And in CSS: .site-header nav.mobile-active { display: flex; flex-direction: column; ... }
            alert("Mobile menu toggle clicked. Implement full style in CSS for '.mobile-active' class.");
        });
    }


    // --- Featured Offers Slider ---
    const offersContainer = document.getElementById('offersContainer');
    const prevButton = document.getElementById('prevOffer');
    const nextButton = document.getElementById('nextOffer');

    // --- "Backend" Data Simulation ---
    // In a real app, this would be fetched via API: fetch('/api/offers').then(res => res.json()).then(data => {...})
    const featuredOffersData = [
        {
            id: 1,
            title: "Unlimited Data Pack",
            description: "Stream, browse, and game without limits. Valid for 30 days.",
            price: "ETB 799",
            link: "#offer1"
        },
        {
            id: 2,
            title: "Mega Voice Bundle",
            description: "Get 1000 minutes to all networks. Perfect for long talks.",
            price: "ETB 249",
            link: "#offer2"
        },
        {
            id: 3,
            title: "Student Special",
            description: "Exclusive data and SMS pack for students. ID required.",
            price: "ETB 199",
            link: "#offer3"
        },
        {
            id: 4,
            title: "Telebirr Bonus",
            description: "Recharge via Telebirr and get 20% bonus airtime instantly.",
            price: "Bonus Offer",
            link: "#offer4"
        },
        {
            id: 5,
            title: "Weekend Data Blast",
            description: "Enjoy 5GB data every weekend. Auto-renews.",
            price: "ETB 99/week",
            link: "#offer5"
        }
    ];

    function renderOffers() {
        if (!offersContainer) return;
        offersContainer.innerHTML = ''; // Clear existing
        featuredOffersData.forEach(offer => {
            const card = document.createElement('div');
            card.classList.add('offer-card');
            card.innerHTML = `
                <h3>${offer.title}</h3>
                <p>${offer.description}</p>
                <p class="price">${offer.price}</p>
                <a href="${offer.link}" class="details-link">Learn More <i data-feather="arrow-right-circle" style="width:1em; vertical-align: middle;"></i></a>
            `;
            offersContainer.appendChild(card);
        });
        feather.replace(); // Re-initialize Feather Icons if new ones are added
    }

    renderOffers(); // Initial render

    // Slider Logic
    let currentIndex = 0;
    const cardWidth = () => {
        const firstCard = offersContainer.querySelector('.offer-card');
        return firstCard ? firstCard.offsetWidth + 20 : 270; // card width + margin (2*10px)
    };

    const cardsInView = () => {
        if (!offersContainer) return 1;
        const containerWidth = offersContainer.parentElement.offsetWidth;
        return Math.max(1, Math.floor(containerWidth / cardWidth()));
    };

    function slideOffers(direction) {
        if (!offersContainer) return;
        const totalCards = featuredOffersData.length;
        const maxIndex = Math.max(0, totalCards - cardsInView());

        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = 0; // Or loop: maxIndex;
        } else if (currentIndex > maxIndex) {
            currentIndex = maxIndex; // Or loop: 0;
        }

        const offset = -currentIndex * cardWidth();
        offersContainer.style.transform = `translateX(${offset}px)`;
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => slideOffers(-1));
        nextButton.addEventListener('click', () => slideOffers(1));
    }

    // Adjust slider on window resize
    window.addEventListener('resize', () => {
        // Recalculate and apply current slide position, 
        // as cardWidth and cardsInView might change
        slideOffers(0); // Re-apply current index without changing it
    });

});