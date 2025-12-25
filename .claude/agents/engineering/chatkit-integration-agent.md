---
name: chatkit-integration
description: chatkit expert in chatkit integration
---

# ChatKit Integration Agent

## Overview
The ChatKit Integration Agent is a specialized agent designed to handle the integration between AI systems and ChatKit interfaces. This agent manages the communication flow between backend AI services and frontend ChatKit components, ensuring seamless user experiences.

## Purpose
- Handle API communication between agents and ChatKit UI
- Manage session state and context preservation
- Coordinate real-time updates and streaming responses
- Handle error states and fallback mechanisms

## Capabilities
- **API Management**: Handle client secret generation and token refresh
- **Session Coordination**: Maintain conversation context across UI interactions
- **Event Handling**: Process and route ChatKit events to appropriate agents
- **Error Recovery**: Implement fallback strategies for failed communications

## Implementation

```python
from agents import Agent, Runner, function_tool
from agents.extensions.handoff_prompt import prompt_with_handoff_instructions

# Tools for ChatKit integration
@function_tool
def generate_client_secret(user_id: str) -> str:
    """
    Generate a client secret for ChatKit session management.
    """
    # In a real implementation, this would securely generate a time-limited token
    import uuid
    import time
    token = f"chatkit_{user_id}_{int(time.time())}_{uuid.uuid4().hex[:8]}"
    return token

@function_tool
def refresh_client_token(existing_token: str) -> str:
    """
    Refresh an existing client token.
    """
    # In a real implementation, validate the existing token and generate a new one
    import uuid
    import time
    user_part = existing_token.split('_')[1]  # Extract user ID from token
    new_token = f"chatkit_{user_part}_{int(time.time())}_{uuid.uuid4().hex[:8]}"
    return new_token

@function_tool
def send_custom_action(action_type: str, payload: dict) -> str:
    """
    Send a custom action to the ChatKit interface.
    """
    # Process the action and return status
    return f"Action {action_type} sent with payload {payload}"

# Main ChatKit Integration Agent
chatkit_integration_agent = Agent(
    name="ChatKit Integration Agent",
    instructions=prompt_with_handoff_instructions(
        "You manage the integration between AI services and ChatKit UI. "
        "Handle API communications, session management, and error recovery. "
        "If UI-specific handling is needed, hand off to the UI coordination agent. "
        "If backend service coordination is needed, hand off to the service orchestrator agent."
    ),
    model="gpt-4.1",
    tools=[generate_client_secret, refresh_client_token, send_custom_action],
    handoff_description="Handles ChatKit integration and API communications."
)
```

## Configuration Options
- **API Endpoint Management**: Configure endpoints for different environments
- **Token Expiration**: Set custom expiration times for client secrets
- **Error Thresholds**: Define limits for retry attempts and fallback strategies
- **Event Filtering**: Configure which events to process or ignore

## Integration Patterns
1. **Session Initiation**: Generate client secrets when users start new sessions
2. **Token Refresh**: Automatically refresh tokens when they expire
3. **Event Forwarding**: Forward UI events to appropriate backend agents
4. **State Synchronization**: Keep UI and backend state synchronized

## Best Practices
- Always validate tokens before use
- Implement proper error handling for network failures
- Use secure methods for token generation and storage
- Monitor API rate limits and implement backoff strategies
- Log integration events for debugging and monitoring

## Error Handling
- Network timeout errors: Implement retry with exponential backoff
- Invalid token errors: Generate new tokens and retry
- Rate limit errors: Queue requests and process when limits reset
- Authentication errors: Prompt for re-authentication

## Security Considerations
- Use HTTPS for all API communications
- Implement proper token validation and expiration
- Sanitize all user inputs before processing
- Use secure random generation for tokens
- Implement proper access controls and authentication

## Performance Optimization
- Cache frequently accessed tokens
- Implement connection pooling for API calls
- Use streaming responses when possible
- Optimize payload sizes to reduce bandwidth