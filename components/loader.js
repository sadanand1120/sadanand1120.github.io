// Component Loader - Dynamically loads HTML components
(function() {
    // Function to load HTML component
    async function loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                console.error(`Failed to load ${componentPath}: ${response.status} ${response.statusText}`);
                return;
            }
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            } else {
                console.warn(`Element with ID '${elementId}' not found`);
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
            // Fallback: show placeholder text
            const element = document.getElementById(elementId);
            if (element && elementId === 'navbar-placeholder') {
                element.innerHTML = '<nav><div class="nav-container"><p>Navigation loading...</p></div></nav>';
            } else if (element && elementId === 'footer-placeholder') {
                element.innerHTML = '<footer><p>&copy; 2025 Sadanand Modak</p></footer>';
            }
        }
    }

    // Load all components when DOM is ready
    function loadAllComponents() {
        // Load navbar
        loadComponent('navbar-placeholder', 'components/navbar.html');
        
        // Load footer
        loadComponent('footer-placeholder', 'components/footer.html');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllComponents);
    } else {
        loadAllComponents();
    }
})();

// Load HTML components
function loadComponent(element, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            element.innerHTML = data;

            // Execute any scripts in the loaded content
            const scripts = element.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript);
            });
        })
        .catch(error => {
            console.error('Error loading component:', error);
            element.innerHTML = '<p style="color: red;">Failed to load component</p>';
        });
}

// Load featured projects from publications.html
function loadFeaturedProjects() {
    const projectsContainer = document.querySelector('#projects .projects-grid');
    if (!projectsContainer) return;

    fetch('publications.html')
        .then(response => response.text())
        .then(data => {
            // Create a temporary DOM element to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            
            // Find all featured projects
            const featuredProjects = tempDiv.querySelectorAll('[data-featured="true"]');
            
            // Clear the existing projects and add featured ones
            projectsContainer.innerHTML = '';
            featuredProjects.forEach(project => {
                // Clone the project element
                const projectClone = project.cloneNode(true);
                projectsContainer.appendChild(projectClone);
            });

            // Re-attach the click event handlers to the dynamically loaded project cards
            initializeProjectCardInteractivity();
        })
        .catch(error => {
            console.error('Error loading featured projects:', error);
            // Fallback to existing content if loading fails
        });
}

// Initialize project card click functionality
function initializeProjectCardInteractivity() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Remove any existing event listeners to prevent duplicates
        card.removeEventListener('click', handleProjectCardClick);
        // Add the event listener
        card.addEventListener('click', handleProjectCardClick);
    });
}

// Project card click handler
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

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        loadComponent(navbarPlaceholder, 'components/navbar.html');
    }
    
    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        loadComponent(footerPlaceholder, 'components/footer.html');
    }

    // Load featured projects for index.html
    if (document.querySelector('#projects')) {
        loadFeaturedProjects();
    }
}); 