document.addEventListener('DOMContentLoaded', function() {
    initProductDetails();
});

function initProductDetails() {
    // Thumbnail image click handling
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
                const imageUrl = this.getAttribute('data-image');
                mainImage.src = imageUrl;
                mainImage.classList.add('fade');
                setTimeout(() => {
                    mainImage.classList.remove('fade');
                }, 300);
            });
        });
    }
    
    // Size selector handling
    const sizeOptions = document.querySelectorAll('.size-option:not(.sold-out)');
    
    if (sizeOptions.length) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    // Color selector handling
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.querySelector('.selected-color');
    
    if (colorOptions.length && selectedColorText) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                const colorName = this.getAttribute('data-color');
                selectedColorText.textContent = colorName;
            });
        });
    }
    
    // Quantity selector handling
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value);
            if (quantity < 10) {
                quantityInput.value = quantity + 1;
            }
        });
        
        quantityInput.addEventListener('change', function() {
            let quantity = parseInt(this.value);
            if (isNaN(quantity) || quantity < 1) {
                this.value = 1;
            } else if (quantity > 10) {
                this.value = 10;
            }
        });
    }

    // Add to Cart functionality
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const selectedSize = document.querySelector('.size-option.selected');
            const selectedColor = document.querySelector('.color-option.selected');
            const quantity = parseInt(quantityInput?.value) || 1;

            // Validation
            if (!selectedSize) {
                alert('Please select a size');
                return;
            }
            
            if (!selectedColor) {
                alert('Please select a color');
                return;
            }

            const productDetails = {
                size: selectedSize.textContent.trim(),
                color: selectedColor.getAttribute('data-color'),
                quantity: quantity,
                image: mainImage.src
            };

            // Here you would typically send this to a cart system
            console.log('Added to cart:', productDetails);
            
            // Optional: Show success feedback
            addToCartBtn.textContent = 'Added!';
            addToCartBtn.disabled = true;
            setTimeout(() => {
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.disabled = false;
            }, 2000);
        });
    }

    // Optional: Set default selections
    const firstAvailableSize = document.querySelector('.size-option:not(.sold-out)');
    const firstColor = document.querySelector('.color-option');
    const firstThumbnail = document.querySelector('.thumbnail');
    
    if (firstAvailableSize) firstAvailableSize.classList.add('selected');
    if (firstColor) {
        firstColor.classList.add('selected');
        selectedColorText.textContent = firstColor.getAttribute('data-color');
    }
    if (firstThumbnail) firstThumbnail.classList.add('active');
}