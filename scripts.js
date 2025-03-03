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
    card.addEventListener('click', () => {
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