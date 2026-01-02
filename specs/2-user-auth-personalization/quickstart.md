# Quickstart: User Authentication and Content Personalization

## Setup Overview

This guide provides the essential steps to set up user authentication and content personalization for the Physical AI & Humanoid Robotics Textbook.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Access to Neon Serverless Postgres database
- Better Auth account (or self-hosted instance)

## Installation Steps

### 1. Backend Setup

1. **Install Better Auth dependencies**:
   ```bash
   npm install better-auth
   npm install @better-auth/adapter-neon
   ```

2. **Configure Better Auth**:
   Create `backend/src/auth/better-auth-config.ts`:
   ```typescript
   import { betterAuth } from "better-auth";
   import { neon } from "@better-auth/adapter-neon";

   export const auth = betterAuth({
     database: neon(process.env.DATABASE_URL!),
     socialProviders: {
       // Configure OAuth providers if needed
     },
     emailAndPassword: {
       enabled: true,
       requireEmailVerification: true,
     },
     account: {
       accountModel: {
         createAdditionalData: async (data) => {
           // Create UserBackground record when user is created
           return {
             softwareBackgroundLevel: "beginner", // default
             hardwareBackgroundLevel: "beginner", // default
           };
         },
       },
     },
   });
   ```

### 2. Database Schema

1. **Run database migrations**:
   Better Auth will handle basic user tables, but you'll need to add custom tables for user background and personalization preferences.

2. **Create custom tables**:
   ```sql
   -- UserBackground table
   CREATE TABLE user_background (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth_user(id) ON DELETE CASCADE,
     software_skill_level VARCHAR(20) CHECK (software_skill_level IN ('beginner', 'intermediate', 'advanced')),
     hardware_skill_level VARCHAR(20) CHECK (hardware_skill_level IN ('beginner', 'intermediate', 'advanced')),
     preferences JSONB,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- PersonalizationPreference table
   CREATE TABLE personalization_preference (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth_user(id) ON DELETE CASCADE,
     chapter_id VARCHAR(255),
     content_mode VARCHAR(20) CHECK (content_mode IN ('beginner', 'advanced', 'default')),
     display_preferences JSONB,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 3. Frontend Integration

1. **Install Docusaurus auth plugin**:
   ```bash
   npm install @docusaurus/core
   ```

2. **Create authentication context**:
   ```bash
   frontend/src/contexts/AuthContext.tsx
   ```

3. **Add auth routes to docusaurus.config.js**:
   ```javascript
   module.exports = {
     // ... existing config
     plugins: [
       // ... existing plugins
       path.resolve(__dirname, 'src/plugins/auth'),
     ],
   };
   ```

### 4. Environment Variables

Create `.env` files for backend:

```env
DATABASE_URL="your-neon-postgres-connection-string"
BETTER_AUTH_URL="https://your-auth-domain.com"
BETTER_AUTH_SECRET="your-secret-key"
```

## Running the Application

### Development

1. **Start backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start frontend**:
   ```bash
   cd frontend  # or root if Docusaurus is in root
   npm run start
   ```

### Production

1. **Build backend**:
   ```bash
   cd backend
   npm run build
   ```

2. **Build frontend**:
   ```bash
   npm run build
   ```

## Key Components

### Authentication Components
- `SignupForm.tsx`: Handles user registration with background survey
- `SigninForm.tsx`: Handles user login
- `BackgroundSurvey.tsx`: Collects user skill levels during registration

### Personalization Components
- `PersonalizationButton.tsx`: Per-chapter button to toggle content modes
- `ContentAdapter.tsx`: Adapts content based on user background and preferences
- `usePersonalization.ts`: Hook for personalization logic

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

### Personalization
- `GET /api/personalization/preferences` - Get user preferences
- `POST /api/personalization/preferences` - Update user preferences
- `GET /api/personalization/chapter/:id` - Get chapter personalization settings

## Testing

1. **Run unit tests**:
   ```bash
   npm run test:unit
   ```

2. **Run integration tests**:
   ```bash
   npm run test:integration
   ```

3. **Run end-to-end tests**:
   ```bash
   npm run test:e2e
   ```

## Troubleshooting

### Common Issues

1. **Database connection errors**: Verify DATABASE_URL is correctly set
2. **Auth not working**: Check that BETTER_AUTH_URL matches your deployment URL
3. **Personalization not applying**: Ensure user is logged in and has background data

### Getting Help

- Check the full documentation in the `docs/` directory
- Review the API contracts in `specs/2-user-auth-personalization/contracts/`
- Look at the implementation tasks in `specs/2-user-auth-personalization/tasks.md`