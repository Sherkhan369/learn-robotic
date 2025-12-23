# Data Model: Physical AI & Humanoid Robotics Textbook

## Overview
This document defines the data models and entities for the Physical AI & Humanoid Robotics textbook content structure.

## Core Entities

### 1. Textbook Content
**Description**: The main educational content of the textbook
**Fields**:
- id: string (unique identifier for the textbook)
- title: string (Physical AI & Humanoid Robotics Textbook)
- description: string (educational material on robotics and AI)
- version: string (version of the textbook content)
- createdAt: Date
- updatedAt: Date

### 2. Learning Module
**Description**: One of the four main curriculum modules
**Fields**:
- id: string (unique identifier for the module)
- title: string (e.g., "The Robotic Nervous System (ROS 2)")
- description: string (brief description of the module)
- order: number (1-4, defines the sequence)
- learningObjectives: string[] (educational goals for the module)
- prerequisites: string[] (required knowledge before starting)
- textbookId: string (reference to parent textbook)

**Relationships**:
- One Textbook Content has many Learning Modules
- One Learning Module has many Chapters

### 3. Chapter
**Description**: Individual chapter within a learning module
**Fields**:
- id: string (unique identifier for the chapter)
- title: string (chapter title)
- description: string (brief overview of chapter content)
- order: number (1-4, defines sequence within module)
- learningObjectives: string[] (specific goals for this chapter)
- content: string (the actual chapter content in MDX format)
- estimatedReadingTime: number (in minutes)
- moduleId: string (reference to parent module)

**Relationships**:
- One Learning Module has many Chapters
- One Chapter belongs to one Learning Module

### 4. Educational Element
**Description**: Reusable educational components within chapters
**Fields**:
- id: string (unique identifier)
- type: string (e.g., "learning-objective", "key-takeaway", "exercise", "example", "diagram")
- content: string (the actual educational content)
- chapterId: string (reference to parent chapter)

**Relationships**:
- One Chapter has many Educational Elements

### 5. Navigation Structure
**Description**: Defines the site navigation and hierarchy
**Fields**:
- id: string (unique identifier)
- label: string (display name in navigation)
- path: string (URL path for the page)
- order: number (position in navigation)
- parentId: string (for hierarchical structure)
- isExternal: boolean (if navigation points to external resource)

## Validation Rules

### Textbook Content
- title must not be empty
- version must follow semantic versioning format
- createdAt and updatedAt must be valid dates

### Learning Module
- title must not be empty
- order must be between 1 and 4
- learningObjectives must contain at least one objective
- description must not exceed 500 characters

### Chapter
- title must not be empty
- order must be between 1 and 4
- content must be in valid MDX format
- estimatedReadingTime must be a positive number
- moduleId must reference an existing module

### Educational Element
- type must be one of the defined types
- content must not be empty
- chapterId must reference an existing chapter

## State Transitions

### Chapter States
- DRAFT: Content is being written
- REVIEW: Content is under review
- APPROVED: Content is approved for publication
- PUBLISHED: Content is live on the site

### Module States
- PLANNING: Module structure is being defined
- IN_PROGRESS: Chapters are being written
- COMPLETE: All chapters are written and reviewed
- PUBLISHED: Module is live on the site

## Content Relationships

The data model supports:
1. Hierarchical organization (Textbook → Modules → Chapters)
2. Cross-module references for capstone integration
3. Reusable educational elements
4. Navigation structure independent of content structure
5. Versioning for content updates

## Access Patterns

### Primary Queries
1. Get all modules for a textbook (for navigation)
2. Get chapters for a specific module (for module view)
3. Get content for a specific chapter (for chapter view)
4. Get navigation structure (for site navigation)

### Secondary Queries
1. Search across all content
2. Get all educational elements of a specific type
3. Get content statistics (reading time, word count, etc.)