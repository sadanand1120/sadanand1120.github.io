// Main website interactivity (non-analytics)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize project card interactivity for pages that have them loaded directly (like publications.html)
    // For index.html, this will be handled by the loader after dynamic content loads
    if (document.querySelector('.project-card') && !document.querySelector('#projects')) {
        // This is likely publications.html or another page with static project cards
        initializeProjectCardInteractivity();
    }
});

// Initialize project card click functionality (also used by loader.js)
function initializeProjectCardInteractivity() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Remove any existing event listeners to prevent duplicates
        card.removeEventListener('click', handleProjectCardClick);
        // Add the event listener
        card.addEventListener('click', handleProjectCardClick);
    });
}

// Project card click handler (also used by loader.js)
function handleProjectCardClick(event) {
    const card = event.currentTarget;
    const projectCards = document.querySelectorAll('.project-card');
    
    // Deactivate other cards
    projectCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
            otherCard.classList.remove('active');
        }
    });
    // Toggle active state on the clicked card
    card.classList.toggle('active');
}

// Note: All analytics tracking is now handled by analytics.js