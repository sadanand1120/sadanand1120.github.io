# Sadanand Modak's Academic Website

A clean, modular academic website built with HTML, CSS, and JavaScript. This repository contains the complete setup for deployment using **GitHub Pages + Cloudflare + Google Analytics 4**.

**Live Website**: [sadanand1120.github.io](https://sadanand1120.github.io) → [Your custom domain]

## Table of Contents

1. [Website Architecture](#website-architecture)
2. [Local Development](#local-development)
3. [GitHub Pages Setup](#github-pages-setup)
4. [Cloudflare Custom Domain Setup](#cloudflare-custom-domain-setup)
5. [Google Analytics 4 Setup](#google-analytics-4-setup)
6. [Complete Integration Guide](#complete-integration-guide)
7. [Adding New Content](#adding-new-content)

---

## Website Architecture

### Component-Based Structure

The website uses a modular system to eliminate code duplication and simplify maintenance:

```
sadanand1120.github.io/
├── components/
│   ├── navbar.html        # Navigation bar (loaded dynamically)
│   ├── footer.html        # Footer (loaded dynamically)
│   └── loader.js          # Component loader system
├── index.html             # Home page
├── publications.html      # Publications page
├── analytics.js           # Google Analytics 4 tracking
├── script.js              # Website interactivity
├── style.css              # All styles
└── assets/                # Images, PDFs, etc.
```

### Key Features:
- **Dynamic Components**: Navbar and footer loaded via JavaScript
- **GA4 Integration**: Advanced tracking with modular `analytics.js`
- **Responsive Design**: Mobile-friendly academic layout
- **Interactive Projects**: Expandable project cards with tracking
- **Single Source of Truth**: Update navbar/footer once, applies everywhere

---

## Local Development

For testing before deployment:

```bash
# Navigate to your project directory
cd /path/to/sadanand1120.github.io

# Start local server (localhost only for security)
python3 -m http.server 8000 --bind 127.0.0.1

# Access at: http://localhost:8000
```

**Note**: The `--bind 127.0.0.1` flag ensures the server is only accessible locally.

---

## GitHub Pages Setup

Since your repository is already set up and live, here's how to verify and optimize your GitHub Pages deployment:

### Current Status ✅
Your website is already live at: `https://sadanand1120.github.io`

### Verify Settings
1. Go to your repository → **Settings** → **Pages**
2. Ensure these settings:
   - **Source**: Deploy from a branch
   - **Branch**: main / (root)
   - **Custom domain**: (leave empty until Cloudflare setup)
   - **Enforce HTTPS**: ✅ Checked

### Benefits of GitHub Pages:
- **Cost**: FREE forever
- **Storage**: 1GB (plenty for academic sites)
- **Bandwidth**: 100GB/month (sufficient for most academic use)
- **SSL**: Automatic HTTPS
- **Deployments**: Automatic on every push to main branch
- **Custom Domain**: Full support with proper DNS setup

---

## Cloudflare Custom Domain Setup

Cloudflare provides the best combination of **domain registration**, **DNS management**, and **CDN** for academic websites.

### Step 1: Purchase Domain via Cloudflare

1. **Go to**: [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
2. **Search for**: `sadanandmodak.com` (or your preferred domain)
3. **Cost**: ~$8-12/year (at-cost pricing, no markup)
4. **Purchase** the domain

**Why Cloudflare for domains?**
- **Lowest prices**: No markup, pay wholesale prices
- **Integrated DNS**: Domain + DNS + CDN in one place
- **Free SSL**: Automatic SSL certificates
- **Analytics**: Built-in web analytics (alternative to GA4)

### Step 2: Configure DNS Records

In your Cloudflare dashboard:

1. **Go to**: DNS → Records
2. **Add these records**:

```dns
# A Records (GitHub Pages IPs)
Type: A    Name: @              IPv4: 185.199.108.153
Type: A    Name: @              IPv4: 185.199.109.153
Type: A    Name: @              IPv4: 185.199.110.153
Type: A    Name: @              IPv4: 185.199.111.153

# CNAME Record (www subdomain)
Type: CNAME    Name: www    Target: sadanand1120.github.io

# Optional: Email forwarding (if you want hello@sadanandmodak.com)
Type: MX    Name: @    Mail server: route1.mx.cloudflare.net    Priority: 10
```

3. **Proxy Status**: 🟠 Proxied (enables Cloudflare CDN)

### Step 3: Configure GitHub Pages for Custom Domain

1. **Repository Settings** → **Pages**
2. **Custom domain**: Enter `sadanandmodak.com`
3. **Save** (GitHub will verify DNS)
4. **Wait 24-48 hours** for DNS propagation
5. **Check "Enforce HTTPS"** after verification completes

### Step 4: Cloudflare SSL/TLS Settings

1. **SSL/TLS** → **Overview**
2. **Encryption mode**: Full (strict)
3. **Edge Certificates**: Auto (should show active certificate)
4. **Always Use HTTPS**: ON

---

## Google Analytics 4 Setup

Your website already includes a sophisticated GA4 setup with the measurement ID `G-ZTPGT8WSHJ`. Here's how to verify and enhance it:

### Current Features ✅
Your `analytics.js` file already includes:
- **Automatic page tracking**
- **External link clicks**
- **PDF download tracking** 
- **Scroll depth tracking** (25%, 50%, 75%, 100%)
- **Button click tracking**
- **Project interaction tracking**
- **Time on page tracking**

### Verify Your GA4 Setup

1. **Go to**: [Google Analytics](https://analytics.google.com)
2. **Find your property** with ID `G-ZTPGT8WSHJ`
3. **Test tracking**: Visit your website and check **Real-time** reports

### Enhance Your Tracking (Optional)

Your current setup is already comprehensive, but you can add custom events:

```javascript
// Track specific academic interactions
window.trackPaperDownload = function(paperTitle) {
    gtag('event', 'paper_download', {
        event_category: 'academic',
        event_label: paperTitle,
        custom_parameter_1: 'research_engagement'
    });
};

// Track contact form submissions
window.trackContactSubmission = function(contactType) {
    gtag('event', 'contact_submission', {
        event_category: 'engagement',
        event_label: contactType,
        value: 1
    });
};
```

### Privacy & GDPR Compliance

Your current setup is **GDPR-compliant** for academic websites because:
- ✅ **Anonymous tracking** (no personal data collection)
- ✅ **No cookies** for identification
- ✅ **IP anonymization** enabled
- ✅ **Educational purpose** (legitimate interest)

---

## Complete Integration Guide

### The Perfect Academic Website Stack:

| Component | Service | Cost | Benefit |
|-----------|---------|------|---------|
| **Domain** | Cloudflare Registrar | $8-12/year | Lowest prices, integrated DNS |
| **Hosting** | GitHub Pages | FREE | Automatic deployments, 99.9% uptime |
| **CDN** | Cloudflare Proxy | FREE | Global speed, DDoS protection |
| **SSL** | Cloudflare | FREE | Automatic certificates |
| **Analytics** | Google Analytics 4 | FREE | Comprehensive visitor insights |
| **Email** | Cloudflare Email Routing | FREE | Forwarding (e.g., hello@yourdomain.com) |

**Total Cost**: $8-12/year (just the domain!)

### Deployment Workflow

```bash
# 1. Make changes locally
git add .
git commit -m "Update research content"

# 2. Push to GitHub (triggers auto-deployment)
git push origin main

# 3. Changes live in ~5 minutes at:
#    - https://sadanand1120.github.io (GitHub)
#    - https://sadanandmodak.com (Custom domain)
```

### Performance Benefits

With this stack, your website gets:
- **Global CDN**: Cloudflare's 330+ data centers
- **Fast Loading**: Optimized static files
- **99.9% Uptime**: GitHub Pages reliability
- **Automatic SSL**: HTTPS everywhere
- **Analytics**: Detailed visitor insights

---

## Adding New Content

### Adding a New Page

Create a new HTML file with this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Page - Sadanand Modak</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap"
        rel="stylesheet">
    <!-- Google Analytics 4 - Universal Tracking -->
    <script src="analytics.js"></script>
</head>
<body>
    <header style="background-image: url('assets/header.jpg');">
        <div class="header-overlay">
            <h1>New Page Title</h1>
            <p>Page description</p>
        </div>
    </header>

    <!-- Navigation Bar -->
    <div id="navbar-placeholder"></div>

    <!-- Your content here -->
    <div class="container">
        <!-- Page content -->
    </div>

    <!-- Footer -->
    <div id="footer-placeholder"></div>

    <!-- Load components and scripts -->
    <script src="components/loader.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

### Updating Navigation

Edit `components/navbar.html` to add your new page:

```html
<li><a href="new-page.html"><i class="fa-solid fa-icon"></i>New Page</a></li>
```

### Adding Publications

Add new project cards to `publications.html` - the home page automatically displays featured projects marked with `data-featured="true"`.

---

## Troubleshooting

### Common Issues:

1. **Custom domain not working**: Wait 24-48 hours for DNS propagation
2. **HTTPS errors**: Ensure Cloudflare SSL is set to "Full (strict)"
3. **Analytics not tracking**: Check browser console for errors
4. **Components not loading**: Verify file paths in `components/loader.js`

### Quick Checks:

```bash
# Test DNS propagation
dig sadanandmodak.com

# Check SSL certificate
curl -I https://sadanandmodak.com

# Verify GitHub Pages
curl -I https://sadanand1120.github.io
```

---

## Next Steps

1. ✅ **GitHub Pages**: Already set up and running
2. 🔄 **Custom Domain**: Purchase domain via Cloudflare and configure DNS
3. 🔄 **SSL Setup**: Configure Cloudflare SSL settings
4. ✅ **GA4 Setup**: Already configured with advanced tracking
5. 🔄 **Test Integration**: Verify everything works together
6. ✅ **Content Updates**: Add new publications and projects as needed

**Your website is already live and professional!** The custom domain setup will make it even more polished for academic and professional use.

---

*This website leverages the best free and low-cost tools for academic web presence. Total ongoing cost: ~$10/year for the domain only.* 