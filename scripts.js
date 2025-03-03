// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-navigation');
    
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        
        // Accessibility
        const expanded = mainNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', expanded);
        
        // Toggle hamburger to X
        const spans = menuToggle.querySelectorAll('span');
        if (expanded) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (
        mainNav.classList.contains('active') && 
        !mainNav.contains(event.target) && 
        !menuToggle.contains(event.target)
      ) {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', false);
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70, // Adjust for header height
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
        }
      });
    });
    
    // Implement lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      const images = document.querySelectorAll('img.lazy');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const lazyLoadImages = function() {
        const lazyImages = document.querySelectorAll('img.lazy');
        const windowHeight = window.innerHeight;
        
        lazyImages.forEach(function(img) {
          const rect = img.getBoundingClientRect();
          
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });
        
        if (lazyImages.length === 0) {
          document.removeEventListener('scroll', lazyLoadThrottled);
          window.removeEventListener('resize', lazyLoadThrottled);
          window.removeEventListener('orientationchange', lazyLoadThrottled);
        }
      };
      
      // Throttle to improve performance
      const throttle = function(callback, limit) {
        let waiting = false;
        return function() {
          if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(function() {
              waiting = false;
            }, limit);
          }
        };
      };
      
      const lazyLoadThrottled = throttle(lazyLoadImages, 200);
      
      document.addEventListener('scroll', lazyLoadThrottled);
      window.addEventListener('resize', lazyLoadThrottled);
      window.addEventListener('orientationchange', lazyLoadThrottled);
    }
  });