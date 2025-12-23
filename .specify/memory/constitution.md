<!--
Sync Impact Report:
Version change: N/A → 1.0.0
Added sections: All sections (initial constitution creation)
Modified principles: None (new principles created)
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending
Runtime docs requiring updates:
  - README.md ⚠ pending
-->
# RoboLearn Platform Constitution
<!-- Constitution for the Textbook for Teaching Physical AI & Humanoid Robotics Course -->

## Core Principles

### I. SDD-RI Methodology (NON-NEGOTIABLE)
All development follows the Spec-Driven Development with Reusable Intelligence (SDD-RI) methodology: specifications written → user approved → implementation follows; Every feature must have reusable intelligence components via Claude Code Subagents and Agent Skills; Documentation and code must be aligned with spec-first approach.

### II. Educational Excellence and Learning Science
Content must be designed with proven learning science principles: chunked information, progressive complexity, hands-on exercises, and personalized pathways based on user's software/hardware background; All modules must include practical applications alongside theoretical concepts; Accessibility and inclusive design are mandatory for all educational materials.

### III. Test-First Development (NON-NEGOTIABLE)
TDD mandatory for all code components: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced for all functionality including the RAG chatbot, backend services, and frontend components; Unit and integration tests required for all deliverables.

### IV. Modular Architecture Following 4-Module Structure
Strict adherence to the 4-module curriculum architecture: Module 1: The Robotic Nervous System (ROS 2), Module 2: The Digital Twin (Gazebo & Unity), Module 3: The AI-Robot Brain (NVIDIA Isaac™), Module 4: Vision-Language-Action (VLA); Each module must be self-contained yet integrated with the overall platform; Clear interfaces between modules to support independent development and updates.

### V. Hardware-Aware Software Development
All content and examples must consider real-world hardware constraints: computational limitations, sensor noise, actuator dynamics, and physical embodiment; Software implementations must account for the gap between simulation and reality; Practical considerations for deploying algorithms on actual robotic platforms must be emphasized throughout the curriculum.

### VI. Reusable Intelligence and Personalization
Implementation of reusable intelligence via Claude Code Subagents and Agent Skills; User signup/signin with better-auth.com collecting software/hardware background to personalize content delivery; The RAG chatbot must answer questions based on book content and support queries on user-selected text only, enabling personalized learning experiences.

## Technology Stack Requirements
<!-- Technology stack requirements, compliance standards, deployment policies, etc. -->

All technology choices must align with the core deliverables: Docusaurus for static site/book framework deployed to GitHub Pages; OpenAI Agents SDK/ChatKit SDKs for the RAG chatbot; FastAPI backend with Neon Serverless Postgres database; Qdrant Cloud Free Tier for vector storage; Unity and Gazebo integration for digital twin functionality; NVIDIA Isaac™ for AI-robot brain implementations; Better-auth.com for user authentication and personalization.

## Development and Process Rules
<!-- Code review requirements, testing gates, deployment approval process, etc. -->

All code must be testable with unit/integration tests for chatbot and examples; Use GitHub for version control with conventional commit messages; Follow DRY (Don't Repeat Yourself) principles while maintaining clarity; Code reviews required for all changes; Adherence to accessibility standards (WCAG 2.1 AA) for educational content; Regular security audits for user data and authentication systems; Deployment pipeline must include automated testing and staging validation.

## Governance
<!-- Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

This constitution supersedes all other development practices and guidelines; All PRs/reviews must verify compliance with SDD-RI methodology and educational excellence principles; Complexity must be justified with clear pedagogical benefits; Amendments require documentation of educational impact assessment and stakeholder approval; Versioning follows semantic versioning with backward compatibility considerations for learning materials.

**Version**: 1.0.0 | **Ratified**: 2025-12-22 | **Last Amended**: 2025-12-22
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
