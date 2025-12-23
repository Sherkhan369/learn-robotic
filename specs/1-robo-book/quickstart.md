# Quick Start Guide: Physical AI & Humanoid Robotics Textbook

## Overview
This guide provides a quick setup and development workflow for the Physical AI & Humanoid Robotics textbook project using Docusaurus with TypeScript.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- A code editor (VS Code recommended)

## Setup Instructions

### 1. Clone and Initialize the Repository
```bash
# Navigate to the project directory
cd D:\GIAIC\hackathons\robotic-book

# Install dependencies
cd frontend
npm install
# or
yarn install
```

### 2. Development Server
```bash
# Start the development server
npm run start
# or
yarn start
```

This will start the development server at `http://localhost:3000` with hot reloading enabled.

### 3. Project Structure
```
frontend/
├── docs/                    # Content files (MDX/Markdown)
│   ├── intro.md            # Introduction page
│   ├── module-1/           # Module 1: The Robotic Nervous System (ROS 2)
│   │   ├── chapter-1.mdx
│   │   ├── chapter-2.mdx
│   │   ├── chapter-3.mdx
│   │   └── chapter-4.mdx
│   ├── module-2/           # Module 2: The Digital Twin (Gazebo & Unity)
│   │   ├── chapter-1.mdx
│   │   ├── chapter-2.mdx
│   │   ├── chapter-3.mdx
│   │   └── chapter-4.mdx
│   ├── module-3/           # Module 3: The AI-Robot Brain (NVIDIA Isaac™)
│   │   ├── chapter-1.mdx
│   │   ├── chapter-2.mdx
│   │   ├── chapter-3.mdx
│   │   └── chapter-4.mdx
│   └── module-4/           # Module 4: Vision-Language-Action (VLA)
│       ├── chapter-1.mdx
│       ├── chapter-2.mdx
│       ├── chapter-3.mdx
│       └── chapter-4.mdx   # Capstone project
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/              # Additional pages
│   └── css/                # Custom styles
├── static/                 # Static assets (images, files)
├── docusaurus.config.ts    # Main Docusaurus configuration
├── sidebars.ts             # Navigation sidebar configuration
└── package.json            # Project dependencies and scripts
```

## Content Creation Workflow

### 1. Adding a New Chapter
1. Create a new `.mdx` file in the appropriate module directory
2. Add proper frontmatter with metadata:

```mdx
---
title: Chapter Title
description: Brief description of the chapter
sidebar_position: 1
---

# Chapter Title

Your chapter content here...

## Learning Objectives

- Objective 1
- Objective 2
- Objective 3

## Content Sections

Your content sections here...
```

2. Update `sidebars.ts` to include the new chapter in the navigation

### 2. Using Educational Components
The textbook includes special components for educational content:

```mdx
import { LearningObjective, KeyTakeaway, Exercise } from '@site/src/components/Educational';

<LearningObjective>
- Understand the basics of ROS 2 architecture
- Identify key components of a ROS 2 system
</LearningObjective>

<Exercise>
**Exercise 1.1:** Create a simple ROS 2 publisher node in Python.
</Exercise>

<KeyTakeaway>
ROS 2 uses a distributed architecture with nodes communicating through topics, services, and actions.
</KeyTakeaway>
```

### 3. Adding Code Examples
Use standard Markdown code blocks with appropriate language tags:

```python
# ROS 2 Python example
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
```

## Building and Deployment

### 1. Build for Production
```bash
npm run build
# or
yarn build
```

This creates a static site in the `build/` directory.

### 2. Local Testing of Production Build
```bash
npm run serve
# or
yarn serve
```

### 3. Deployment to GitHub Pages
The project is configured for GitHub Pages deployment:

1. The `docusaurus.config.ts` includes GitHub Pages deployment settings
2. Use the following command to deploy:
```bash
npm run deploy
# or
yarn deploy
```

## Development Commands

```bash
# Start development server
npm run start

# Build static site
npm run build

# Deploy to GitHub Pages
npm run deploy

# Run tests
npm run test

# Serve production build locally
npm run serve

# Clear cache
npm run clear
```

## Content Guidelines

### 1. Educational Content Standards
- Include learning objectives at the beginning of each chapter
- Add key takeaways at the end of each chapter
- Include exercises and practical examples
- Use progressive complexity (simple to advanced concepts)
- Include cross-references to related content

### 2. Writing Style
- Use clear, concise language
- Include practical examples with code
- Add visual aids (diagrams, images) where appropriate
- Maintain consistent terminology throughout
- Follow accessibility guidelines (alt text, semantic HTML)

### 3. Technical Accuracy
- Verify all code examples work
- Include version information for tools and libraries
- Note any platform-specific considerations
- Include troubleshooting sections where appropriate

## Testing

### 1. Content Testing
- Verify all navigation links work
- Test code examples in appropriate environments
- Check responsive design on different screen sizes
- Validate accessibility features

### 2. Automated Testing
```bash
# Run unit tests
npm run test:unit

# Run end-to-end tests
npm run test:e2e
```

## Troubleshooting

### Common Issues
1. **Content not showing up**: Check that the file is properly referenced in `sidebars.ts`
2. **Images not loading**: Ensure images are in the `static/` directory and use proper paths
3. **Component errors**: Check that all components are properly imported
4. **Build failures**: Clear cache with `npm run clear` and reinstall dependencies

### Getting Help
- Check the project specification in `specs/1-robo-book/spec.md`
- Review the implementation plan in `specs/1-robo-book/plan.md`
- Look at existing content for examples of proper formatting