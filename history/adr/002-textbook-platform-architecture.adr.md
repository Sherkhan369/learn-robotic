# ADR-002: Textbook Platform Architecture with Educational Features

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-12-22
- **Feature:** 1-robo-book
- **Context:** Need to create a comprehensive educational platform for the Physical AI & Humanoid Robotics textbook that supports structured learning with 4 modules (16 chapters total), each containing learning objectives, exercises, and progressive complexity. The platform must adhere to accessibility standards (WCAG 2.1 AA), provide responsive design, and support educational content formats like MDX with embedded interactive components.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Use a Docusaurus-based educational platform architecture with structured content model and educational features:

- Framework: Docusaurus 3.x with TypeScript template
- Content Structure: Hierarchical organization (Textbook → Modules → Chapters → Educational Elements)
- Educational Components: Learning objectives, key takeaways, exercises, and examples as reusable MDX components
- Accessibility: WCAG 2.1 AA compliance with semantic HTML and proper navigation
- Content Format: MDX for rich educational content with React component integration
- Deployment: Static site generation for GitHub Pages hosting
- Performance: <3 second page load times with optimization techniques

## Consequences

### Positive

- Structured curriculum delivery following pedagogical best practices
- Built-in documentation features that support educational content (search, navigation, versioning)
- Accessible content that meets educational standards for diverse learners
- Fast performance that enhances learning experience
- Support for rich content including code examples, diagrams, and interactive elements
- Mobile-responsive design for learning on various devices
- Clear content hierarchy that supports learning pathways
- Reusable educational components that maintain consistency across the textbook
- TypeScript support for maintainability and error prevention

### Negative

- Learning curve for content creators unfamiliar with MDX syntax
- Requires technical knowledge to create complex educational components
- Static site limitations for real-time collaboration or advanced interactivity
- Content management complexity as the textbook scales
- Dependency on Docusaurus ecosystem for educational features
- Potential challenges with complex interactive simulations

## Alternatives Considered

Alternative A: Traditional Learning Management System (LMS) approach
- Pros: Built-in user tracking, assessments, progress monitoring, classroom features
- Cons: More complex architecture, database requirements, higher costs, less control over educational content presentation
- Rejected: Over-engineering for static textbook content, would require backend infrastructure

Alternative B: Custom educational platform with full-featured CMS
- Pros: Complete control over educational features, custom assessment tools, user progress tracking
- Cons: Significant development time, maintenance overhead, need to implement educational features from scratch
- Rejected: Docusaurus provides sufficient educational features out-of-the-box with less development effort

Alternative C: Simple static site with plain HTML/CSS
- Pros: Maximum simplicity, full control over presentation, minimal dependencies
- Cons: Manual maintenance of navigation, no built-in search, no educational content features, difficult to maintain consistency
- Rejected: Would require implementing documentation features manually and lack educational content support

## References

- Feature Spec: specs/1-robo-book/spec.md
- Implementation Plan: specs/1-robo-book/plan.md
- Data Model: specs/1-robo-book/data-model.md
- Research: specs/1-robo-book/research.md
- Related ADRs: ADR-001 (Static Site Architecture for Educational Textbook)
- Evaluator Evidence: PHR records in history/prompts/