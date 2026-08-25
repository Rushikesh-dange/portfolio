document.addEventListener('DOMContentLoaded', () => {
    
    // --- Interactive Spotlight ---
    const spotlight = document.getElementById('spotlight');
    
    document.addEventListener('mousemove', (e) => {
        if(spotlight) {
            spotlight.style.left = e.clientX + 'px';
            spotlight.style.top = e.clientY + 'px';
        }
    });

    // Make spotlight larger when hovering over interactive elements
    const interactiveElements = document.querySelectorAll('a, .project-row, .bento-panel');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            spotlight.style.width = '800px';
            spotlight.style.height = '800px';
        });
        el.addEventListener('mouseleave', () => {
            spotlight.style.width = '600px';
            spotlight.style.height = '600px';
        });
    });

    // --- Text Decryption Animation ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    
    function decryptElement(element, originalText, speed = 30) {
        let iteration = 0;
        let interval = setInterval(() => {
            element.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            
            if(iteration >= originalText.length){ 
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, speed);
    }

    // Apply to elements with .decrypt-text
    const decryptElements = document.querySelectorAll('.decrypt-text');
    decryptElements.forEach(el => {
        const originalText = el.innerText;
        // Store original text
        el.dataset.original = originalText;
        
        // Initial animation
        setTimeout(() => decryptElement(el, originalText), 500);
        
        // Animate on hover of parent panel
        const parentPanel = el.closest('.bento-panel');
        if(parentPanel) {
            parentPanel.addEventListener('mouseenter', () => {
                decryptElement(el, originalText, 15);
            });
        }
    });

    // Apply to slower elements
    const slowDecryptElements = document.querySelectorAll('.decrypt-text-slow');
    slowDecryptElements.forEach(el => {
        const originalHTML = el.innerHTML;
        const originalText = el.innerText;
        
        // For complex HTML (like the paragraph with strong tags), 
        // we'll just animate the innerText once, then restore HTML
        let iteration = 0;
        let interval = setInterval(() => {
            el.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            
            if(iteration >= originalText.length){ 
                clearInterval(interval);
                el.innerHTML = originalHTML; // Restore original HTML formatting
            }
            iteration += 1 / 2;
        }, 15);
    });
});
