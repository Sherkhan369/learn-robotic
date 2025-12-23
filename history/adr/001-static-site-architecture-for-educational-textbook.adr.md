# ADR-001: Static Site Architecture for Educational Textbook

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-12-22
- **Feature:** 1-robo-book
- **Context:** Need to create a scalable, maintainable, and SEO-friendly textbook website for Physical AI & Humanoid Robotics with 4 modules (16 chapters total), introduction page, and capstone project section. The solution must support educational content with learning objectives, step-by-step tutorials, and fast loading times.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Use a static site generator approach with Docusaurus framework for the textbook website:

- Framework: Docusaurus 3.x with TypeScript template
- Content Management: Markdown/MDX files in docs/ directory
- Build System: Node.js with npm/yarn
- Target: Static file deployment (no database required)
- Features: Built-in search, sidebar navigation, mobile-responsive design

## Consequences

### Positive

- Fast page loading times (<3s) due to pre-built static assets
- Excellent SEO performance with server-side rendering
- Simple hosting requirements (any static file server)
- Built-in documentation features (sidebar navigation, search, versioning)
- Strong TypeScript support for type safety
- Active community and good documentation
- Mobile-responsive by default
- Built-in features for educational content (code blocks, math support)

### Negative

- Requires Node.js environment for building
- Learning curve for Docusaurus-specific features
- Less flexibility for dynamic content (though MDX provides some interactivity)
- Potential build time increases as content grows
- Dependency on Docusaurus ecosystem
- Limited server-side functionality (no user data, real-time features)

## Alternatives Considered

Alternative A: Traditional CMS approach (e.g., WordPress, Contentful)
- Pros: WYSIWYG editing, user management, dynamic content
- Cons: More complex hosting, database requirements, slower performance, higher costs
- Rejected: Over-engineering for static textbook content

Alternative B: Custom React application with routing
- Pros: Full control over architecture, custom features possible
- Cons: More development time, need to implement documentation features from scratch, more complex build process
- Rejected: Docusaurus already provides needed features out-of-the-box

Alternative C: Jekyll/Gatsby-based solution
- Pros: Proven static site solutions, good performance
- Cons: Less educational content focus, less documentation-specific features than Docusaurus
- Rejected: Docusaurus is specifically designed for documentation sites and educational content

## References

- Feature Spec: specs/1-robo-book/spec.md
- Implementation Plan: specs/1-robo-book/plan.md
- Related ADRs: None
- Evaluator Evidence: PHR records in history/prompts/