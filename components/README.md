# Timeline Component - Documentation

## Installation & Setup

### 1. Install Dependencies
```bash
npm install gsap
# or
yarn add gsap
```

### 2. Import Component
```jsx
import Timeline from './components/Timeline';
import './components/Timeline.css'; // Optional CSS enhancements
```

### 3. Usage
```jsx
function App() {
  return (
    <div>
      <HeroSection />
      <Timeline />
      <OtherSections />
    </div>
  );
}
```

## Configuration Options

### Tunable Animation Parameters

```javascript
// In Timeline.jsx, find these configurable values:

// Scroll trigger timing
scrollTrigger: {
  start: "top 60%",     // When animation starts
  end: "bottom 40%",    // When animation ends
  scrub: 0.6,          // 0.4-0.8 recommended (0.6 = slight inertia)
}

// Animation timing
gsap.defaults({ 
  ease: "power3.out",   // power1.out to power4.out
  duration: 0.95        // 0.8-1.2s recommended
});

// Step activation sensitivity
const isActive = distance < 0.15; // 0.1-0.2 range
```

### Adding More Steps

```javascript
const timelineSteps = [
  {
    id: 5,
    number: "05",
    title: "New Step Title",
    duration: "Date Range",
    description: "Step description text"
  }
  // Add more steps here...
];
```

### Customizing the SVG Path

```javascript
// Modify the path 'd' attribute for different curves
d="M 100 100 Q 300 50 400 150 Q 500 250 600 200..."

// Tips for path creation:
// - M = Move to point
// - Q = Quadratic curve
// - L = Line to point
// - Use online SVG path editors for visual design
```

## Performance Checklist ✅

### 🚀 Hardware Acceleration
- [x] Uses `transform: translateZ(0)` for GPU layers
- [x] Animates only `transform` and `opacity` properties
- [x] Avoids layout-triggering properties (`top`, `left`, `width`, `height`)
- [x] Uses `will-change` hints for optimization

### 📱 Memory Management
- [x] Cleans up ScrollTrigger instances on unmount
- [x] Removes event listeners properly
- [x] Uses `gsap.killTweensOf()` to prevent memory leaks
- [x] Lazy-loads non-critical animations

### 🎨 Rendering Optimization
- [x] Uses inline SVG for reduced HTTP requests
- [x] Compresses SVG paths for smaller payload
- [x] Minimizes paint operations with composite layers
- [x] Uses `pointer-events: none` on decorative elements

### ♿ Accessibility
- [x] Respects `prefers-reduced-motion` setting
- [x] Keyboard navigation support (Tab/Enter)
- [x] ARIA labels and roles
- [x] Focus management with visible indicators
- [x] High contrast mode support

### 📱 Responsive Design
- [x] Mobile-first approach
- [x] Breakpoints: 640px, 768px, 1024px
- [x] Touch-friendly interaction areas (44px minimum)
- [x] Scalable SVG paths

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| GSAP ScrollTrigger | ✅ | ✅ | ✅ | ✅ |
| CSS Transforms | ✅ | ✅ | ✅ | ✅ |
| SVG Animations | ✅ | ✅ | ✅ | ✅ |
| backdrop-filter | ✅ | ✅ | ✅ | ✅ |

## Performance Monitoring

### Key Metrics to Watch
```javascript
// Add to your analytics
performance.mark('timeline-start');
// ... timeline animations
performance.mark('timeline-end');
performance.measure('timeline-duration', 'timeline-start', 'timeline-end');
```

### Lighthouse Scores to Target
- **Performance**: > 90
- **Accessibility**: 100
- **Best Practices**: > 90
- **SEO**: > 90

## Troubleshooting

### Common Issues

#### 1. Animations Not Working
```javascript
// Check GSAP plugins are registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}
```

#### 2. Poor Performance
```javascript
// Reduce animation complexity
scrub: 0.8,        // Increase for less frequent updates
ease: "none",      // Use for smoother performance
duration: 0.5      // Reduce for faster animations
```

#### 3. Mobile Responsiveness
```css
/* Force single column on small screens */
@media (max-width: 768px) {
  .timeline-step {
    flex-direction: column !important;
    text-align: center !important;
  }
}
```

## Advanced Customization

### Custom Pin Icon
```jsx
// Replace the default pin with your brand icon
<div ref={pinRef} className="absolute w-8 h-8 z-20">
  <YourBrandIcon />
</div>
```

### Different Color Scheme
```css
/* Update CSS custom properties */
:root {
  --timeline-primary: #1f3fff;
  --timeline-secondary: #8B5CF6;
  --timeline-accent: #06B6D4;
}
```

### Animation Variants
```javascript
// Bounce effect
ease: "back.out(1.7)"

// Elastic effect  
ease: "elastic.out(1, 0.3)"

// Custom cubic-bezier
ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
```

## License & Credits

- GSAP: Commercial license required for commercial projects
- Component: MIT License
- Inspired by Hacknitr timeline designs