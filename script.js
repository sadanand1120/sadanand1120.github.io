// Main website interactivity (non-analytics)
function handleProjectCardClick(event) {
    const card = event.currentTarget;
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
            otherCard.classList.remove('active');
        }
    });

    card.classList.toggle('active');
}

function initializeProjectCardInteractivity() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.removeEventListener('click', handleProjectCardClick);
        card.addEventListener('click', handleProjectCardClick);
    });
}

// Expose shared interactivity hooks for dynamically loaded content.
window.handleProjectCardClick = handleProjectCardClick;
window.initializeProjectCardInteractivity = initializeProjectCardInteractivity;

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.project-card') && !document.querySelector('#projects')) {
        initializeProjectCardInteractivity();
    }
});
