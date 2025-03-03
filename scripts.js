// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal Functionality
const modal = document.getElementById('productModal');
const cards = document.querySelectorAll('.product-card');
const closeBtn = document.querySelector('.close-btn');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');

cards.forEach(card => {
    card.addEventListener('click', () => {
        modalName.textContent = card.getAttribute('data-name');
        modalPrice.textContent = card.getAttribute('data-price');
        modalDesc.textContent = card.getAttribute('data-desc');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Lock scroll
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Nav Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-container');
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Particle Effect
const particlesContainer = document.querySelector('.particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
    particlesContainer.appendChild(particle);
}

// Add dynamic styles for particles
const particleStyles = `
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00FFFF;
        border-radius: 50%;
        animation: floatParticle linear infinite;
        box-shadow: 0 0 5px #00FFFF;
    }
    @keyframes floatParticle {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        50% { transform: translateY(-20vh) scale(1.5); opacity: 0.5; }
        100% { transform: translateY(-40vh) scale(1); opacity: 0; }
    }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${particleStyles}</style>`);

// 3D Tilt Effect
VanillaTilt.init(document.querySelectorAll('.product-card'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
});

// Drop Timer
function updateTimers() {
    document.querySelectorAll('.timer').forEach(timer => {
        const deadline = new Date(timer.getAttribute('data-deadline')).getTime();
        const now = new Date().getTime();
        const distance = deadline - now;
        
        if (distance < 0) {
            timer.textContent = 'DROPPED';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    });
}
setInterval(updateTimers, 1000);
updateTimers();