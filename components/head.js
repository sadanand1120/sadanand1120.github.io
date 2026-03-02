// Shared head dependencies for all pages.
(function() {
    if (window.__sharedHeadInitialized) {
        return;
    }
    window.__sharedHeadInitialized = true;

    function appendLink(attrs) {
        const link = document.createElement('link');
        Object.entries(attrs).forEach(([key, value]) => {
            link.setAttribute(key, value);
        });
        document.head.appendChild(link);
    }

    function appendScript(src) {
        const script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    }

    if (!document.querySelector('link[href="style.css"]')) {
        appendLink({ rel: 'stylesheet', href: 'style.css' });
    }

    if (!document.querySelector('link[href*="font-awesome"]')) {
        appendLink({
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        });
    }

    if (!document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {
        appendLink({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    }

    if (!document.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]')) {
        appendLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' });
    }

    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Lato"]')) {
        appendLink({
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap'
        });
    }

    if (!document.querySelector('script[src="analytics.js"]')) {
        appendScript('analytics.js');
    }
})();
