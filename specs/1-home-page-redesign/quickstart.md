# Quickstart Guide: Home Page Redesign for Robotic Textbook

## Overview

This guide provides the essential information needed to understand and work with the redesigned home page for the Physical AI & Humanoid Robotics textbook.

## Key Components

### Main Home Page (index.tsx)
- Located at: `frontend/src/pages/index.tsx`
- Contains the hero section, module showcase, and call-to-action sections
- Uses Docusaurus Layout and Link components
- Implements responsive design with CSS modules

### Home Page Styles (index.module.css)
- Located at: `frontend/src/pages/index.module.css`
- Contains all styling for the home page components
- Implements responsive breakpoints for mobile and tablet
- Uses gradient backgrounds and hover effects

### Homepage Features Component
- Located at: `frontend/src/components/HomepageFeatures/index.tsx`
- Displays the three main value propositions of the textbook
- Customized with robotics-focused content
- Uses CSS modules for styling

## Integration Points

### Navigation Integration
- Links to `/docs/intro` for the introduction
- Links to `/docs/module-1/chapter-1` for direct access to first module
- Links to individual modules follow the pattern `/docs/module-X/chapter-1`

### Docusaurus Configuration
- Uses the title and tagline from `docusaurus.config.ts`
- Follows the site's color scheme and branding
- Compatible with existing sidebar navigation

## Development Workflow

### Local Development
1. Navigate to the frontend directory: `cd frontend`
2. Start the development server: `npm run start`
3. The home page will be available at `http://localhost:3000`

### Building for Production
1. Run `npm run build` to create the production build
2. The home page will be included in the static site

### Testing Changes
- Verify responsive design on different screen sizes
- Check all navigation links work correctly
- Ensure accessibility features function properly
- Test load time performance

## Customization Points

### Adding New Modules
- Update the `HomepageModules` component in `index.tsx`
- Add new module cards with appropriate icons and descriptions
- Update the CSS grid layout if adding more than 4 modules

### Styling Updates
- Modify `index.module.css` for hero section and main layout changes
- Update `HomepageFeatures/styles.module.css` for feature section styling
- Adjust color scheme variables if needed

## Performance Considerations

- Page load time should remain under 3 seconds
- Optimize images and assets for fast loading
- Use efficient CSS selectors
- Minimize JavaScript bundle size