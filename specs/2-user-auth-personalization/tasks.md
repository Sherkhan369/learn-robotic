---
description: "Task list for User Authentication and Content Personalization feature"
---

# Tasks: User Authentication and Content Personalization

**Input**: Design documents from `/specs/2-user-auth-personalization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend project structure with package.json in backend/
- [x] T002 Initialize TypeScript configuration in backend/
- [x] T003 [P] Install better-auth.com dependencies in backend/
- [x] T004 [P] Install @better-auth/adapter-neon dependency in backend/
- [ ] T005 [P] Install frontend dependencies for Docusaurus integration in root/
- [x] T006 Configure environment variables for database and auth in backend/.env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Setup database schema for user background and personalization preferences in backend/database/
- [x] T008 [P] Implement better-auth configuration in backend/src/auth/better-auth-config.ts
- [x] T009 [P] Create User model interface in backend/src/models/user.ts
- [x] T010 Create UserBackground model in backend/src/models/user-background.ts
- [x] T011 Create PersonalizationPreference model in backend/src/models/personalization-preference.ts
- [x] T012 Configure database connection with Neon Postgres in backend/src/config/database.ts
- [x] T013 Setup API routing structure in backend/src/api/
- [x] T014 Create authentication middleware in backend/src/middleware/auth.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - New User Registration with Background Survey (Priority: P1) 🎯 MVP

**Goal**: Enable new users to register with background information for content personalization

**Independent Test**: Can be fully tested by completing the signup flow with background survey and verifying the user account is created with the collected information.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T015 [P] [US1] Contract test for POST /api/auth/signup in backend/tests/contract/test_auth.ts
- [x] T016 [P] [US1] Integration test for user registration flow in backend/tests/integration/test_registration.ts

### Implementation for User Story 1

- [x] T017 [P] [US1] Implement signup endpoint in backend/src/api/auth-routes.ts
- [x] T018 [P] [US1] Create user background service in backend/src/services/user-background.ts
- [x] T019 [US1] Implement background survey during signup in backend/src/auth/user-background.ts
- [x] T020 [US1] Create SignupForm component in frontend/src/components/Auth/SignupForm.tsx
- [x] T021 [US1] Create BackgroundSurvey component in frontend/src/components/Auth/BackgroundSurvey.tsx
- [x] T022 [US1] Add signup page in frontend/src/pages/auth/signup.tsx
- [x] T023 [US1] Implement signup form validation and submission in frontend/src/components/Auth/SignupForm.tsx
- [x] T024 [US1] Add success redirect after signup in frontend/src/pages/auth/signup.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Chapter Content Personalization (Priority: P1)

**Goal**: Allow logged-in users to toggle content personalization per chapter based on their background

**Independent Test**: Can be fully tested by logging in, accessing a chapter, using the personalization button, and seeing content adapt based on stored background information.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [x] T025 [P] [US2] Contract test for GET /api/personalization/chapter/{chapterId} in backend/tests/contract/test_personalization.ts
- [x] T026 [P] [US2] Contract test for PUT /api/personalization/chapter/{chapterId} in backend/tests/contract/test_personalization.ts
- [x] T027 [P] [US2] Integration test for chapter personalization flow in backend/tests/integration/test_personalization.ts

### Implementation for User Story 2

- [x] T028 [P] [US2] Implement GET chapter personalization endpoint in backend/src/api/personalization-routes.ts
- [x] T029 [P] [US2] Implement PUT chapter personalization endpoint in backend/src/api/personalization-routes.ts
- [x] T030 [US2] Create personalization service in backend/src/services/personalization-service.ts
- [x] T031 [US2] Create PersonalizationButton component in frontend/src/components/Personalization/PersonalizationButton.tsx
- [x] T032 [US2] Create ContentAdapter component in frontend/src/components/Personalization/ContentAdapter.tsx
- [x] T033 [US2] Implement personalization context in frontend/src/contexts/PersonalizationContext.tsx
- [x] T034 [US2] Create usePersonalization hook in frontend/src/hooks/usePersonalization.ts
- [x] T035 [US2] Add personalization button to chapter pages in frontend/src/components/Personalization/PersonalizationButton.tsx
- [x] T036 [US2] Implement content adaptation logic based on user background in frontend/src/components/Personalization/ContentAdapter.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Background Update and Preference Management (Priority: P2)

**Goal**: Allow users to update their background information after initial signup to refine content personalization

**Independent Test**: Can be fully tested by updating background information and verifying that content personalization changes accordingly.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [x] T037 [P] [US3] Contract test for PUT /api/auth/background in backend/tests/contract/test_auth.ts
- [x] T038 [P] [US3] Contract test for GET /api/user/profile in backend/tests/contract/test_user.ts
- [x] T039 [P] [US3] Integration test for background update flow in backend/tests/integration/test_user_profile.ts

### Implementation for User Story 3

- [x] T040 [P] [US3] Implement update background endpoint in backend/src/api/auth-routes.ts
- [x] T041 [P] [US3] Implement get user profile endpoint in backend/src/api/auth-routes.ts
- [x] T042 [US3] Update user profile service in backend/src/services/user-profile-service.ts
- [x] T043 [US3] Create UserProfile component in frontend/src/components/User/UserProfile.tsx
- [x] T044 [US3] Create profile page in frontend/src/pages/user/profile.tsx
- [x] T045 [US3] Add background update form in frontend/src/components/User/UserProfile.tsx
- [x] T046 [US3] Implement background update submission in frontend/src/components/User/UserProfile.tsx
- [x] T047 [US3] Add profile navigation in frontend/src/components/User/UserProfile.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Guest User Experience (Priority: P2)

**Goal**: Ensure non-registered users can access core content while being encouraged to register for enhanced experience

**Independent Test**: Can be fully tested by accessing the textbook as a guest and verifying that core content is available with clear registration prompts.

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [x] T048 [P] [US4] Integration test for guest access flow in frontend/tests/integration/test_guest_access.ts
- [x] T049 [P] [US4] Contract test for session validation in backend/tests/contract/test_auth.ts

### Implementation for User Story 4

- [x] T050 [P] [US4] Implement session validation endpoint in backend/src/api/auth-routes.ts
- [x] T051 [US4] Create AuthContext in frontend/src/contexts/AuthContext.tsx
- [x] T052 [US4] Create useAuth hook in frontend/src/hooks/useAuth.ts
- [x] T053 [US4] Add guest access indicators in chapter pages in frontend/src/components/Personalization/ContentAdapter.tsx
- [x] T054 [US4] Add registration prompts for guests in frontend/src/components/Auth/SigninForm.tsx
- [x] T055 [US4] Implement conditional content rendering for guests vs logged-in users in frontend/src/components/Personalization/ContentAdapter.tsx
- [x] T056 [US4] Add sign-in page in frontend/src/pages/auth/signin.tsx
- [x] T057 [US4] Create SigninForm component in frontend/src/components/Auth/SigninForm.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T058 [P] Update docusaurus.config.js to include auth routes in frontend/docusaurus.config.js
- [x] T059 [P] Add authentication guards to protected routes in frontend/src/contexts/AuthContext.tsx
- [x] T060 Update documentation in docs/auth-setup.md
- [x] T061 Security hardening: Add rate limiting to auth endpoints in backend/src/middleware/rate-limit.ts
- [x] T062 Add error handling for auth and personalization flows in both frontend and backend
- [x] T063 Run quickstart.md validation to ensure all components work together
- [x] T064 Add loading states and UX improvements to auth components
- [x] T065 Add analytics and logging for user authentication and personalization events

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on User Story 1 (requires authenticated users)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on User Story 1 (requires authenticated users)
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Can work independently but integrates with other stories

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for POST /api/auth/signup in backend/tests/contract/test_auth.ts"
Task: "Integration test for user registration flow in backend/tests/integration/test_registration.ts"

# Launch all models for User Story 1 together:
Task: "Create user background service in backend/src/services/user-background.ts"
Task: "Create SignupForm component in frontend/src/components/Auth/SignupForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2 (after foundational and US1 auth)
   - Developer C: User Story 3 (after foundational and US1 auth)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence