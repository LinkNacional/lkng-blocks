(function() {
    'use strict';

    // Initialize the YouTube Shorts Gallery when DOM is loaded
    function initYouTubeShortsGalleries() {
        // Check if Swiper is available
        if (typeof Swiper === 'undefined') {
            console.error('Swiper library not loaded');
            return;
        }

        const galleries = document.querySelectorAll('.lkng-youtube-shorts-gallery');
        
        galleries.forEach(function(gallery) {
            // Skip if already initialized
            if (gallery.classList.contains('swiper-initialized')) {
                return;
            }

            const container = gallery.querySelector('.swiper-container');
            if (!container) {
                return;
            }

            // Get configuration from data attributes
            const autoPlay = gallery.getAttribute('data-autoplay') === 'true';
            const loop = gallery.getAttribute('data-loop') === 'true';
            const slidesPerView = parseInt(gallery.getAttribute('data-slides-per-view')) || 1;
// Set CSS custom property for dynamic styling
            gallery.style.setProperty('--slides-per-view', slidesPerView);

            // Calculate initial slide to start from center
            const totalSlides = container.querySelectorAll('.swiper-slide').length;
            const initialSlide = Math.floor(totalSlides / 2);

            // Initialize Swiper
            const swiper = new Swiper(container, {
                // Basic settings
                direction: 'horizontal',
                loop: loop,
                centeredSlides: true,
                slidesPerView: 'auto',
                spaceBetween: 10,
                initialSlide: initialSlide,
                freeMode: false,
                // loopAdditionalSlides: slidesPerView * 2,
                // watchSlidesProgress: true,
                // preloadImages: true,
                // lazy: true,
                
                // Autoplay configuration - disabled by default
                autoplay: false,

                // Pagination - disabled
                pagination: false,

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // Responsive breakpoints
                breakpoints: {
                    640: {
                        slidesPerView: 'auto',
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 'auto',
                        spaceBetween: 15,
                    },
                },

                // Additional options for smooth experience
                speed: 600,
                watchOverflow: true,
                grabCursor: true,
                
                // Keyboard control
                keyboard: {
                    enabled: true,
                },

                // Mouse wheel control
                mousewheel: {
                    invert: false,
                },

                // Events
                on: {
                    init: function() {
                        // Gallery initialized
                        gallery.classList.add('swiper-initialized');
                        
                        // Force width update
                        gallery.style.width = '100%';
                        container.style.width = '100%';
                        
                        // Update swiper after DOM changes
                        setTimeout(() => {
                            this.update();
                        }, 10);
                    },
                    slideChange: function() {
                        // Optional: Add analytics or other tracking here
                    }
                }
            });

            // Store swiper instance for potential later use
            gallery.swiperInstance = swiper;
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initYouTubeShortsGalleries);
    } else {
        initYouTubeShortsGalleries();
    }

    // Re-initialize when new content is added (for AJAX/dynamic content)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            let shouldInit = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            if (node.classList && node.classList.contains('lkng-youtube-shorts-gallery')) {
                                shouldInit = true;
                            } else if (node.querySelectorAll) {
                                const galleries = node.querySelectorAll('.lkng-youtube-shorts-gallery');
                                if (galleries.length > 0) {
                                    shouldInit = true;
                                }
                            }
                        }
                    });
                }
            });
            
            if (shouldInit) {
                setTimeout(initYouTubeShortsGalleries, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

})();