# Data Model: User Authentication and Content Personalization

## Entities

### User
**Description**: Represents a textbook user with authentication credentials and background information
- **ID**: string (primary key, UUID)
- **email**: string (unique, required)
- **authenticationMethod**: string (email/password, OAuth provider)
- **softwareBackgroundLevel**: string (enum: "beginner", "intermediate", "advanced")
- **hardwareBackgroundLevel**: string (enum: "beginner", "intermediate", "advanced")
- **registrationDate**: Date (timestamp)
- **lastLogin**: Date (timestamp, nullable)
- **isActive**: boolean (default: true)

### UserBackground
**Description**: Stores information about user's technical background using simple 3-tier levels
- **ID**: string (primary key, UUID)
- **userId**: string (foreign key to User)
- **softwareSkillLevel**: string (enum: "beginner", "intermediate", "advanced")
- **hardwareSkillLevel**: string (enum: "beginner", "intermediate", "advanced")
- **preferences**: JSON (additional user preferences)
- **createdAt**: Date (timestamp)
- **updatedAt**: Date (timestamp)

### Chapter
**Description**: Represents a textbook chapter with personalized content sections
- **ID**: string (primary key, UUID)
- **title**: string (chapter title)
- **module**: string (module identifier)
- **contentVariations**: JSON (content variations by skill level)
- **personalizationSettings**: JSON (default personalization settings)
- **userSpecificDisplayOptions**: JSON (user-specific display options)

### PersonalizationPreference
**Description**: Stores user's content preference settings for each chapter/module
- **ID**: string (primary key, UUID)
- **userId**: string (foreign key to User)
- **chapterId**: string (foreign key to Chapter)
- **contentMode**: string (enum: "beginner", "advanced", "default")
- **displayPreferences**: JSON (display preferences)
- **lastUpdated**: Date (timestamp)
- **createdAt**: Date (timestamp)

## Relationships

- **User** (1) → (0..*) **UserBackground**: One user has one background profile
- **User** (1) → (0..*) **PersonalizationPreference**: One user can have preferences for multiple chapters
- **Chapter** (1) → (0..*) **PersonalizationPreference**: One chapter can have preferences from multiple users

## Validation Rules

1. **User.email**: Must be a valid email format, unique across all users
2. **UserBackground.softwareSkillLevel**: Must be one of "beginner", "intermediate", "advanced"
3. **UserBackground.hardwareSkillLevel**: Must be one of "beginner", "intermediate", "advanced"
4. **PersonalizationPreference.contentMode**: Must be one of "beginner", "advanced", "default"
5. **UserBackground.userId**: Must reference an existing User
6. **PersonalizationPreference.userId**: Must reference an existing User
7. **PersonalizationPreference.chapterId**: Must reference an existing Chapter

## State Transitions

### User Account States
- **Pending**: User created but not yet verified
- **Active**: User verified and can access system
- **Inactive**: User account deactivated by user or admin

### Background Survey States
- **Not Started**: User hasn't begun background survey
- **In Progress**: User has started but not completed background survey
- **Completed**: User has completed background survey

## Indexes

- User.email (unique index for fast lookup)
- UserBackground.userId (index for user lookup)
- PersonalizationPreference.userId (index for user preferences lookup)
- PersonalizationPreference.chapterId (index for chapter preferences lookup)