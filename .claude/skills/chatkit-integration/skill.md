# ChatKit Integration Skill

## Overview
The ChatKit Integration Skill provides capabilities for connecting AI agents with ChatKit interfaces. This skill enables agents to manage UI components, handle user interactions, and coordinate between backend services and frontend interfaces.

## Purpose
- Enable AI agents to interact with ChatKit UI components
- Handle session management and state synchronization
- Process user inputs from ChatKit interfaces
- Generate appropriate UI responses and updates
- Manage real-time communication channels

## Capabilities

### UI Component Management
- Update chat interface elements dynamically
- Manage start screen content and prompts
- Control composer behavior and options
- Handle widget rendering and updates

### Session Management
- Create and manage client secrets
- Handle token refresh operations
- Maintain conversation context
- Manage thread transitions

### Event Processing
- Process user message events
- Handle custom action events
- Manage attachment uploads and previews
- Coordinate real-time updates

## Implementation

```python
from agents import function_tool
import asyncio
import json

@function_tool
def update_chat_interface(options: dict) -> str:
    """
    Update the ChatKit interface with new options.

    Args:
        options: Dictionary containing interface configuration options
    Returns:
        Status message indicating success or failure
    """
    # Validate options
    required_keys = ['api', 'theme', 'composer', 'startScreen']
    for key in required_keys:
        if key not in options:
            return f"Error: Missing required option '{key}'"

    # In a real implementation, this would send configuration to the UI
    return f"ChatKit interface updated with options: {list(options.keys())}"

@function_tool
def generate_client_secret(user_context: dict) -> str:
    """
    Generate a client secret for ChatKit session management.

    Args:
        user_context: Dictionary containing user-specific information
    Returns:
        Client secret string
    """
    import uuid
    import time

    user_id = user_context.get('user_id', 'anonymous')
    session_id = str(uuid.uuid4())
    timestamp = int(time.time())

    # Generate a secure token
    token = f"sk-chatkit-{user_id}-{session_id}-{timestamp}-{uuid.uuid4().hex[:8]}"

    return token

@function_tool
def process_user_message(message_data: dict) -> dict:
    """
    Process a user message received from ChatKit.

    Args:
        message_data: Dictionary containing message information
    Returns:
        Processed message response
    """
    # Extract message components
    text = message_data.get('text', '')
    attachments = message_data.get('attachments', [])
    metadata = message_data.get('metadata', {})

    # Process the message content
    response = {
        'processed_text': text,
        'attachment_count': len(attachments),
        'has_metadata': bool(metadata),
        'analysis': {
            'word_count': len(text.split()),
            'contains_question': '?' in text,
            'sentiment_hint': 'positive' if any(word in text.lower() for word in ['good', 'great', 'excellent', 'thank']) else 'neutral'
        }
    }

    return response

@function_tool
def send_custom_action(action_type: str, payload: dict) -> str:
    """
    Send a custom action to the ChatKit interface.

    Args:
        action_type: Type of action to perform
        payload: Data to send with the action
    Returns:
        Status message
    """
    # Validate action type
    valid_actions = [
        'update_widget', 'show_loader', 'hide_loader',
        'navigate_thread', 'update_composer', 'show_alert'
    ]

    if action_type not in valid_actions:
        return f"Error: Invalid action type '{action_type}'. Valid actions: {valid_actions}"

    # In a real implementation, this would send the action to the UI
    return f"Action '{action_type}' sent with payload: {json.dumps(payload, indent=2)}"

@function_tool
def create_start_screen_config(greeting: str, prompts: list) -> dict:
    """
    Create configuration for the ChatKit start screen.

    Args:
        greeting: Welcome message to display
        prompts: List of suggested prompts for users
    Returns:
        Start screen configuration
    """
    config = {
        'greeting': greeting,
        'prompts': [
            {
                'name': prompt.get('name', f'Prompt {i+1}'),
                'prompt': prompt.get('prompt', ''),
                'icon': prompt.get('icon', 'chat')
            } for i, prompt in enumerate(prompts)
        ]
    }

    return config

# Skill Usage Example
"""
# In an agent, you might use these tools like this:

from agents import Agent, Runner

chat_agent = Agent(
    name="Chat Interface Agent",
    instructions="Manage the ChatKit interface and user interactions.",
    model="gpt-4.1",
    tools=[
        update_chat_interface,
        generate_client_secret,
        process_user_message,
        send_custom_action,
        create_start_screen_config
    ]
)

# Example usage:
result = await Runner.run(
    chat_agent,
    "Configure the chat interface for a customer support application"
)
"""
```

## Configuration Options

### Theme Configuration
- `colorScheme`: 'light', 'dark', or 'auto'
- `color`: Accent colors and level preferences
- `radius`: Border radius style ('sharp', 'normal', 'round')
- `density`: UI density ('compact', 'normal', 'spacious')
- `typography`: Font family and sizing

### Composer Configuration
- `placeholder`: Input field placeholder text
- `tools`: Available tools in the composer
- `maxLength`: Maximum message length
- `autoFocus`: Whether to auto-focus the input

### Start Screen Configuration
- `greeting`: Welcome message
- `prompts`: Suggested conversation starters
- `showHistory`: Whether to show conversation history

## Event Handling

### Message Events
- `user_message`: Process user input
- `agent_response`: Handle agent output
- `attachment`: Process file uploads
- `thread_change`: Handle thread transitions

### Action Events
- `custom_action`: Process custom UI actions
- `widget_update`: Update UI widgets
- `session_refresh`: Refresh session tokens
- `error_event`: Handle UI errors

## Best Practices

### Security
- Always validate client secrets before use
- Implement proper authentication flows
- Sanitize all user inputs
- Use secure token generation methods

### Performance
- Optimize payload sizes for real-time communication
- Implement efficient state synchronization
- Use appropriate caching strategies
- Minimize UI update frequency

### User Experience
- Provide clear feedback for all actions
- Maintain consistent UI states
- Handle errors gracefully with user-friendly messages
- Implement proper loading states

## Error Handling

### Common Errors
- `INVALID_TOKEN`: Client token validation failed
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `CONNECTION_FAILED`: Network communication error
- `INVALID_CONFIG`: Configuration validation failed

### Recovery Strategies
- Implement retry mechanisms with exponential backoff
- Provide fallback configurations
- Log errors for debugging and monitoring
- Notify users of recoverable errors

## Integration Patterns

### Session Initiation
1. Generate client secret using user context
2. Configure interface with appropriate options
3. Set up event listeners for message processing
4. Initialize conversation state

### Real-time Updates
1. Establish WebSocket connection
2. Process incoming messages
3. Update UI components as needed
4. Maintain connection health

### State Management
1. Synchronize UI and backend states
2. Handle thread transitions smoothly
3. Preserve context across sessions
4. Implement proper cleanup procedures