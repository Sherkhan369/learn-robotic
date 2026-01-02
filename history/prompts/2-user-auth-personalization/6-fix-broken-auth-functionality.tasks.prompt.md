---
id: 6
title: "Fix Broken Authentication Functionality"
stage: "tasks"
date: "2025-12-30"
model: "claude-sonnet-4-5-20250929"
feature: "2-user-auth-personalization"
branch: "2-user-auth-personalization"
user: "claude"
command: "sp.taskstoissues"
labels: ["authentication", "better-auth", "fix", "api"]
---

# Fix Broken Authentication Functionality

## Original Prompt

Diagnose and fix the broken authentication functionality (Sign Up, Sign In, Logout) using better-auth.com in the Physical AI & Humanoid Robotics Docusaurus textbook.

Current symptoms:
- Sign Up / Sign In buttons or flows do not work
- No successful login/session creation
- Possible errors: redirect loops, 404s, CORS issues, session not persisting, or no response from better-auth

Task: Systematically identify the root cause and provide exact fixes.

## Response

Successfully diagnosed and fixed the broken authentication functionality in the Physical AI & Humanoid Robotics Docusaurus textbook. The main issues were:

1. **Root Cause**: The frontend was making requests to `/api/auth/*` endpoints that don't exist on GitHub Pages (static hosting), with no configuration to point to the separate better-auth API server.

2. **CORS Issues**: CORS settings were not properly configured for cross-origin requests between the frontend and better-auth API.

3. **Environment Configuration**: Missing proper environment variable configuration for API endpoints.

## Fixes Implemented

1. **Updated Frontend API Calls**:
   - Modified `AuthContext.tsx` to use configurable API base URL via `REACT_APP_BETTER_AUTH_API_URL` environment variable
   - Updated `SignupForm.tsx` and `SigninForm.tsx` to use the same configurable API base URL
   - This allows the frontend to work with any deployed better-auth API server

2. **Configured CORS for better-auth API**:
   - Updated `better-auth-api/src/index.ts` to include proper CORS configuration for GitHub Pages deployment
   - Added `trustHostFromHeader: true` to the better-auth configuration for proper host handling

3. **Fixed Database Configuration**:
   - Updated `better-auth-api/src/auth/better-auth-config.ts` to properly handle in-memory database configuration

4. **Created Configuration Documentation**:
   - Created `AUTH_SETUP.md` with detailed instructions for deploying and configuring the authentication system
   - Created `.env` files for both frontend and backend with proper configuration examples

5. **Fixed Authentication Secret**:
   - Generated a proper 64-character hex secret using `npx @better-auth/cli secret`
   - Updated environment variables to use the valid secret

## Architecture

- Frontend (Docusaurus) serves static content on GitHub Pages
- Backend (better-auth API) handles authentication requests on a separate server
- Development: Frontend on port 3002, better-auth API on port 4001
- Production: Frontend on GitHub Pages, better-auth API on external server with proper CORS configuration

## Testing

Both servers are now running successfully:
- Frontend: `http://localhost:3002/learn-robotic/`
- Better-auth API: `http://localhost:4001`

The authentication system is now properly configured and ready for deployment once the better-auth API server is deployed to a compatible hosting platform.