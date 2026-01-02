# API Contracts: User Authentication and Content Personalization

## Authentication API

### User Registration
```
POST /api/auth/signup
```

**Description**: Register a new user with background information

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required, min 8 chars)",
  "name": "string (optional)",
  "softwareBackgroundLevel": "enum (beginner|intermediate|advanced, default: beginner)",
  "hardwareBackgroundLevel": "enum (beginner|intermediate|advanced, default: beginner)"
}
```

**Response**:
- 200: User created successfully
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "softwareBackgroundLevel": "string",
    "hardwareBackgroundLevel": "string"
  },
  "session": {
    "token": "string",
    "expiresAt": "timestamp"
  }
}
```
- 400: Validation error
- 409: User already exists

### User Login
```
POST /api/auth/signin
```

**Description**: Authenticate user and create session

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response**:
- 200: Login successful
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "softwareBackgroundLevel": "string",
    "hardwareBackgroundLevel": "string"
  },
  "session": {
    "token": "string",
    "expiresAt": "timestamp"
  }
}
```
- 400: Invalid credentials
- 401: Authentication failed

### Get Current Session
```
GET /api/auth/session
```

**Description**: Retrieve current user session information

**Response**:
- 200: Session retrieved
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "softwareBackgroundLevel": "string",
    "hardwareBackgroundLevel": "string"
  },
  "session": {
    "token": "string",
    "expiresAt": "timestamp"
  }
}
```
- 401: No active session

### Update User Background
```
PUT /api/auth/background
```

**Description**: Update user's background information

**Request Body**:
```json
{
  "softwareBackgroundLevel": "enum (beginner|intermediate|advanced)",
  "hardwareBackgroundLevel": "enum (beginner|intermediate|advanced)"
}
```

**Response**:
- 200: Background updated successfully
```json
{
  "userBackground": {
    "id": "string",
    "softwareSkillLevel": "string",
    "hardwareSkillLevel": "string",
    "updatedAt": "timestamp"
  }
}
```
- 401: Not authenticated

## Personalization API

### Get Chapter Personalization
```
GET /api/personalization/chapter/{chapterId}
```

**Description**: Get personalization settings for a specific chapter

**Response**:
- 200: Personalization settings retrieved
```json
{
  "chapterId": "string",
  "defaultContentMode": "enum (beginner|advanced|default)",
  "userContentMode": "enum (beginner|advanced|default, nullable)",
  "contentVariations": {
    "beginner": "object",
    "advanced": "object"
  }
}
```
- 401: Not authenticated (returns default settings)

### Update Chapter Personalization
```
PUT /api/personalization/chapter/{chapterId}
```

**Description**: Update personalization preferences for a specific chapter

**Request Body**:
```json
{
  "contentMode": "enum (beginner|advanced|default)",
  "displayPreferences": "object (optional)"
}
```

**Response**:
- 200: Personalization updated
```json
{
  "preference": {
    "id": "string",
    "userId": "string",
    "chapterId": "string",
    "contentMode": "string",
    "displayPreferences": "object",
    "updatedAt": "timestamp"
  }
}
```
- 401: Not authenticated

### Get All Personalization Preferences
```
GET /api/personalization/preferences
```

**Description**: Get all personalization preferences for the current user

**Response**:
- 200: Preferences retrieved
```json
{
  "preferences": [
    {
      "id": "string",
      "chapterId": "string",
      "contentMode": "string",
      "displayPreferences": "object",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```
- 401: Not authenticated

### Get User Profile
```
GET /api/user/profile
```

**Description**: Get current user's profile information including background

**Response**:
- 200: Profile retrieved
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "registrationDate": "timestamp"
  },
  "background": {
    "id": "string",
    "softwareSkillLevel": "string",
    "hardwareSkillLevel": "string",
    "preferences": "object",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```
- 401: Not authenticated