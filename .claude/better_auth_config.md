# Better Auth Configuration

This configuration file defines how the Better Auth skill and agent should operate within the Claude Code environment.

## Skill Configuration

```yaml
skills:
  better_auth:
    name: "Better Auth"
    description: "Framework-agnostic authentication and authorization for TypeScript"
    version: "1.0.0"
    author: "Claude Code"
    enabled: true
    functions:
      - initializeBetterAuth
      - signIn
      - signUp
      - signInWithSocial
      - getSession
      - signOut
      - getAvailableFunctions
```

## Agent Configuration

```yaml
agents:
  better_auth:
    name: "Better Auth Agent"
    description: "Intelligent assistant for Better Auth implementation"
    version: "1.0.0"
    author: "Claude Code"
    enabled: true
    capabilities:
      - authentication_setup
      - user_management
      - security_configuration
      - plugin_integration
      - framework_integration
    dependencies:
      - better-auth
      - better-auth/client
```

## Default Settings

```yaml
settings:
  better_auth:
    default_database: "sqlite"
    session_expiration: 7200 # 2 hours in seconds
    rate_limiting:
      window: 900 # 15 minutes in seconds
      max_attempts: 5
    password_requirements:
      min_length: 8
      require_special_char: true
      require_number: true
    email_verification: true
    password_reset: true
```

## Available Social Providers

```yaml
social_providers:
  - google
  - github
  - facebook
  - twitter
  - discord
  - apple
  - microsoft
  - spotify
  - gitlab
  - bitbucket
```

## Supported Frameworks

```yaml
frameworks:
  - nextjs
  - nuxt
  - sveltekit
  - express
  - fastify
  - elysia
  - astro
  - solid-start
```

## Plugin Support

```yaml
plugins:
  - siwe: "Sign-In With Ethereum"
  - passkey: "Passkey authentication"
  - stripe: "Stripe subscription management"
  - admin: "Admin tools for user management"
  - scim: "System for Cross-domain Identity Management"
  - username: "Username support"
  - creem: "Creem integration"
```