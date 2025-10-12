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
    
    // Load blog data (in a real app, isko sahi se load karna hai)
    loadBlogData() {
        // Get blog ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id') || '1';
        
        // Sample blog data (isko bhi sahi se load karna hai)
        const blogs = {
            '1': {
                id: 1,
                title: "I can be wrong",
                excerpt: "a gentle reflection on what I’ve come to understand during the past few, deeply transformative years of my mental growth",
                content: "I can be wrong",
                category: "development",
                date: "2024-01-15",
                readTime: "8 min read",
                views: 1247,
                likes: 42,
                tags: ["React", "TypeScript", "JavaScript", "Web Development", "Frontend"]
            },
            '11': {
                id: 11,
                title: "Some things don't run on code",
                excerpt: "Some things I've built don’t run on code. A reflection on rhythm, purpose, people, and the energy in the room.",
                content: "Some things I've built don’t run on code.",
                category: "reflection",
                date: "2025-10-12",
                readTime: "3 min read",
                views: 0,
                likes: 17,
                tags: ["life", "work", "reflection"]
            }
            // aage aur blogs add karna hai
        };
        
        this.currentBlog = blogs[blogId] || blogs['1'];
        this.likeCount = this.currentBlog.likes;
        
        console.log('Loaded blog:', this.currentBlog); // Debug log
        
        // Update page content
        this.updatePageContent();
    }
    
    updatePageContent() {
        if (!this.currentBlog) {
            console.error('No current blog data found');
            return;
        }
        
        console.log('Updating page content with:', this.currentBlog.title);
        
        // Update meta tags and title
        document.title = `${this.currentBlog.title} - Vishrut Vatsa`;
        document.querySelector('meta[name="description"]')?.setAttribute('content', 
            `${this.currentBlog.title} - A detailed article by Vishrut Vatsa`);
        
        // Update pill title with retry logic, chutiya code hai
        const updatePillTitle = () => {
            const pillTitle = document.getElementById('pillBlogTitle');
            if (pillTitle) {
                pillTitle.textContent = this.currentBlog.title;
                console.log('Updated pill title to:', this.currentBlog.title);
                // Nudge the title slightly to the right for blog id 11 to align with content
                if (this.currentBlog.id === 11) {
                    pillTitle.style.marginLeft = '12px';
                } else {
                    pillTitle.style.marginLeft = '';
                }
            } else {
                console.warn('Pill title element not found, retrying...');
                setTimeout(updatePillTitle, 100);
            }
        };
        updatePillTitle();
        
        // Update like count
        const likeCountElement = document.getElementById('likeCount');
        if (likeCountElement) {
            likeCountElement.textContent = this.likeCount;
        }

        // Render the actual article content for specific blogs
        this.renderArticleContent();
    }

    renderArticleContent() {
        const contentBody = document.querySelector('#articleContent .content-body');
        if (!contentBody) return;
        
        // Keep existing static content for the first blog
        if (this.currentBlog.id !== 11) return;
        
        // Richly formatted content mirroring the first blog's structure (full text)
        contentBody.innerHTML = `
            <p class="lead">Some things I've built don’t run on code.</p>
            
            <p style="line-height: 1.7; font-size: 1.05rem; max-width: 700px; margin: auto; font-family: system-ui, sans-serif;">
                I catch myself staring at the terminal like it’s a window. <br>
                 Logs rolling down, cursor blinking, everything alive but quiet. It’s weirdly peaceful. <br>
                  But lately I’ve been thinking about how easy it is to start confusing that peace with purpose.
            </p>

            <p style="line-height: 1.7; font-size: 1.05rem; max-width: 700px; margin: auto; font-family: system-ui, sans-serif;">
                I love what I build. App, backend, paddock, whatever, obviously it’s all part of me. But it’s not me. <br> Shru calls herself a mirror when it comes to her being a certain way with someone, maybe my work is my mirror. It reflects how I think, how I care, how I am desperately trying to make sense of the world. <br>
                <br>
                But when I close the laptop, I need to still recognize myself without it.
                <br>
                 <br>
            </p>

            <span style="display:block; border-top: 1px solid #ccc; margin: 2rem auto; max-width: 700px;"></span>

            <p style="line-height: 1.7; font-size: 1.05rem; max-width: 700px; margin: auto; font-family: system-ui, sans-serif;">
                I, at times, think that life works in reverse. I also, at times, think back to the rooms that taught me things. My Bangalore room, learned that good decisions in life stack up. The Saket room, where the first version of the app that broke every other day still somehow ran. The late nights that ended with someone quietly saying “bhai, it works”. <br>
                 Those moments weren’t about tech or development or design. <br> They were about people trying to make something honest.
                 <br>
                 <br>
            </p>

            <p style="line-height: 1.7; font-size: 1.05rem; max-width: 700px; margin: auto; font-family: system-ui, sans-serif;">
                I get so much joy in doing that. When everyone’s too tired to speak but too damn close to quit. When a small fix makes everyone breathe again. That’s what I’ll remember.
            </p>

            <blockquote style="border-left: 4px solid #000; padding-left: 1rem; margin: 1.5rem auto; max-width: 700px; font-style: italic;">
                Not the code, never the feature, but the energy in the room.
            </blockquote>

            <p style="line-height: 1.7; font-size: 1.05rem; max-width: 700px; margin: auto; font-family: system-ui, sans-serif;">
                Sometimes I forget that I have a beautiful family and friends who make me feel like I'm allowed to have a life outside all this. <br>
                Kuttu wakes me up before my alarms. Tushu listens to me talk about boring tech like it’s art. My mom reminds me to eat, sleep, slow down. Raman reminding me to just breathe.
                <br>
                
                They’re all part of this too. Maybe more than I realise.
                <br>
                <br>
            </p>

            <span style="display:block; border-top: 1px solid #ccc; margin: 2rem auto; max-width: 700px;"></span>

            <p style="line-height: 1.7; font-size: 1.05rem; max-width: 700px; margin: auto; font-family: system-ui, sans-serif;">
                I used to think the goal was perfection.<br>
                 Now I just want rhythm. <br>
                  To show up, to build carefully, to not rush through moments that deserve attention. <br>
                  To be proud of the small things that work quietly and well.

                  <br>
                  <br>
            </p>

            <p style="line-height: 1.7; font-size: 1.05rem; max-width: 700px; margin: auto; font-family: system-ui, sans-serif;">
                I don’t think my work defines me anymore. It is more like documenting where I was in time, what I cared about and who stood with me while I was closing in the gap between what I wanted and what I could actually build.
                
                <br>
                <br>
            </p>

            <p style="line-height: 1.7; font-size: 1.05rem; max-width: 700px; margin: auto; font-family: system-ui, sans-serif;">
                Anyway, that’s enough.
            </p>
        `;
    }
    
    setupEventListeners() {
        // Like button, mujhe bas pata chale, i don't want to slve it for the users
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
        this.setupBlogHeaderPill();
        
        // Setup interactive pill bouncing
        this.setupInteractivePills();
        
        // Action pill removed
        
        // Action pill removed
        
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
            
            // Real-time header pill color sync with progress bar
            this.syncHeaderPillColorWithProgress(progress);
        });
    }
    
    setupBlogHeaderPill() {
        const blogHeaderPill = document.getElementById('blogHeaderPill');
        if (!blogHeaderPill) return;
        
        let isCollapsed = false;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Clear timeout to debounce the scroll event
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                if (scrollY > 100 && !isCollapsed) {
                    // Shrink pill with super bouncy animation
                    this.shrinkHeaderPill(blogHeaderPill);
                    isCollapsed = true;
                } else if (scrollY <= 100 && isCollapsed) {
                    // Expand pill
                    this.expandHeaderPill(blogHeaderPill);
                    isCollapsed = false;
                }
            }, 30); // Smaller debounce for smoother response
        });
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
        // Blog header pill interactive bounce
        const blogHeaderPill = document.getElementById('blogHeaderPill');
        if (blogHeaderPill) {
            const headerContent = blogHeaderPill.querySelector('.header-pill-content');
            if (headerContent) {
                this.addInteractiveBounce(headerContent);
            }
        }
        
        // Action pill interactive bounce
        const actionPill = document.getElementById('actionPill');
        if (actionPill) {
            const actionContent = actionPill.querySelector('.action-pill-content');
            if (actionContent) {
                this.addInteractiveBounce(actionContent);
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
    
    setupActionPillTransformation() {
        // Action pill removed
        return;
    }
    
    transformToHorizontal(pill) {
        console.log('Transforming to horizontal - before:', pill.classList.toString());
        // Immediately change classes to prevent positioning jump
        pill.classList.remove('vertical');
        pill.classList.add('horizontal', 'transforming');
        console.log('Transforming to horizontal - after:', pill.classList.toString());
        
        // Ensure visibility
        pill.style.opacity = '1';
        pill.style.visibility = 'visible';
        
        setTimeout(() => {
            pill.classList.remove('transforming');
            console.log('Transform to horizontal complete:', pill.classList.toString());
        }, 1200);
    }
    
    transformToHorizontal(pill) {
        const content = pill.querySelector('.action-pill-content');
        if (!content) return;
        pill.classList.remove('vertical');
        content.classList.remove('pop-in', 'pop-out');
        content.classList.add('pop-out');
        setTimeout(() => {
            content.classList.remove('pop-out');
            pill.classList.add('horizontal');
            content.classList.add('pop-in');
            pill.style.opacity = '1';
            pill.style.visibility = 'visible';
            setTimeout(() => content.classList.remove('pop-in'), 240);
        }, 120);
    }

    transformToVertical(pill) {
        const content = pill.querySelector('.action-pill-content');
        if (!content) return;
        pill.classList.remove('horizontal');
        content.classList.remove('pop-in', 'pop-out');
        content.classList.add('pop-out');
        setTimeout(() => {
            content.classList.remove('pop-out');
            pill.classList.add('vertical');
            content.classList.add('pop-in');
            pill.style.opacity = '1';
            pill.style.visibility = 'visible';
            setTimeout(() => content.classList.remove('pop-in'), 240);
        }, 120);
    }
    
    syncPillColorWithProgress(scrollPercent) {
        const pillContent = document.querySelector('.action-pill-content');
        const progressBar = document.querySelector('.reading-progress-bar');
        
        if (!pillContent || !progressBar) return;
        
        // Get the progress bar color
        const progressColor = getComputedStyle(progressBar).backgroundColor;
        
        // Apply subtle tint to pill based on progress
        const opacity = Math.min(scrollPercent / 100, 0.3);
        const tintColor = progressColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        pillContent.style.setProperty('--progress-tint', tintColor);
    }
    
    syncHeaderPillColorWithProgress(scrollPercent) {
        const headerPillContent = document.querySelector('.blog-header-pill .header-pill-content');
        const progressBar = document.querySelector('.reading-progress-bar');
        
        if (!headerPillContent || !progressBar) return;
        
        // Get the progress bar color in real-time
        const progressColor = getComputedStyle(progressBar).backgroundColor;
        
        // Create glass-like reflection effect based on progress
        const intensity = Math.min(scrollPercent / 100, 0.4); // Stronger reflection
        
        // Parse RGB values for better color manipulation
        const rgbMatch = progressColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            const [, r, g, b] = rgbMatch;
            
            // Create multiple reflection layers like real glass
            const primaryReflection = `rgba(${r}, ${g}, ${b}, ${intensity * 0.6})`;
            const secondaryReflection = `rgba(${r}, ${g}, ${b}, ${intensity * 0.3})`;
            
            // Apply layered glass effect
            headerPillContent.style.setProperty('--progress-tint-primary', primaryReflection);
            headerPillContent.style.setProperty('--progress-tint-secondary', secondaryReflection);
            
            // Add subtle border reflection
            const borderReflection = `rgba(${r}, ${g}, ${b}, ${intensity * 0.8})`;
            headerPillContent.style.setProperty('--progress-border-tint', borderReflection);
            
            console.log(`Header pill reflection: ${intensity.toFixed(2)} intensity, color: ${progressColor}`);
        }
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
        
        // Update action pill like state
        this.updateActionPillLike();
        
        // Save to localStorage
        localStorage.setItem(`liked_${this.currentBlog.id}`, this.isLiked);
        
        // In a real app, send to API
        this.updateLikeOnServer();
    }
    
    // Toggle like from action pill
    toggleLikePill() {
        this.isLiked = !this.isLiked;
        
        if (this.isLiked) {
            this.likeCount++;
            this.showToast('Thanks for the like! ❤️');
            // Trigger floating hearts animation
            this.createFloatingHearts();
        } else {
            this.likeCount--;
        }
        
        // Update action pill
        this.updateActionPillLike();
        
        // Update footer like button if it exists
        const likeButton = document.getElementById('likeButton');
        if (likeButton) {
            likeButton.classList.toggle('liked', this.isLiked);
            const likeText = likeButton.querySelector('.like-text');
            if (likeText) {
                likeText.textContent = this.isLiked ? 'Liked' : 'Like';
            }
        }
        
        // Update like count in footer
        const likeCountEl = document.getElementById('likeCount');
        if (likeCountEl) {
            likeCountEl.textContent = this.likeCount;
        }
        
        // Save to localStorage
        localStorage.setItem(`liked_${this.currentBlog.id}`, this.isLiked);
        
        // In a real app, send to API
        this.updateLikeOnServer();
    }
    
    // Update action pill like state
    updateActionPillLike() {
        const likeAction = document.getElementById('likeAction');
        
        if (likeAction) {
            likeAction.classList.toggle('liked', this.isLiked);
        }
    }
    
    // Create floating hearts animation
    createFloatingHearts() {
        const heartsBackground = document.getElementById('heartsBackground');
        if (!heartsBackground) return;
        
        // Activate hearts background
        heartsBackground.classList.add('active');
        
        // Create multiple floating hearts
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createSingleHeart(heartsBackground);
            }, i * 150);
        }
        
        // Remove hearts background after animation
        setTimeout(() => {
            heartsBackground.classList.remove('active');
            heartsBackground.innerHTML = '';
        }, 2000);
    }
    
    // Create a single floating heart
    createSingleHeart(container) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 10 + 12 + 'px';
        heart.style.left = Math.random() * 60 + 10 + 'px';
        heart.style.bottom = '0px';
        heart.style.animation = `floatingHeart ${2 + Math.random()}s ease-out forwards`;
        heart.style.zIndex = '1';
        
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2500);
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
        // Generate PNG image and share
        this.generateShareableImage().then(imageBlob => {
            const shareText = `${this.currentBlog.title}\n${window.location.href}`;
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([imageBlob], 'article-share.png', { type: 'image/png' })] })) {
                // Share with image
                const file = new File([imageBlob], 'article-share.png', { type: 'image/png' });
                navigator.share({
                    title: this.currentBlog.title,
                    text: shareText,
                    url: window.location.href,
                    files: [file]
                }).catch(console.error);
            } else if (navigator.share) {
                // Fallback to text-only share
                navigator.share({
                    title: this.currentBlog.title,
                    text: shareText,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Download image and copy link
                this.downloadImage(imageBlob, 'article-share.png');
                this.copyLink();
                this.showToast('Image downloaded and link copied! 📸');
            }
        }).catch(error => {
            console.error('Error generating share image:', error);
            // Fallback to regular sharing
            const shareText = `${this.currentBlog.title}\n${window.location.href}`;
            if (navigator.share) {
                navigator.share({
                    title: this.currentBlog.title,
                    text: shareText,
                    url: window.location.href
                }).catch(console.error);
            } else {
                this.copyLink();
            }
        });
    }
    
    async generateShareableImage() {
        return new Promise((resolve, reject) => {
            try {
                // Create canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set canvas dimensions (Instagram post size)
                canvas.width = 1080;
                canvas.height = 1080;
                
                // Blue accent gradient background
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, '#1e3a8a'); // Deep blue
                gradient.addColorStop(0.5, '#3b82f6'); // Blue
                gradient.addColorStop(1, '#1d4ed8'); // Blue-700
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Add subtle pattern overlay
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                for (let i = 0; i < canvas.width; i += 60) {
                    for (let j = 0; j < canvas.height; j += 60) {
                        ctx.fillRect(i, j, 30, 30);
                    }
                }
                
                // White content area
                const contentMargin = 80;
                const contentWidth = canvas.width - (contentMargin * 2);
                const contentHeight = canvas.height - (contentMargin * 2);
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                this.drawRoundedRect(ctx, contentMargin, contentMargin, contentWidth, contentHeight, 20);
                ctx.fill();
                
                // Article title
                ctx.fillStyle = '#1f2937';
                ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
                ctx.textAlign = 'center';
                
                const title = this.currentBlog.title;
                const words = title.split(' ');
                const maxWidth = contentWidth - 120;
                let lines = [];
                let currentLine = '';
                
                // Word wrap for title
                words.forEach(word => {
                    const testLine = currentLine + (currentLine ? ' ' : '') + word;
                    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                });
                if (currentLine) lines.push(currentLine);
                
                // Draw title lines
                const titleStartY = 250;
                const lineHeight = 60;
                lines.forEach((line, index) => {
                    ctx.fillText(line, canvas.width / 2, titleStartY + (index * lineHeight));
                });
                
                // Accent underline below title
                const underlineY = titleStartY + (lines.length * lineHeight) + 24;
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(canvas.width / 2 - 120, underlineY, 240, 6);

                // Article metadata (author • read time)
                ctx.font = '500 34px system-ui, -apple-system, sans-serif';
                ctx.fillStyle = '#64748b';
                const metaY = underlineY + 64;
                ctx.fillText(`By ${this.currentBlog.author} • ${this.currentBlog.readTime}`, canvas.width / 2, metaY);
                
                // Bottom branding
                const bottomY = canvas.height - 200;
                
                // "Vishrut's Blog"
                ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
                ctx.fillStyle = '#1e3a8a';
                ctx.fillText("Vishrut's Blog", canvas.width / 2, bottomY);
                
                // "A Vatsa Production"
                ctx.font = '300 24px system-ui, -apple-system, sans-serif';
                ctx.fillStyle = '#6b7280';
                ctx.fillText("A Vatsa Production", canvas.width / 2, bottomY + 50);
                
                // Convert to blob
                canvas.toBlob(resolve, 'image/png', 0.9);
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    wrapText(ctx, text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            if (ctx.measureText(testLine).width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        if (currentLine) lines.push(currentLine);
        
        return lines;
    }
    
    drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
    
    downloadImage(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
        // Restore like status with enhanced persistence
        const savedLike = localStorage.getItem(`blog-${this.currentBlog.id}-liked`);
        const savedLikeCount = localStorage.getItem(`blog-${this.currentBlog.id}-likes`);
        
        if (savedLike === 'true') {
            this.isLiked = true;
            // Update footer like button if it exists
            const likeButton = document.getElementById('likeButton');
            if (likeButton) {
                likeButton.classList.add('liked');
                const likeText = likeButton.querySelector('.like-text');
                if (likeText) likeText.textContent = 'Liked';
            }
            
            // Update action pill like state
            this.updateActionPillLike();
        }
        
        if (savedLikeCount) {
            this.likeCount = parseInt(savedLikeCount, 10);
            // Update like count displays
            const likeCountEl = document.getElementById('likeCount');
            if (likeCountEl) {
                likeCountEl.textContent = this.likeCount;
            }
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
    
    // Method to track reading progress (for analytics), itna kon karta hai iss zamane mein
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

// Enhanced Theme Manager for blog post page, lol
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
    
    // Make globally available for debugging, chutiya code hai
    window.blogPostManager = blogPostManager;
    window.themeManager = themeManager;
    
    console.log('Blog post page initialized successfully! 📖');
    console.log('Keyboard shortcuts:');
    console.log('- L: Toggle like');
    console.log('- F: Toggle focus mode');
    console.log('- B: Toggle bookmark');
    console.log('- Ctrl/Cmd + ↑: Scroll to top');
});