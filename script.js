// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Detect basic Supabase session presence in localStorage
    function isLoggedIn() {
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i) || '';
                if (/^sb-.*-auth-token$/.test(k)) {
                    const v = localStorage.getItem(k);
                    if (v && v !== 'null' && v !== 'undefined') return true;
                }
            }
        } catch {}
        return false;
    }

    // Hide auth link if logged in
    const authLink = document.getElementById('authLink');
    if (authLink && isLoggedIn()) authLink.style.display = 'none';

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // Privilege Carousel
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const privilegeCards = document.querySelectorAll('.privilege-card');
    let currentIndex = 0;
    
    if (privilegeCards.length > 0) {
        function updateCarousel() {
            privilegeCards.forEach((card, index) => {
                card.classList.remove('active');
                if (index === currentIndex) {
                    card.classList.add('active');
                    
                    // Change background based on privilege color
                    const color = card.getAttribute('data-color');
                    document.body.className = '';
                    document.body.classList.add('privilege-' + color);
                }
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                currentIndex = (currentIndex - 1 + privilegeCards.length) % privilegeCards.length;
                updateCarousel();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                currentIndex = (currentIndex + 1) % privilegeCards.length;
                updateCarousel();
            });
        }
        
        // Initialize first card
        updateCarousel();
    }
    
    // Buy button (placeholder)
    const buyBtn = document.getElementById('buyBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Функция покупки будет добавлена позже');
        });
    }
    
    // Toggle features buttons
    const toggleBtns = document.querySelectorAll('.toggle-features-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const features = this.nextElementSibling;
            if (features.style.display === 'none') {
                features.style.display = 'block';
                this.textContent = 'Скрыть возможности';
            } else {
                features.style.display = 'none';
                this.textContent = 'Показать возмож��ости';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Create fireflies effect
function createFireflies() {
    const container = document.createElement('div');
    container.className = 'fireflies';
    document.body.appendChild(container);
    
    const fireflyCount = 30;
    
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() - 0.5) * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 10;
        const size = 2 + Math.random() * 2;
        
        firefly.style.left = startX + '%';
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';
        firefly.style.animationDuration = duration + 's';
        firefly.style.animationDelay = delay + 's';
        firefly.style.setProperty('--tx', endX + 'vw');
        
        container.appendChild(firefly);
    }
}

// Initialize fireflies on page load
document.addEventListener('DOMContentLoaded', createFireflies);

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.background = 'hsla(222, 47%, 11%, 0.95)';
        } else {
            nav.style.background = 'hsla(222, 47%, 11%, 0.9)';
        }
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add sparkle effect on button hover
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        createSparkles(this);
    });
});

function createSparkles(element) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.position = 'absolute';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = 'hsl(186, 100%, 41%)';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle-animation 0.6s ease-out forwards';
            
            const rect = element.getBoundingClientRect();
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 600);
        }, i * 100);
    }
}

// Add sparkle animation CSS
const sparkleCSS = `
@keyframes sparkle-animation {
    0% {
        opacity: 1;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
    }
}
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);
