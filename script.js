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
        this.renderBlogs();
    }
    
    // Load sample blog data
    loadSampleData() {
        this.blogs = [
            {
                id: 1,
                title: "Building Scalable React Applications with TypeScript",
                excerpt: "Learn how to structure large-scale React applications using TypeScript, exploring best practices for component architecture, state management, and type safety.",
                content: "Full article content would go here...",
                category: "development",
                date: "2024-01-15",
                readTime: "8 min read",
                tags: ["react", "typescript", "javascript"],
                featured: true
            },
            {
                id: 2,
                title: "The Future of Web Development: What to Expect in 2024",
                excerpt: "Exploring emerging trends in web development, from AI-powered tools to new frameworks that are reshaping how we build for the web.",
                content: "Full article content would go here...",
                category: "technology",
                date: "2024-01-12",
                readTime: "6 min read",
                tags: ["web development", "trends", "ai"],
                featured: false
            },
            {
                id: 3,
                title: "Complete Guide to Modern CSS Grid and Flexbox",
                excerpt: "Master CSS Grid and Flexbox with practical examples and real-world use cases. Learn when to use each layout method for maximum effectiveness.",
                content: "Full article content would go here...",
                category: "tutorial",
                date: "2024-01-10",
                readTime: "12 min read",
                tags: ["css", "layout", "frontend"],
                featured: false
            },
            {
                id: 4,
                title: "Building a Real-time Chat Application with WebSockets",
                excerpt: "Step-by-step tutorial on creating a real-time chat application using WebSockets, Node.js, and modern JavaScript frameworks.",
                content: "Full article content would go here...",
                category: "project",
                date: "2024-01-08",
                readTime: "15 min read",
                tags: ["websockets", "nodejs", "realtime"],
                featured: true
            },
            {
                id: 5,
                title: "Optimizing Performance in Modern JavaScript Applications",
                excerpt: "Discover advanced techniques for optimizing JavaScript performance, including code splitting, lazy loading, and memory management strategies.",
                content: "Full article content would go here...",
                category: "development",
                date: "2024-01-05",
                readTime: "10 min read",
                tags: ["performance", "javascript", "optimization"],
                featured: false
            },
            {
                id: 6,
                title: "Introduction to Machine Learning with Python",
                excerpt: "Get started with machine learning using Python. Learn fundamental concepts and build your first ML model with practical examples.",
                content: "Full article content would go here...",
                category: "tutorial",
                date: "2024-01-03",
                readTime: "14 min read",
                tags: ["python", "machine learning", "ai"],
                featured: false
            },
            {
                id: 7,
                title: "Serverless Architecture: Pros, Cons, and Best Practices",
                excerpt: "Deep dive into serverless computing, exploring when to use serverless architectures and how to implement them effectively.",
                content: "Full article content would go here...",
                category: "technology",
                date: "2024-01-01",
                readTime: "9 min read",
                tags: ["serverless", "cloud", "architecture"],
                featured: false
            },
            {
                id: 8,
                title: "Creating Beautiful Data Visualizations with D3.js",
                excerpt: "Learn to create stunning, interactive data visualizations using D3.js. From basic charts to complex interactive dashboards.",
                content: "Full article content would go here...",
                category: "project",
                date: "2023-12-28",
                readTime: "11 min read",
                tags: ["d3js", "visualization", "javascript"],
                featured: true
            },
            {
                id: 9,
                title: "Docker Containerization: From Basics to Production",
                excerpt: "Comprehensive guide to Docker containerization, covering everything from basic concepts to production deployment strategies.",
                content: "Full article content would go here...",
                category: "tutorial",
                date: "2023-12-25",
                readTime: "13 min read",
                tags: ["docker", "devops", "containerization"],
                featured: false
            }
        ];
        
        // Sort blogs by date (newest first)
        this.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.filteredBlogs = [...this.blogs];
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
        
        // Filter tags
        const filterTags = document.querySelectorAll('.tag');
        filterTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.category;
                this.filterBlogs();
            });
        });
        
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
    
    // Filter blogs based on search and category
    filterBlogs() {
        this.filteredBlogs = this.blogs.filter(blog => {
            const matchesSearch = !this.currentSearch || 
                blog.title.toLowerCase().includes(this.currentSearch) ||
                blog.excerpt.toLowerCase().includes(this.currentSearch) ||
                blog.tags.some(tag => tag.toLowerCase().includes(this.currentSearch));
            
            const matchesCategory = this.currentFilter === 'all' || 
                blog.category === this.currentFilter;
            
            return matchesSearch && matchesCategory;
        });
        
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
        
        const gradient = gradients[blog.id % gradients.length];
        
        card.innerHTML = `
            <div class="blog-card-image" style="background: ${gradient}">
                <div class="blog-card-overlay"></div>
            </div>
            <div class="blog-card-content">
                <span class="blog-card-category">${blog.category}</span>
                <h3 class="blog-card-title">${blog.title}</h3>
                <p class="blog-card-excerpt">${blog.excerpt}</p>
                <div class="blog-card-meta">
                    <span class="blog-card-date">${formattedDate}</span>
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
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
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
        
        console.log(`Theme switched to: ${this.theme}`);
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