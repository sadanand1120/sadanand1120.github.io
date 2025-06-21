// Google Analytics 4 - Universal Tracking Script
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID

(function() {
    // Configuration - Update this with your actual GA4 Measurement ID
    const GA4_MEASUREMENT_ID = 'G-ZTPGT8WSHJ';
    
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag; // Make gtag globally available
    
    // Initialize GA4
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        // Enhanced measurement events
        send_page_view: true,
        allow_google_signals: true,
        allow_ad_personalization_signals: true,
        
        // Custom events for detailed tracking
        custom_map: {
            'custom_parameter_1': 'user_type',
            'custom_parameter_2': 'engagement_level'
        }
    });
    
    // Enhanced tracking functions - globally available
    window.trackButtonClick = function(buttonName, section) {
        gtag('event', 'click', {
            event_category: 'button',
            event_label: buttonName,
            custom_parameter_1: section || 'unknown',
            value: 1
        });
    };
    
    window.trackDownload = function(fileName) {
        gtag('event', 'file_download', {
            event_category: 'download',
            event_label: fileName,
            value: 1
        });
    };
    
    window.trackExternalLink = function(url) {
        gtag('event', 'click', {
            event_category: 'external_link',
            event_label: url,
            transport_type: 'beacon'
        });
    };
    
    window.trackProjectExpansion = function(projectName) {
        gtag('event', 'project_expand', {
            event_category: 'engagement',
            event_label: projectName,
            custom_parameter_2: 'high'
        });
    };
    
    window.trackPageSection = function(sectionName, action = 'view') {
        gtag('event', 'section_interaction', {
            event_category: 'navigation',
            event_label: sectionName,
            custom_parameter_1: action
        });
    };
    
    window.trackFormInteraction = function(formName, field = '') {
        gtag('event', 'form_interaction', {
            event_category: 'form',
            event_label: formName,
            custom_parameter_1: field
        });
    };
    
    window.trackVideoPlay = function(videoName, duration = 0) {
        gtag('event', 'video_play', {
            event_category: 'media',
            event_label: videoName,
            value: duration
        });
    };
    
    window.trackSearchQuery = function(query, results = 0) {
        gtag('event', 'search', {
            search_term: query,
            event_category: 'search',
            value: results
        });
    };
    
    // Auto-tracking setup (runs when DOM is loaded)
    function initializeAutoTracking() {
        // Track external links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.target === '_blank') {
                trackExternalLink(link.href);
            }
            
            // Track downloads
            if (link && link.href.includes('.pdf')) {
                const fileName = link.href.split('/').pop();
                trackDownload(fileName);
            }
            
            // Track button clicks with aria-labels
            if (link && link.getAttribute('aria-label')) {
                const section = link.closest('section') ? link.closest('section').id : 'unknown';
                trackButtonClick(link.getAttribute('aria-label'), section);
            }
        });
        
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll && scrollPercent % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                maxScroll = scrollPercent;
                gtag('event', 'scroll_depth', {
                    event_category: 'engagement',
                    event_label: `${scrollPercent}%`,
                    value: scrollPercent
                });
            }
        });
        
        // Track time on page
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            gtag('event', 'time_on_page', {
                event_category: 'engagement',
                event_label: document.title,
                value: timeOnPage
            });
        });
        
        // Track project card interactions (if they exist)
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectTitle = card.querySelector('h3');
                if (projectTitle) {
                    trackProjectExpansion(projectTitle.textContent);
                }
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAutoTracking);
    } else {
        initializeAutoTracking();
    }
})(); 