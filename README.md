# Vishrut Vatsa's Blog

A premium, responsive blog website built with modern web technologies.

## Features

### 🎨 Premium Design
- Dark theme with beautiful gradients and animations
- Mobile-first responsive design
- Smooth transitions and hover effects
- Modern typography with Inter and JetBrains Mono fonts

### 📱 Mobile Optimized
- Perfect responsiveness across all device sizes
- Touch-friendly interface
- Optimized loading and performance
- Accessibility features built-in

### ⚡ Dynamic Functionality
- Real-time search functionality
- Category filtering
- Lazy loading with "Load More" feature
- Interactive blog cards
- Keyboard shortcuts (Ctrl/Cmd + K for search)

### 🔧 Technical Features
- Vanilla JavaScript (no dependencies)
- CSS Grid and Flexbox layouts
- Intersection Observer for performance
- Local storage for preferences
- SEO optimized with meta tags

## File Structure

```
vishyblogs.github.io-main/
├── index.html          # Main HTML structure
├── styles.css          # Premium CSS styles
├── script.js           # Dynamic functionality
├── README.md           # This file
└── LICENSE             # License file
```

## Quick Start

1. Open `index.html` in your browser
2. The blog loads with sample articles
3. Use the search bar to find specific content
4. Filter by categories: Technology, Development, Tutorial, Project
5. Click on any blog card to view details (placeholder functionality)

## Customization

### Adding New Blog Posts

Edit the `loadSampleData()` method in `script.js` to add new blog posts:

```javascript
{
    id: 10,
    title: "Your Blog Post Title",
    excerpt: "A brief description of your post...",
    content: "Full article content...",
    category: "technology", // technology, development, tutorial, project
    date: "2024-01-20",
    readTime: "5 min read",
    tags: ["tag1", "tag2", "tag3"],
    featured: false
}
```

### Styling Customization

The CSS uses CSS custom properties (variables) for easy theming. Key variables in `:root`:

- `--accent-primary`: Main accent color
- `--accent-secondary`: Secondary accent color
- `--bg-primary`: Main background color
- `--text-primary`: Main text color

### Social Links

Update the social links in `index.html`:

```html
<a href="https://twitter.com/yourusername" class="social-link" aria-label="Twitter">
<a href="https://github.com/yourusername" class="social-link" aria-label="GitHub">
<a href="https://linkedin.com/in/yourusername" class="social-link" aria-label="LinkedIn">
```

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- Lazy loading for images
- Debounced search input
- Efficient DOM manipulation
- CSS animations with `prefers-reduced-motion` support
- Optimized for Core Web Vitals

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast mode support
- Screen reader friendly

## Future Enhancements

- Individual blog post pages
- Content Management System integration
- Light/dark theme toggle
- Social sharing buttons
- Comment system
- RSS feed generation
- Search engine optimization
- Analytics integration

## License

See the [LICENSE](LICENSE) file for license rights and limitations.

---

Built with ❤️ by Vishrut Vatsa