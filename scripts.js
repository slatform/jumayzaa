// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
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
    card.addEventListener('click', (e) => {
        if (e.target.closest('.icon-container')) return;
        modalName.textContent = card.getAttribute('data-name');
        modalPrice.textContent = card.getAttribute('data-price');
        modalDesc.textContent = card.getAttribute('data-desc');
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Interactive 3D Icons
const icons = document.querySelectorAll('.hoodie-icon, .sweatpants-icon');
icons.forEach(icon => {
    let isDragging = false;
    let startX, startY, rotateX = 0, rotateY = 0, posX = 0, posY = 0;

    // Mouse Events
    icon.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        icon.style.animation = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        rotateY += deltaX * 0.3;
        rotateX -= deltaY * 0.3;
        posX += deltaX * 0.1;
        posY += deltaY * 0.1;
        icon.style.transform = `translate(${posX}px, ${posY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            icon.style.animation = 'float 5s infinite ease-in-out';
        }
    });

    // Touch Events
    icon.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        icon.style.animation = 'none';
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        rotateY += deltaX * 0.3;
        rotateX -= deltaY * 0.3;
        posX += deltaX * 0.1;
        posY += deltaY * 0.1;
        icon.style.transform = `translate(${posX}px, ${posY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        startX = touch.clientX;
        startY = touch.clientY;
    });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            icon.style.animation = 'float 5s infinite ease-in-out';
        }
    });
});