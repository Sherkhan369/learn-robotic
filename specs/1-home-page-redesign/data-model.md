# Data Model: Home Page Redesign for Robotic Textbook

## Entities

### Home Page Content
- **Title**: String - The main heading for the home page
- **Tagline**: String - The subtitle describing the textbook
- **Call-to-Action Buttons**: Array of Button objects
  - Text: String - The button label
  - Link: String - The destination URL
  - Style: String - The button styling class

### Module Display
- **Module ID**: String - Unique identifier for the module
- **Title**: String - The module name
- **Subtitle**: String - Brief description of the module
- **Description**: String - Detailed description of the module content
- **Icon**: String - Emoji or icon representing the module
- **Navigation Link**: String - URL to the module's first page

### Feature Highlights
- **Title**: String - The feature highlight title
- **Description**: String - Detailed explanation of the feature
- **Icon**: String - Visual representation of the feature

### Call-to-Action Section
- **Title**: String - The main heading for the CTA section
- **Description**: String - Supporting text for the CTA
- **Buttons**: Array of Button objects (same as above)

## Relationships

- Home Page Content contains multiple Module Display entities
- Home Page Content contains multiple Feature Highlights
- Home Page Content contains one Call-to-Action Section
- Each section contributes to the overall user engagement on the home page

## Validation Rules

- Title must be between 10-100 characters
- Tagline must be between 20-150 characters
- Each module must have a unique title
- Module descriptions must be between 20-100 characters
- All navigation links must be valid URLs within the textbook
- Call-to-action buttons must have at least one link to textbook content

## State Transitions

- Home page is initially in "Draft" state during development
- After review and testing, transitions to "Ready" state
- When deployed, transitions to "Live" state