(function() {
    'use strict';

    // Initialize the Instagram Reels Gallery when DOM is loaded
    function initInstagramReelsGalleries() {
        // Check if Swiper is available
        if (typeof Swiper === 'undefined') {
            console.error('Swiper library not loaded');
            return;
        }

        const galleries = document.querySelectorAll('.lkng-instagram-reels-gallery');
        
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
            const initialSlide = Math.ceil(totalSlides / 2);

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
                        
                        // Initialize iframe setup
                        initInstagramIframes(gallery);
                        
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

    // Initialize Instagram iframes (versão simples)
    function initInstagramIframes(gallery) {
        // Find all iframes within video containers
        const iframes = gallery.querySelectorAll('.video-container iframe');
        
        if (iframes.length > 0) {
            iframes.forEach(function(iframe, index) {
                // Set up loading event handler
                iframe.addEventListener('load', function() {
                    
                    // Remove elementos indesejados após carregamento
                    setTimeout(() => {
                        removeInstagramIndicators(gallery);
                    }, 1000);
                });
                
                // Handle iframe errors
                iframe.addEventListener('error', function() {
                    console.warn(`Erro no iframe ${index + 1}:`, iframe.src);
                });
                
                // Ensure iframe is properly styled (mantém o CSS original)
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '12px';
            });
            
            // Executar remoção periódica de indicadores
            setInterval(() => {
                removeInstagramIndicators(gallery);
            }, 2000);
        }
    }

    // Função para remover indicadores do Instagram (bolinha piscando, etc.)
    function removeInstagramIndicators(gallery) {
        // Lista de seletores para elementos indesejados
        const unwantedSelectors = [
            '[class*="watch"]',
            '[class*="instagram"]', 
            '[data-text*="instagram"]',
            '[aria-label*="Instagram"]',
            '[class*="indicator"]',
            '[class*="dot"]',
            '[class*="pulse"]',
            '[class*="blink"]',
            '[class*="badge"]',
            '[title*="Instagram"]',
            '[alt*="Instagram"]'
        ];

        unwantedSelectors.forEach(selector => {
            const elements = gallery.querySelectorAll(selector);
            elements.forEach(el => {
                if (el.textContent && el.textContent.toLowerCase().includes('instagram')) {
                    el.style.display = 'none !important';
                    el.style.opacity = '0 !important';
                    el.style.visibility = 'hidden !important';
                    el.remove();
                }
            });
        });

        // Remover elementos com animações piscando
        const animatedElements = gallery.querySelectorAll('*');
        animatedElements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.animationName && style.animationName !== 'none') {
                // Se a animação parece ser de piscar/pulse
                if (style.animationName.includes('pulse') || 
                    style.animationName.includes('blink') || 
                    style.animationName.includes('fade')) {
                    el.style.animation = 'none !important';
                    el.style.display = 'none !important';
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInstagramReelsGalleries);
    } else {
        initInstagramReelsGalleries();
    }

    // Re-initialize when new content is added (for AJAX/dynamic content)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            let shouldInit = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            if (node.classList && node.classList.contains('lkng-instagram-reels-gallery')) {
                                shouldInit = true;
                            } else if (node.querySelectorAll) {
                                const galleries = node.querySelectorAll('.lkng-instagram-reels-gallery');
                                if (galleries.length > 0) {
                                    shouldInit = true;
                                }
                            }
                        }
                    });
                }
            });
            
            if (shouldInit) {
                setTimeout(initInstagramReelsGalleries, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

})();