// 1. Theme Toggle System
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// 2. Mobile Menu
const mobileBtn = document.getElementById('mobileBtn');
const navLinks = document.getElementById('navLinks');
mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// 3. Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollable) * 100;
    scrollProgress.style.width = `${scrolled}%`;
    checkBackToTop();
});

// 4. Back to Top Button
const backToTop = document.getElementById('backToTop');
function checkBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. Scroll Reveal Animations (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal, .reveal-right');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// 6. Animated Counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            const increment = target / 100;
            const updateCounter = () => {
                const current = +entry.target.innerText;
                if (current < target) {
                    entry.target.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    entry.target.innerText = target;
                }
            };
            updateCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 1.0 });
counters.forEach(counter => counterObserver.observe(counter));

// 7. Testimonial Carousel
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let index = 0;
const cards = track.children;

function updateCarousel() {
    const width = cards[0].clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;
}

nextBtn.addEventListener('click', () => {
    index++;
    if (index >= cards.length) index = 0;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) index = cards.length - 1;
    updateCarousel();
});

// Auto-play
setInterval(() => {
    index++;
    if (index >= cards.length) index = 0;
    updateCarousel();
}, 5000);

window.addEventListener('resize', updateCarousel);

// 8. FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// 9. Contact Form (Demo)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully! (This is a demo)');
    contactForm.reset();
});