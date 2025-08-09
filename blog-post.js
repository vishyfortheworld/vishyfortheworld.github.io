// Blog Post Page Functionality
class BlogPostManager {
    constructor() {
        this.currentBlog = null;
        this.isLiked = false;
        this.likeCount = 42;
        this.fontSize = 'normal'; // small, normal, large, xl
        this.focusMode = false;
        this.bookmarked = false;
        
        this.init();
    }
    
    init() {
        this.loadBlogData();
        this.setupEventListeners();
        this.setupReadingProgress();
        this.setupReadingTools();
        this.loadRelatedArticles();
        this.restoreUserPreferences();
    }
    
    // Load blog data (in a real app, this would come from URL params or API)
    loadBlogData() {
        // Get blog ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id') || '1';
        
        // Sample blog data (in real app, fetch from API)
        const blogs = {
            '1': {
                id: 1,
                title: "Building Scalable React Applications with TypeScript",
                category: "Development",
                date: "2024-01-15",
                readTime: "8 min read",
                views: 1247,
                likes: 42,
                tags: ["React", "TypeScript", "JavaScript", "Web Development", "Frontend"]
            }
            // Add more blogs as needed
        };
        
        this.currentBlog = blogs[blogId] || blogs['1'];
        this.likeCount = this.currentBlog.likes;
        
        // Update page content
        this.updatePageContent();
    }
    
    updatePageContent() {
        if (!this.currentBlog) return;
        
        // Update meta tags and title
        document.title = `${this.currentBlog.title} - Vishrut Vatsa`;
        document.querySelector('meta[name="description"]')?.setAttribute('content', 
            `${this.currentBlog.title} - A detailed article by Vishrut Vatsa`);
        
        // Update page elements
        document.getElementById('articleTitle').textContent = this.currentBlog.title;
        document.getElementById('articleCategory').textContent = this.currentBlog.category;
        document.getElementById('publishDate').textContent = new Date(this.currentBlog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('readTime').textContent = this.currentBlog.readTime;
        document.getElementById('viewCount').textContent = `${this.currentBlog.views.toLocaleString()} views`;
        document.getElementById('likeCount').textContent = this.likeCount;
    }
    
    setupEventListeners() {
        // Like button
        const likeButton = document.getElementById('likeButton');
        if (likeButton) {
            likeButton.addEventListener('click', () => this.toggleLike());
        }
        
        // Font size toggle
        const fontSizeToggle = document.getElementById('fontSizeToggle');
        if (fontSizeToggle) {
            fontSizeToggle.addEventListener('click', () => this.cycleFontSize());
        }
        
        // Back button in floating pill
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.goBack();
            });
        }
        
        // Setup floating pill scroll behavior
        this.setupFloatingPill();
        
        // Reading tools
        const scrollTopButton = document.getElementById('scrollTopButton');
        if (scrollTopButton) {
            scrollTopButton.addEventListener('click', () => this.scrollToTop());
        }
        
        const bookmarkButton = document.getElementById('bookmarkButton');
        if (bookmarkButton) {
            bookmarkButton.addEventListener('click', () => this.toggleBookmark());
        }
        
        const shareButton = document.getElementById('shareButton');
        if (shareButton) {
            shareButton.addEventListener('click', () => this.shareArticle());
        }
        
        // Copy link button
        const copyLinkButton = document.getElementById('copyLinkButton');
        if (copyLinkButton) {
            copyLinkButton.addEventListener('click', () => this.copyLink());
        }
        
        // Social share buttons
        document.querySelectorAll('.share-button').forEach(button => {
            if (button.classList.contains('twitter')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.shareToTwitter();
                });
            } else if (button.classList.contains('linkedin')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.shareToLinkedIn();
                });
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Scroll event for reading tools visibility
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    setupReadingProgress() {
        const progressBar = document.getElementById('readingProgressBar');
        const progressText = document.getElementById('readingProgressText');
        
        if (!progressBar || !progressText) return;
        
        window.addEventListener('scroll', () => {
            const article = document.querySelector('.article-content');
            if (!article) return;
            
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            
            // Calculate progress
            const articleStart = articleTop - windowHeight * 0.1;
            const articleEnd = articleTop + articleHeight - windowHeight * 0.9;
            const progress = Math.max(0, Math.min(100, 
                ((scrollTop - articleStart) / (articleEnd - articleStart)) * 100
            ));
            
            // Update progress bar
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        });
    }
    
    setupFloatingPill() {
        const floatingPill = document.getElementById('floatingPill');
        if (!floatingPill) return;
        
        let isVisible = false;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Clear timeout to debounce the scroll event
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                if (scrollY > 200 && !isVisible) {
                    // Show pill with bouncy animation
                    floatingPill.classList.add('visible');
                    isVisible = true;
                } else if (scrollY <= 200 && isVisible) {
                    // Hide pill
                    floatingPill.classList.remove('visible');
                    isVisible = false;
                }
            }, 10); // Small debounce to improve performance
        });
        
        // Add interaction feedback
        floatingPill.addEventListener('mouseenter', () => {
            if (isVisible) {
                floatingPill.style.transform = 'translateX(-50%) translateY(-2px)';
            }
        });
        
        floatingPill.addEventListener('mouseleave', () => {
            if (isVisible) {
                floatingPill.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }
    
    setupReadingTools() {
        const readingTools = document.getElementById('readingTools');
        if (!readingTools) return;
        
        // Show/hide reading tools based on scroll position
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 500) {
                readingTools.classList.add('visible');
            } else {
                readingTools.classList.remove('visible');
            }
        });
    }
    
    handleScroll() {
        // Update scroll-to-top button state
        const scrollTopButton = document.getElementById('scrollTopButton');
        if (scrollTopButton) {
            if (window.scrollY > 1000) {
                scrollTopButton.classList.add('active');
            } else {
                scrollTopButton.classList.remove('active');
            }
        }
    }
    
    toggleLike() {
        this.isLiked = !this.isLiked;
        const likeButton = document.getElementById('likeButton');
        const likeCountEl = document.getElementById('likeCount');
        
        if (this.isLiked) {
            this.likeCount++;
            likeButton.classList.add('liked');
            likeButton.querySelector('.like-text').textContent = 'Liked';
            this.showToast('Thanks for the like! ❤️');
        } else {
            this.likeCount--;
            likeButton.classList.remove('liked');
            likeButton.querySelector('.like-text').textContent = 'Like';
        }
        
        likeCountEl.textContent = this.likeCount;
        
        // Save to localStorage
        localStorage.setItem(`liked_${this.currentBlog.id}`, this.isLiked);
        
        // In a real app, send to API
        this.updateLikeOnServer();
    }
    
    cycleFontSize() {
        const fontSizes = ['small', 'normal', 'large', 'xl'];
        const currentIndex = fontSizes.indexOf(this.fontSize);
        const nextIndex = (currentIndex + 1) % fontSizes.length;
        this.fontSize = fontSizes[nextIndex];
        
        const contentBody = document.querySelector('.content-body');
        if (contentBody) {
            // Remove all font size classes
            fontSizes.forEach(size => contentBody.classList.remove(`font-${size}`));
            
            // Add new font size class
            if (this.fontSize !== 'normal') {
                contentBody.classList.add(`font-${this.fontSize}`);
            }
        }
        
        // Save preference
        localStorage.setItem('fontSize', this.fontSize);
        
        // Show feedback
        const sizeNames = {
            small: 'Small',
            normal: 'Normal',
            large: 'Large',
            xl: 'Extra Large'
        };
        this.showToast(`Font size: ${sizeNames[this.fontSize]}`);
    }
    
    // Focus mode functionality removed as requested
    
    toggleBookmark() {
        this.bookmarked = !this.bookmarked;
        const bookmarkButton = document.getElementById('bookmarkButton');
        
        if (this.bookmarked) {
            bookmarkButton.classList.add('active');
            this.showToast('Article bookmarked');
        } else {
            bookmarkButton.classList.remove('active');
            this.showToast('Bookmark removed');
        }
        
        // Save to localStorage
        localStorage.setItem(`bookmarked_${this.currentBlog.id}`, this.bookmarked);
    }
    
    goBack() {
        // Add a subtle bounce animation to the pill
        const floatingPill = document.getElementById('floatingPill');
        if (floatingPill) {
            floatingPill.style.animation = 'pillBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            setTimeout(() => {
                floatingPill.style.animation = '';
            }, 300);
        }
        
        // Navigate back to main blog page
        window.location.href = 'index.html';
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    shareArticle() {
        if (navigator.share) {
            navigator.share({
                title: this.currentBlog.title,
                text: `Check out this article: ${this.currentBlog.title}`,
                url: window.location.href
            }).catch(console.error);
        } else {
            this.copyLink();
        }
    }
    
    copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            this.showToast('Link copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Link copied to clipboard!');
        });
    }
    
    shareToTwitter() {
        const text = `Check out this article: ${this.currentBlog.title}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    }
    
    shareToLinkedIn() {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    }
    
    handleKeyboardShortcuts(e) {
        // Only handle shortcuts if not typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key.toLowerCase()) {
            case 'l':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.toggleLike();
                }
                break;
            // Focus mode shortcut removed
            case 'b':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.toggleBookmark();
                }
                break;
            case 'arrowup':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.scrollToTop();
                }
                break;
        }
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }
    
    restoreUserPreferences() {
        // Restore like status
        const savedLike = localStorage.getItem(`liked_${this.currentBlog.id}`);
        if (savedLike === 'true') {
            this.isLiked = true;
            document.getElementById('likeButton')?.classList.add('liked');
            const likeText = document.querySelector('.like-text');
            if (likeText) likeText.textContent = 'Liked';
        }
        
        // Restore bookmark status
        const savedBookmark = localStorage.getItem(`bookmarked_${this.currentBlog.id}`);
        if (savedBookmark === 'true') {
            this.bookmarked = true;
            document.getElementById('bookmarkButton')?.classList.add('active');
        }
        
        // Restore font size
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize && ['small', 'normal', 'large', 'xl'].includes(savedFontSize)) {
            this.fontSize = savedFontSize;
            const contentBody = document.querySelector('.content-body');
            if (contentBody && this.fontSize !== 'normal') {
                contentBody.classList.add(`font-${this.fontSize}`);
            }
        }
        
        // Focus mode functionality removed
    }
    
    loadRelatedArticles() {
        const relatedGrid = document.getElementById('relatedGrid');
        if (!relatedGrid) return;
        
        // Sample related articles (in real app, fetch from API)
        const relatedArticles = [
            {
                id: 2,
                title: "The Future of Web Development: What to Expect in 2024",
                excerpt: "Exploring emerging trends in web development...",
                category: "Technology",
                readTime: "6 min read"
            },
            {
                id: 3,
                title: "Complete Guide to Modern CSS Grid and Flexbox",
                excerpt: "Master CSS Grid and Flexbox with practical examples...",
                category: "Tutorial",
                readTime: "12 min read"
            }
        ];
        
        relatedGrid.innerHTML = relatedArticles.map(article => `
            <article class="blog-card" onclick="window.location.href='blog-post.html?id=${article.id}'">
                <div class="blog-card-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <div class="blog-card-overlay"></div>
                </div>
                <div class="blog-card-content">
                    <span class="blog-card-category">${article.category}</span>
                    <h3 class="blog-card-title">${article.title}</h3>
                    <p class="blog-card-excerpt">${article.excerpt}</p>
                    <div class="blog-card-meta">
                        <span class="blog-card-readtime">${article.readTime}</span>
                    </div>
                </div>
            </article>
        `).join('');
    }
    
    updateLikeOnServer() {
        // In a real application, send like status to server
        console.log(`Updating like status for blog ${this.currentBlog.id}: ${this.isLiked}`);
        
        // Simulate API call
        fetch('/api/blogs/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blogId: this.currentBlog.id,
                liked: this.isLiked
            })
        }).catch(err => {
            console.log('Like update would be sent to server:', err);
        });
    }
    
    // Method to track reading progress (for analytics)
    trackReadingProgress() {
        const readingEvents = [];
        let lastProgress = 0;
        
        window.addEventListener('scroll', () => {
            const progress = Math.round(parseFloat(document.getElementById('readingProgressText')?.textContent || '0'));
            
            // Track every 25% milestone
            if (progress >= lastProgress + 25) {
                lastProgress = Math.floor(progress / 25) * 25;
                readingEvents.push({
                    progress: lastProgress,
                    timestamp: Date.now(),
                    blogId: this.currentBlog.id
                });
                
                console.log(`Reading progress: ${lastProgress}%`);
                
                // In a real app, send to analytics
                this.sendAnalytics('reading_progress', {
                    progress: lastProgress,
                    blogId: this.currentBlog.id
                });
            }
        });
    }
    
    sendAnalytics(event, data) {
        // Placeholder for analytics tracking
        console.log('Analytics event:', event, data);
    }
}

// Enhanced Theme Manager for blog post page
class BlogPostThemeManager extends ThemeManager {
    constructor() {
        super();
    }
    
    applyTheme() {
        super.applyTheme();
        
        // Update CSS variables for better blog post experience
        const root = document.documentElement;
        
        if (this.theme === 'light') {
            root.style.setProperty('--bg-primary-rgb', '255, 255, 255');
        } else {
            root.style.setProperty('--bg-primary-rgb', '0, 0, 0');
        }
    }
}

// Initialize blog post functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize blog post manager
    const blogPostManager = new BlogPostManager();
    
    // Initialize enhanced theme manager
    const themeManager = new BlogPostThemeManager();
    
    // Track reading progress for analytics
    blogPostManager.trackReadingProgress();
    
    // Make globally available for debugging
    window.blogPostManager = blogPostManager;
    window.themeManager = themeManager;
    
    console.log('Blog post page initialized successfully! 📖');
    console.log('Keyboard shortcuts:');
    console.log('- L: Toggle like');
    console.log('- F: Toggle focus mode');
    console.log('- B: Toggle bookmark');
    console.log('- Ctrl/Cmd + ↑: Scroll to top');
});