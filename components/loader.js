// Component loader and featured project sync
(function() {
    async function loadHtmlInto(elementId, componentPath) {
        const element = document.getElementById(elementId);
        if (!element) {
            return;
        }

        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                console.error(`Failed to load ${componentPath}: ${response.status} ${response.statusText}`);
                return;
            }

            element.innerHTML = await response.text();
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);

            if (elementId === 'navbar-placeholder') {
                element.innerHTML = '<nav><div class="nav-container"><p>Navigation temporarily unavailable.</p></div></nav>';
            } else if (elementId === 'footer-placeholder') {
                element.innerHTML = '<footer><p>Footer temporarily unavailable.</p></footer>';
            }
        }
    }

    async function loadFeaturedProjects() {
        const projectsContainer = document.querySelector('#projects .projects-grid');
        if (!projectsContainer) {
            return;
        }

        try {
            const response = await fetch('publications.html');
            if (!response.ok) {
                console.error(`Failed to load publications.html: ${response.status} ${response.statusText}`);
                return;
            }

            const data = await response.text();
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = data;

            const featuredProjects = tempContainer.querySelectorAll('.project-card[data-featured="true"]');
            projectsContainer.innerHTML = '';

            featuredProjects.forEach(project => {
                projectsContainer.appendChild(project.cloneNode(true));
            });

            if (typeof window.initializeProjectCardInteractivity === 'function') {
                window.initializeProjectCardInteractivity();
            }
        } catch (error) {
            console.error('Error loading featured projects:', error);
        }
    }

    async function initializePageComponents() {
        await Promise.all([
            loadHtmlInto('navbar-placeholder', 'components/navbar.html'),
            loadHtmlInto('footer-placeholder', 'components/footer.html')
        ]);

        if (document.querySelector('#projects')) {
            await loadFeaturedProjects();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePageComponents);
    } else {
        initializePageComponents();
    }
})();
