// Google Analytics 4 - Universal Tracking Script
(function() {
    const GA4_MEASUREMENT_ID = 'G-ZTPGT8WSHJ';
    const trackedScrollMilestones = new Set();

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        send_page_view: true,
        allow_google_signals: true,
        allow_ad_personalization_signals: true,
        custom_map: {
            custom_parameter_1: 'user_type',
            custom_parameter_2: 'engagement_level'
        }
    });

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

    window.trackPageSection = function(sectionName, action) {
        gtag('event', 'section_interaction', {
            event_category: 'navigation',
            event_label: sectionName,
            custom_parameter_1: action || 'view'
        });
    };

    window.trackFormInteraction = function(formName, field) {
        gtag('event', 'form_interaction', {
            event_category: 'form',
            event_label: formName,
            custom_parameter_1: field || ''
        });
    };

    window.trackVideoPlay = function(videoName, duration) {
        gtag('event', 'video_play', {
            event_category: 'media',
            event_label: videoName,
            value: duration || 0
        });
    };

    window.trackSearchQuery = function(query, results) {
        gtag('event', 'search', {
            search_term: query,
            event_category: 'search',
            value: results || 0
        });
    };

    function trackScrollDepth() {
        const scrollableHeight = document.body.scrollHeight - window.innerHeight;
        if (scrollableHeight <= 0) {
            return;
        }

        const percent = Math.round((window.scrollY / scrollableHeight) * 100);
        const milestones = [25, 50, 75, 100];

        milestones.forEach(milestone => {
            if (percent >= milestone && !trackedScrollMilestones.has(milestone)) {
                trackedScrollMilestones.add(milestone);
                gtag('event', 'scroll_depth', {
                    event_category: 'engagement',
                    event_label: `${milestone}%`,
                    value: milestone
                });
            }
        });
    }

    function initializeAutoTracking() {
        document.addEventListener('click', event => {
            const link = event.target.closest('a');
            if (link && link.target === '_blank') {
                window.trackExternalLink(link.href);
            }

            if (link && link.href && link.href.includes('.pdf')) {
                const fileName = link.href.split('/').pop();
                window.trackDownload(fileName);
            }

            if (link && link.getAttribute('aria-label')) {
                const parentSection = link.closest('section');
                const sectionId = parentSection ? parentSection.id : 'unknown';
                window.trackButtonClick(link.getAttribute('aria-label'), sectionId);
            }

            const card = event.target.closest('.project-card');
            if (card) {
                const projectTitle = card.querySelector('h3');
                if (projectTitle) {
                    window.trackProjectExpansion(projectTitle.textContent.trim());
                }
            }
        });

        window.addEventListener('scroll', trackScrollDepth, { passive: true });

        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            gtag('event', 'time_on_page', {
                event_category: 'engagement',
                event_label: document.title,
                value: timeOnPage
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAutoTracking);
    } else {
        initializeAutoTracking();
    }
})();
