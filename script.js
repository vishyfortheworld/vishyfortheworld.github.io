// Blog data structure and management
class BlogManager {
    constructor() {
        this.blogs = [];
        this.filteredBlogs = [];
        this.currentPage = 0;
        this.postsPerPage = 6;
        this.currentFilter = 'all';
        this.currentSearch = '';
        
        this.init();
    }
    
    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.setupMainHeaderPill();
        this.setupInteractivePills();
        this.renderBlogs();
    }
    
    // Load sample blog data
    loadSampleData() {
        this.blogs = [
            {
                id: 11,
                title: "Some things I've built don't run on code",
                excerpt: "a reflection on rhythm, purpose, people, and the energy in the room.",
                content: "Full article content would go here...",
                category: "reflection",
                date: "2025-10-12",
                readTime: "3 min read",
                tags: ["life", "work", "reflection"],
                featured: true
            },
            {
                id: 12,
                title: "Connections can drop, user trust shouldn't",
                excerpt: "how do you exactly make a reliable billing system for the real world",
                content: "Full article content would go here...",
                category: "development",
                date: "2025-10-27",
                readTime: "10 min read",
                tags: ["billing", "reliability", "systems"],
                featured: true
            },
            {
                id: 1,
                title: "I can be wrong",
                excerpt: "a gentle reflection on what I’ve come to understand during the past few, deeply transformative years of my mental growth",
                content: "Full article content would go here...",
                category: "development",
                date: "2025-08-10",
                readTime: "5 min read",
                tags: ["mental health", "growth", "reflection"],
                featured: true
            }
        ];
        
        // Sort blogs by date (newest first)
        this.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Show the first three articles on the homepage (keep earlier blogs visible)
        this.filteredBlogs = this.blogs.slice(0, 3);
        this.postsPerPage = 3;
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.currentSearch = e.target.value.toLowerCase();
                this.filterBlogs();
            }, 300));
        }
        
        // Filter tags removed for cleaner design
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreBlogs();
            });
        }
        
        // Blog card clicks (for navigation to individual posts)
        document.addEventListener('click', (e) => {
            const blogCard = e.target.closest('.blog-card');
            if (blogCard) {
                const blogId = blogCard.dataset.blogId;
                this.openBlogPost(blogId);
            }
        });
    }
    
    // Debounce function for search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Filter blogs based on search only
    filterBlogs() {
        this.filteredBlogs = this.blogs.filter(blog => {
            const matchesSearch = !this.currentSearch || 
                blog.title.toLowerCase().includes(this.currentSearch) ||
                blog.excerpt.toLowerCase().includes(this.currentSearch) ||
                blog.tags.some(tag => tag.toLowerCase().includes(this.currentSearch));
            
            return matchesSearch;
        });
        
        // Keep only the first three (newest) articles visible on homepage
        if (this.filteredBlogs.length > 0) {
            // Ensure sorted order by date
            this.filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.filteredBlogs = this.filteredBlogs.slice(0, 3);
        }

        this.currentPage = 0;
        this.renderBlogs();
    }
    
    // Render blogs to the grid
    renderBlogs() {
        const blogGrid = document.getElementById('blogGrid');
        const emptyState = document.getElementById('emptyState');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (!blogGrid) return;
        
        // Clear existing content
        blogGrid.innerHTML = '';
        
        // Check if there are blogs to show
        if (this.filteredBlogs.length === 0) {
            emptyState.style.display = 'block';
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        emptyState.style.display = 'none';
        
        // Calculate blogs to show
        const startIndex = 0;
        const endIndex = (this.currentPage + 1) * this.postsPerPage;
        const blogsToShow = this.filteredBlogs.slice(startIndex, endIndex);
        
        // Render each blog
        blogsToShow.forEach((blog, index) => {
            const blogCard = this.createBlogCard(blog);
            blogCard.style.animationDelay = `${index * 0.1}s`;
            blogCard.classList.add('fade-in');
            blogGrid.appendChild(blogCard);
        });
        
        // Show/hide load more button
        if (endIndex >= this.filteredBlogs.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Create a blog card element
    createBlogCard(blog) {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.dataset.blogId = blog.id;
        
        // Format date
        const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Generate gradient background for image
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
        ];
        
        let gradient = gradients[blog.id % gradients.length];
        // Force turquoise for the second blog card
        if (String(blog.id) === '11') {
            gradient = 'linear-gradient(135deg, #40E0D0 0%, #2bc0a4 100%)';
        }
        // Distinct deep blue gradient for reliability/billing theme
        if (String(blog.id) === '12') {
            gradient = 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)';
        }
        
        card.innerHTML = `
            <div class="blog-card-image" style="background: ${gradient}">
                <div class="blog-card-content-overlay">
                    <h3 class="blog-card-title">${blog.title}</h3>
                    <span class="blog-card-date">${formattedDate}</span>
                </div>
            </div>
            <div class="blog-card-content">
                <p class="blog-card-excerpt">${blog.excerpt}</p>
                <div class="blog-card-meta">
                    <span class="blog-card-readtime">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        ${blog.readTime}
                    </span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Load more blogs
    loadMoreBlogs() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.classList.add('loading');
            
            // Simulate loading delay
            setTimeout(() => {
                this.currentPage++;
                this.renderBlogs();
                loadMoreBtn.classList.remove('loading');
            }, 500);
        }
    }
    
    // Open individual blog post
    openBlogPost(blogId) {
        const blog = this.blogs.find(b => b.id == blogId);
        if (blog) {
            // Navigate to the blog post page with the blog ID
            window.location.href = `blog-post.html?id=${blogId}`;
        }
    }
    
    // Add new blog post (for future CMS functionality)
    addBlogPost(blogData) {
        const newBlog = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            ...blogData
        };
        
        this.blogs.unshift(newBlog);
        this.filterBlogs();
        return newBlog;
    }
    
    // Search blogs by tag
    searchByTag(tag) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = tag;
            this.currentSearch = tag.toLowerCase();
            this.filterBlogs();
        }
    }
    
    // Setup main header pill
    setupMainHeaderPill() {
        const mainHeaderPill = document.getElementById('mainHeaderPill');
        if (!mainHeaderPill) return;
        
        let isCollapsed = false;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Clear timeout to debounce the scroll event
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                if (scrollY > 100 && !isCollapsed) {
                    // Shrink pill with super bouncy animation
                    this.shrinkHeaderPill(mainHeaderPill);
                    isCollapsed = true;
                } else if (scrollY <= 100 && isCollapsed) {
                    // Expand pill
                    this.expandHeaderPill(mainHeaderPill);
                    isCollapsed = false;
                }
            }, 30); // Smaller debounce for smoother response
        });
        
        // Setup theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                if (window.themeManager) {
                    window.themeManager.toggleTheme();
                }
            });
        }
    }
    
    shrinkHeaderPill(pill) {
        // Add subtle bouncy shrinking animation
        pill.classList.add('shrinking');
        
        setTimeout(() => {
            pill.classList.add('collapsed');
        }, 150);
        
        setTimeout(() => {
            pill.classList.remove('shrinking');
        }, 1200);
    }
    
    expandHeaderPill(pill) {
        // Add subtle bouncy expanding animation
        pill.classList.add('shrinking');
        
        setTimeout(() => {
            pill.classList.remove('collapsed');
        }, 150);
        
        setTimeout(() => {
            pill.classList.remove('shrinking');
        }, 1200);
    }
    
    setupInteractivePills() {
        // Main header pill interactive bounce
        const mainHeaderPill = document.getElementById('mainHeaderPill');
        if (mainHeaderPill) {
            const headerContent = mainHeaderPill.querySelector('.header-pill-content');
            if (headerContent) {
                this.addInteractiveBounce(headerContent);
            }
        }
        
        // Footer pill interactive bounce
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            this.addInteractiveBounce(footerContent);
            this.setupFooterScrollBounce(footerContent);
        }
    }
    
    addInteractiveBounce(element) {
        // Add click/touch event listeners
        const bounceHandler = (e) => {
            // Check if the click target is not a button or interactive element
            if (!e.target.closest('button') && !e.target.closest('a') && !e.target.closest('.pill-control')) {
                e.preventDefault();
                this.triggerBounce(element);
            }
        };
        
        element.addEventListener('click', bounceHandler);
        element.addEventListener('touchstart', bounceHandler, { passive: false });
        
        // Add cursor pointer for better UX
        element.style.cursor = 'pointer';
    }
    
    triggerBounce(element) {
        // Remove any existing bounce animation
        element.classList.remove('interactive-bounce');
        
        // Force reflow
        element.offsetHeight;
        
        // Add bounce animation
        element.classList.add('interactive-bounce');
        
        // Remove animation class after completion
        setTimeout(() => {
            element.classList.remove('interactive-bounce');
        }, 900);
    }
    
    setupFooterScrollBounce(footerElement) {
        let hasTriggered = false;
        
        const checkScrollPosition = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            
            // Trigger when user is within 100px of the bottom
            const nearBottom = scrollTop + windowHeight >= documentHeight - 100;
            
            if (nearBottom && !hasTriggered) {
                this.triggerFooterScrollBounce(footerElement);
                hasTriggered = true;
                
                // Reset trigger after 2 seconds
                setTimeout(() => {
                    hasTriggered = false;
                }, 2000);
            }
        };
        
        // Throttle scroll events for performance
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    checkScrollPosition();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', scrollHandler);
    }
    
    triggerFooterScrollBounce(element) {
        // Remove any existing animations
        element.classList.remove('scroll-bounce', 'interactive-bounce');
        
        // Force reflow
        element.offsetHeight;
        
        // Add scroll bounce animation
        element.classList.add('scroll-bounce');
        
        // Remove animation class after completion
        setTimeout(() => {
            element.classList.remove('scroll-bounce');
        }, 1400);
    }
}

// Utility functions
class Utils {
    // Smooth scroll to element
    static scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Copy text to clipboard
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }
    
    // Format date
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Calculate reading time
    static calculateReadingTime(text) {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    }
}

// Theme management
class ThemeManager {
    constructor() {
        this.themes = ['light', 'dark', 'liquid'];
        this.theme = localStorage.getItem('theme') || 'light';
        this.applyTheme();
        this.setupThemeToggle();
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update the loading screen theme as well
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.setAttribute('data-theme', this.theme);
        }
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    toggleTheme() {
        // Cycle through themes: light -> dark -> liquid -> light
        const currentIndex = this.themes.indexOf(this.theme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.theme = this.themes[nextIndex];
        
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Add a subtle animation to the toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        }
        
        // Special animation for liquid mode
        if (this.theme === 'liquid') {
            this.triggerLiquidTransition();
        }
        
        console.log(`Theme switched to: ${this.theme}`);
    }
    
    triggerLiquidTransition() {
        // Add a special transition effect when entering liquid mode
        const body = document.body;
        body.style.transition = 'all 1s ease-in-out';
        
        setTimeout(() => {
            body.style.transition = '';
        }, 1000);
        
        // Trigger a subtle shake animation for the theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.animation = 'liquidPulse 0.6s ease-in-out';
            setTimeout(() => {
                themeToggle.style.animation = '';
            }, 600);
        }
    }
}

// Performance optimization
class PerformanceOptimizer {
    // Lazy load images
    static initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Preload critical resources
    static preloadCriticalResources() {
        const criticalResources = [
            '/styles.css',
            '/script.js'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after content is loaded
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500); // Show loading screen for 1.5 seconds

    // Initialize blog manager
    const blogManager = new BlogManager();
    
    // Initialize theme manager
    const themeManager = new ThemeManager();
    
    // Initialize performance optimizations
    PerformanceOptimizer.initLazyLoading();
    
    // Make utilities globally available
    window.blogManager = blogManager;
    window.themeManager = themeManager;
    window.utils = Utils;
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for better UX
    window.addEventListener('beforeunload', () => {
        document.body.classList.add('loading');
    });
    
    console.log('Blog application initialized successfully! 🚀');
    console.log('Available global objects:', {
        blogManager: window.blogManager,
        themeManager: window.themeManager,
        utils: window.utils
    });
});