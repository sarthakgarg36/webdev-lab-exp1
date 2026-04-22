// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('open');
});

// Smooth scroll + close menu on nav click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        navMenu.classList.remove('open');
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar border on scroll
window.addEventListener('scroll', function () {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.9)';
    }
});

// Form validation
const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        statusDiv.innerHTML = '⚠️ Please fill in all fields.';
        statusDiv.style.color = '#f87171';
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        statusDiv.innerHTML = '⚠️ Please enter a valid email address.';
        statusDiv.style.color = '#f87171';
        return;
    }

    statusDiv.innerHTML = '✅ Message sent successfully!';
    statusDiv.style.color = '#34d399';
    form.reset();

    setTimeout(() => { statusDiv.innerHTML = ''; }, 3000);
});