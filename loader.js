document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    const preloader = document.getElementById('preloader');
    const greetingText = document.getElementById('greeting-text');
    
    // Languages: English, Nepali, Indian (Hindi), French, Spanish
    const greetings = [
        "Hello",      // English
        "नमस्ते",    // Nepali/Hindi
        "Bonjour",    // French
        "Hola"        // Spanish
    ];
    
    let currentIndex = 0;
    
    // Function to change greeting
    function changeGreeting() {
        if (currentIndex < greetings.length) {
            // Fade out
            greetingText.classList.remove('fade-in');
            
            setTimeout(() => {
                // Change text and fade in
                greetingText.textContent = greetings[currentIndex];
                greetingText.classList.add('fade-in');
                currentIndex++;
            }, 150); // Wait for fade out
            
            // Schedule next greeting
            setTimeout(changeGreeting, 400); // Change every 400ms
        } else {
            // Done cycling through greetings, hide preloader
            setTimeout(() => {
                preloader.classList.add('hidden');
                window.scrollTo(0, 0);
                if (window.lenis) {
                    window.lenis.scrollTo(0, { immediate: true });
                }
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
                // Remove from DOM after transition
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 250); // Wait a bit after the last greeting
        }
    }
    
    // Start animation
    changeGreeting();
});
