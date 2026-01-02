---
name: better auth
description: skill of better auth
---


# Better Auth Skill

Better Auth is a framework-agnostic authentication and authorization library for TypeScript. It provides comprehensive authentication features including email/password authentication, social providers, session management, and user management with a plugin ecosystem for advanced features like 2FA, multi-tenancy, and SSO.

## Functions

### Initialize Better Auth
Initialize Better Auth with configuration options.

**Parameters:**
- `database`: Database configuration
- `plugins`: Array of plugins to use
- `socialProviders`: Configuration for social authentication providers
- `emailAndPassword`: Enable/disable email and password authentication
- `session`: Session configuration options
- `rateLimit`: Rate limiting configuration

**Returns:**
- `success`: Boolean indicating success
- `auth`: Initialized auth instance
- `message`: Status message

### Sign In
Sign in a user with email and password.

**Parameters:**
- `email`: User's email address
- `password`: User's password

**Returns:**
- `success`: Boolean indicating success
- `user`: User object if successful
- `message`: Status message

### Sign Up
Sign up a new user with email and password.

**Parameters:**
- `email`: User's email address
- `password`: User's password
- `name`: Optional user name

**Returns:**
- `success`: Boolean indicating success
- `user`: Created user object
- `message`: Status message

### Sign In with Social Provider
Sign in using a social authentication provider.

**Parameters:**
- `provider`: Social provider name (e.g., google, github, facebook)
- `redirectUri`: Optional redirect URI after authentication

**Returns:**
- `success`: Boolean indicating success
- `redirectUri`: URI to redirect to for authentication
- `message`: Status message

### Get Session
Retrieve the current user session.

**Parameters:**
- `request`: HTTP request object

**Returns:**
- `success`: Boolean indicating success
- `session`: Session object if available
- `message`: Status message

### Sign Out
Sign out the current user.

**Parameters:**
- `sessionId`: ID of the session to end

**Returns:**
- `success`: Boolean indicating success
- `message`: Status message

## Usage Examples

### Initialize Better Auth
```typescript
const config = {
  database: {
    type: 'sqlite',
    url: './sqlite.db'
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
};

const result = await initializeBetterAuth(config);
```

### Sign Up a New User
```typescript
const signUpResult = await signUp({
  email: 'user@example.com',
  password: 'securePassword',
  name: 'John Doe'
});
```

### Sign In with Email/Password
```typescript
const signInResult = await signIn({
  email: 'user@example.com',
  password: 'securePassword'
});
```

### Sign In with Social Provider
```typescript
const socialSignInResult = await signInWithSocial({
  provider: 'google',
  redirectUri: '/dashboard'
});
```

## Configuration Options

Better Auth can be configured with the following options:

- **Database**: Support for various databases (PostgreSQL, MySQL, SQLite, etc.)
- **Social Providers**: Integration with popular OAuth providers
- **Email & Password**: Traditional authentication method
- **Session Management**: Configurable session settings
- **Rate Limiting**: Protection against brute force attacks
- **Plugins**: Extend functionality with plugins (2FA, multi-tenancy, etc.)

## Plugins

Better Auth has a rich plugin ecosystem including:

- **SIWE**: Sign-In With Ethereum for wallet authentication
- **Passkey**: Passwordless authentication using passkeys
- **Stripe**: Integration with Stripe for subscription management
- **Admin**: Administrative functions for user management
- **SCIM**: System for Cross-domain Identity Management
- **Username**: Add username support in addition to email