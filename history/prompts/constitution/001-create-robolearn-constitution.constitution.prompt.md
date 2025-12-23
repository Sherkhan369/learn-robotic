---
id: 001
title: Create RoboLearn Constitution
stage: constitution
date: 2025-12-22
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: user
command: sp.constitution
labels: [constitution, sdd-ri, education, robotics]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```text
  Create a "Textbook for Teaching Physical AI & Humanoid Robotics Course".

Key sections and rules to include:

### Project Overview and Scope
- This project is a unified textbook built with Docusaurus, deployed to GitHub Pages.
- Strictly follow the provided quarter overview and exact 4-module structure:
  1. Module 1: The Robotic Nervous System (ROS 2)
  2. Module 2: The Digital Twin (Gazebo & Unity)
  3. Module 3: The AI-Robot Brain (NVIDIA Isaac™)
  4. Module 4: Vision-Language-Action (VLA)


### Core Deliverables (Base Requirements - Mandatory)
- Use Docusaurus for the static site/book framework.
- Deploy to GitHub Pages.
- Embed a fully functional RAG chatbot in the book using:
  - OpenAI Agents SDK/ChatKit SDKs
  - FastAPI backend
  - Neon Serverless Postgres database
  - Qdrant Cloud Free Tier for vector storage
- The chatbot must answer questions based on book content and support queries on user-selected text only.

### Use resuble intelligence
- Implement reusable intelligence via Claude Code Subagents and Agent Skills
- Add user signup/signin with better-auth.com; at signup, collect software/hardware background to personalize content

### Content and Educational Guidelines
Given above plan and discussion now Build Constitution for RoboLearn Platform to have the best content to learn Physical AI & Humanoid Robotics and all learning science powered principles and experiences on platform to keep users from auth, to personal content and it's built on SDD-RI @papers/ fulfilling our plan @README.md and requirement @requirement.md

Context: Previous discussion established that:
-RoboLearn is a PLATFORM with three stakeholders (Students, Authors, Institutions)
-Constitution must be single file with global rules, not fragmented domains
-Must incorporate SDD-RI methodology, 4-Layer Teaching Framework, and hardware-awareness

### Development and Process Rules
- All code must be testable; include unit/integration tests for chatbot and examples.
- Use GitHub for version control; follow conventional commit mes
```

## Response snapshot

Created a comprehensive constitution for the RoboLearn Platform textbook project with the following key elements:

1. Six core principles covering SDD-RI methodology, educational excellence, test-first development, modular architecture, hardware-aware software development, and reusable intelligence/personalization
2. Technology stack requirements aligned with the specified deliverables
3. Development and process rules for the educational platform
4. Governance section with amendment procedures
5. Sync Impact Report included as HTML comment

The constitution addresses all specified requirements including the 4-module structure, Docusaurus framework, RAG chatbot implementation, reusable intelligence via Claude Code Subagents, and personalization features.

## Outcome

- ✅ Impact: Created foundational governance document for RoboLearn Platform
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with complete constitution
- 🔁 Next prompts: Implement modules according to constitution
- 🧠 Reflection: Constitution successfully incorporates all specified requirements including SDD-RI methodology, 4-module structure, and educational excellence principles

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementing modules per constitution