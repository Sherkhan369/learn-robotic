# Implementation Plan: User Authentication and Content Personalization

**Branch**: `2-user-auth-personalization` | **Date**: 2025-12-27 | **Spec**: specs/2-user-auth-personalization/spec.md
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement secure user authentication using better-auth.com with background survey during signup, and client-side content personalization based on user's technical background (beginner/intermediate/advanced). The system will collect user software and hardware background levels to adapt content presentation per chapter, with Neon Postgres as the storage backend.

## Technical Context

**Language/Version**: TypeScript/JavaScript for Docusaurus integration, Node.js for backend services
**Primary Dependencies**: better-auth.com, Docusaurus, React, Neon Serverless Postgres
**Storage**: Neon Serverless Postgres for user data and background information
**Testing**: Jest for unit tests, Cypress for integration tests
**Target Platform**: Web application (Docusaurus-based textbook deployed to GitHub Pages)
**Project Type**: Web application with separate backend service
**Performance Goals**: Authentication flows complete in under 10 seconds 95% of the time
**Constraints**: Must maintain existing textbook and RAG chatbot functionality without disruption, handle PII minimally
**Scale/Scope**: Support concurrent registered and guest users without performance degradation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **SDD-RI Methodology**: ✅ Plan follows spec-first approach with reusable intelligence components
- **Educational Excellence**: ✅ Content personalization aligns with learning science principles
- **Test-First Development**: ✅ Plan includes unit and integration tests for all components
- **Modular Architecture**: ✅ Authentication and personalization integrate with existing 4-module structure
- **Hardware-Aware Development**: ✅ Background collection considers user's hardware access
- **Reusable Intelligence**: ✅ Implementation includes Claude Code Subagents and Agent Skills for auth
- **Technology Stack Compliance**: ✅ Uses better-auth.com, Neon Postgres, and Docusaurus as required

## Project Structure

### Documentation (this feature)

```text
specs/2-user-auth-personalization/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── auth/
│   │   ├── better-auth-config.ts
│   │   ├── user-background.ts
│   │   └── personalization.ts
│   ├── models/
│   │   ├── user.ts
│   │   ├── user-background.ts
│   │   └── personalization-preference.ts
│   ├── services/
│   │   ├── auth-service.ts
│   │   ├── personalization-service.ts
│   │   └── user-profile-service.ts
│   └── api/
│       ├── auth-routes.ts
│       └── personalization-routes.ts
└── tests/
    ├── unit/
    ├── integration/
    └── contract/

frontend/ (integrated with existing Docusaurus)
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── SignupForm.tsx
│   │   │   ├── SigninForm.tsx
│   │   │   └── BackgroundSurvey.tsx
│   │   ├── Personalization/
│   │   │   ├── PersonalizationButton.tsx
│   │   │   └── ContentAdapter.tsx
│   │   └── User/
│   │       └── UserProfile.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── signup.tsx
│   │   │   └── signin.tsx
│   │   └── user/
│   │       └── profile.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── usePersonalization.ts
│   └── contexts/
│       ├── AuthContext.tsx
│       └── PersonalizationContext.tsx
├── static/
│   └── auth/
└── docusaurus.config.js (updated with auth routes)
```

**Structure Decision**: Web application with separate backend service for authentication and personalization, integrated with existing Docusaurus frontend. Backend handles user management and personalization logic while frontend provides UI components for signup, signin, and content personalization.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| | | |