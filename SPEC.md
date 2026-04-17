# Minea Chhay - Professional Resume Website Specification

## 1. Concept & Vision

A premium executive-level personal resume website that combines the sophistication of a corporate landing page with the interactivity of a modern portfolio. The aesthetic is "dark executive luxury" — deep charcoal backgrounds with subtle gold/amber accents, glassmorphism cards, and cinematic motion design. The experience should feel like entering a high-end tech executive's digital presence — confident, polished, and memorable.

## 2. Design Language

### Aesthetic Direction
- **Reference**: Corporate executive dashboard meets creative portfolio
- **Mood**: Confident, professional, innovative, premium
- **Key Elements**: Glassmorphism, subtle gradients, floating particles, smooth reveals

### Color Palette
```
--bg-primary: #0a0a0f          /* Deep space black */
--bg-secondary: #12121a       /* Elevated dark */
--bg-tertiary: #1a1a24         /* Card backgrounds */
--accent-primary: #d4a853      /* Executive gold */
--accent-secondary: #e8c47c    /* Light gold */
--accent-glow: rgba(212, 168, 83, 0.3)  /* Gold glow */
--text-primary: #ffffff        /* Pure white */
--text-secondary: #b8b8c8      /* Muted silver */
--text-tertiary: #6b6b7b       /* Subtle gray */
--glass-bg: rgba(255, 255, 255, 0.05)
--glass-border: rgba(255, 255, 255, 0.1)
--gradient-start: #d4a853
--gradient-end: #8b6914
```

### Typography
- **Primary Font**: 'Segoe UI', system-ui, -apple-system, sans-serif
- **Display Font**: Same family, heavier weights for impact
- **Scale**: 16px base, 1.25 ratio for hierarchy
- **Headings**: Bold, slightly tighter letter-spacing (-0.02em)

### Spatial System
- Base unit: 8px
- Section padding: 100px vertical (desktop), 60px (mobile)
- Card padding: 32px
- Grid gaps: 24px (cards), 40px (sections)

### Motion Philosophy
- **Entrance**: Elements fade up (translateY: 40px → 0) with opacity transition, staggered 100ms
- **Scroll reveals**: Triggered at 15% viewport threshold, once per element
- **Hover states**: 300ms ease-out transitions, subtle scale (1.02) and glow effects
- **Background**: Slow-moving gradient animations (20-30s loops), floating particle effects
- **Counters**: Number animations over 2s with easing

### Visual Assets
- **Icons**: Inline SVG icons for all UI elements
- **Decorative**: CSS-generated floating shapes, gradient orbs, grid patterns
- **Profile placeholder**: Styled div with initials (easily replaceable with actual photo)

## 3. Layout & Structure

### Page Architecture
1. **Navigation**: Fixed top, transparent → glass effect on scroll, logo + nav links + CTA
2. **Hero**: Full viewport height, centered content, animated background
3. **About**: Two-column layout (text + visual element)
4. **Stats**: Horizontal card grid with animated counters
5. **Experience**: Vertical timeline with alternating cards
6. **Skills**: Categorized grid with progress indicators
7. **Education**: Card-based layout
8. **Certifications**: Animated card grid
9. **References**: Clean card layout with contact details
10. **Gallery**: Placeholder grid with category labels
11. **Contact**: Centered CTA section with contact details
12. **Footer**: Minimal with social links

### Responsive Strategy
- Desktop: 1200px max-width container
- Tablet: 768px breakpoint, single/two column layouts
- Mobile: 480px breakpoint, full-width stacked layout
- Navigation collapses to hamburger menu on mobile

## 4. Features & Interactions

### Hero Section
- Large display name with subtle text gradient
- Rotating subtitle with typewriter effect (3s display, 100ms type speed)
- Animated background: gradient mesh + floating geometric shapes
- Three CTA buttons with distinct hover effects
- Scroll indicator animation

### Navigation
- Smooth scroll to sections on click
- Active section detection and highlighting
- Background blur + glass effect after 50px scroll
- Mobile hamburger menu with slide-in overlay

### Stat Cards
- Animated number counters (0 → target value)
- Staggered entrance animation
- Subtle hover lift effect

### Timeline (Experience)
- Vertical line with animated draw-in
- Cards alternate left/right (desktop)
- Cards stack on mobile
- Each card has icon, title, company, date, location
- Hover reveals subtle glow

### Skills Section
- Category tabs/filtering (optional enhancement)
- Progress bars with animated fill
- Hover effect on skill items

### Education & Certifications
- Card grid with hover lift
- Subtle border glow on hover

### Contact Section
- Large CTA headline
- Contact details displayed
- Social/email icons with hover effects

### Scroll Animations (Intersection Observer)
- Elements fade up into view
- Staggered delays for grouped items
- Once-only animation (no repeat on scroll up)

## 5. Component Inventory

### Navigation Bar
- States: Default (transparent), Scrolled (glass), Mobile (hamburger)
- Links have underline animation on hover
- Active link has gold accent color

### Button (Primary)
- Default: Gold gradient background, dark text
- Hover: Brightness increase, subtle scale
- Active: Slight scale down
- Disabled: Grayscale, reduced opacity

### Button (Secondary)
- Default: Transparent, gold border, gold text
- Hover: Gold background, dark text
- Active: Brightness decrease

### Card (Glass)
- Default: Glass background, subtle border
- Hover: Border glow, slight lift (translateY -4px)

### Timeline Item
- Default: Card with left border accent
- In-view: Fade up animation
- Hover: Enhanced shadow, border glow

### Progress Bar
- Track: Dark background
- Fill: Gold gradient, animated width
- Label: Skill name + percentage

### Stat Counter
- Number: Large display font
- Label: Secondary text below
- Animation: Count up on scroll-in

### Form Input (Contact)
- Default: Dark background, subtle border
- Focus: Gold border, glow
- Error: Red border

## 6. Technical Approach

### Architecture
- Single-page application structure
- Pure HTML5 semantic markup
- CSS3 with custom properties for theming
- Vanilla JavaScript ES6+

### Key Implementation Details
- CSS custom properties for all colors/spacing
- CSS Grid + Flexbox for layouts
- CSS animations + transitions (no libraries)
- Intersection Observer API for scroll effects
- RequestAnimationFrame for counter animations
- Smooth scroll behavior via CSS

### Performance Considerations
- Minimal DOM manipulation
- CSS transforms for animations (GPU accelerated)
- Lazy animation triggers (only when in view)
- Efficient event delegation
- No external dependencies

### File Structure
```
/resume-website/
├── index.html      # Complete semantic HTML
├── style.css       # All styles with CSS variables
├── script.js       # All interactions and animations
└── SPEC.md         # This specification
```

## 7. Content Placeholders

### Profile Image
- Location in HTML: Hero section, comment indicated
- Suggested: Replace styled div with actual photo
- Recommended size: 400x400px

### CV Download
- Location in HTML: Hero CTA button
- Filename: cv-minea-chhay.pdf
- Path: ./cv-minea-chhay.pdf

### Gallery Images
- Location in HTML: Gallery section
- Suggested: 6 placeholder cards for different categories
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
