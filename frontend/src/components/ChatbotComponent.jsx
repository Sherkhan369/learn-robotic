import React, { useState, useEffect, useRef } from 'react';
import './chatbot/ChatWidget.css';

const ChatbotComponent = ({ apiEndpoint = 'http://localhost:8000' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize session
  useEffect(() => {
    // Generate a session ID if one doesn't exist
    if (!sessionId) {
      const storedSessionId = localStorage.getItem('chat_session_id');
      if (storedSessionId) {
        setSessionId(storedSessionId);
      } else {
        const newSessionId = generateSessionId();
        localStorage.setItem('chat_session_id', newSessionId);
        setSessionId(newSessionId);
      }
    }
  }, [sessionId]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const sendMessage = async (query, isSelectedTextQuery = false) => {
    if ((!query.trim() && !isSelectedTextQuery) || isLoading) return;

    let messageToSend = query;

    // Add user message to UI immediately
    if (!isSelectedTextQuery) {
      setMessages(prev => [...prev, { type: 'user', content: query, timestamp: new Date() }]);
      messageToSend = inputValue;
      setInputValue('');
    }

    setIsLoading(true);

    try {
      let response;
      if (isSelectedTextQuery) {
        // Selected text query
        response = await fetch(`${apiEndpoint}/api/v1/query/selected-text`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selected_text: query, // This is actually the selected text
            query: "Explain this text and answer any questions about it",
            session_id: sessionId
          })
        });
      } else {
        // General query
        response = await fetch(`${apiEndpoint}/api/v1/query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: messageToSend,
            session_id: sessionId
          })
        });
      }

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to messages
      setMessages(prev => [...prev, {
        type: 'ai',
        content: data.response,
        sources: data.sources,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Sorry, I encountered an error processing your request. Please try again.';

      // Provide more specific error messages based on the error
      if (error.message.includes('500')) {
        errorMessage = 'The server encountered an error. This might be because the textbook content has not been properly ingested into the system.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Rate limit exceeded. Please wait a moment before asking another question.';
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage = 'Authentication error. Please check API key configuration.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      setMessages(prev => [...prev, {
        type: 'error',
        content: errorMessage,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleAskAboutSelectedText = () => {
    const selectedText = window.selectedText || window.getSelection().toString().trim();
    if (selectedText) {
      sendMessage(selectedText, true);
      setIsOpen(true); // Open the chat if it's closed
    }
  };

  // Initialize text selection functionality
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();

      if (selectedText.length > 0) {
        window.selectedText = selectedText;

        // Create a temporary button to ask about selected text
        if (selectedText.length > 10) { // Only for meaningful selections
          // In a real implementation, we might show a floating button
          // For now, we'll just store it for the button in the chat widget
        }
      }
    };

    document.addEventListener('mouseup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          className="chat-widget-button"
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '10000',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4338ca'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4f46e5'}
        >
          <span>🤖</span> AI
        </button>
      )}

      {/* Chat Widget Container */}
      {isOpen && (
        <div
          className="chat-widget-container"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '10000',
            width: '380px',
            height: '600px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <div
            className="chat-widget-header"
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div className="chat-widget-title">
              <span>🤖 Robotics Textbook Assistant</span>
            </div>
            <button
              className="chat-widget-close"
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '0',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>

          <div
            className="chat-widget-messages"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: '#f9fafb'
            }}
          >
            {messages.length === 0 ? (
              <div className="chat-widget-welcome">
                <p>Hello! I'm your Robotics Textbook Assistant.</p>
                <p>Ask me anything about Physical AI & Humanoid Robotics:</p>
                <ul>
                  <li>ROS 2 concepts</li>
                  <li>Gazebo simulation</li>
                  <li>NVIDIA Isaac platform</li>
                  <li>Visually-Linguistic Actions (VLA)</li>
                  <li>Any robotics concept from the textbook</li>
                </ul>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.type}`}>
                  {message.type === 'user' && (
                    <div
                      className="message-bubble user"
                      style={{
                        maxWidth: '85%',
                        padding: '12px 16px',
                        borderRadius: '18px',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        marginLeft: 'auto',
                        textAlign: 'left',
                        lineHeight: '1.5'
                      }}
                    >
                      {message.content}
                    </div>
                  )}
                  {message.type === 'ai' && (
                    <div
                      className="message-bubble ai"
                      style={{
                        maxWidth: '85%',
                        padding: '12px 16px',
                        borderRadius: '18px',
                        backgroundColor: 'white',
                        color: '#374151',
                        marginRight: 'auto',
                        textAlign: 'left',
                        lineHeight: '1.5',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <div className="ai-content">{message.content}</div>
                      {message.sources && message.sources.length > 0 && (
                        <div className="sources" style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e5e7eb', fontSize: '12px' }}>
                          <details>
                            <summary style={{ fontWeight: '600', color: '#4f46e5', cursor: 'pointer' }}>Sources</summary>
                            <ul style={{ margin: '8px 0 0 0', paddingLeft: '16px' }}>
                              {message.sources.map((source, idx) => (
                                <li key={idx} style={{ marginBottom: '4px' }}>
                                  <span className="source-path" style={{ display: 'block', color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>{source.source_path}</span>
                                  <span className="source-score" style={{ display: 'inline-block', backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '2px 6px', borderRadius: '12px', fontSize: '10px', marginLeft: '8px' }}>Relevance: {(source.score * 100).toFixed(1)}%</span>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      )}
                    </div>
                  )}
                  {message.type === 'error' && (
                    <div
                      className="message-bubble error"
                      style={{
                        maxWidth: '85%',
                        padding: '12px 16px',
                        borderRadius: '18px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        marginRight: 'auto',
                        textAlign: 'left',
                        lineHeight: '1.5'
                      }}
                    >
                      {message.content}
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="chat-message ai">
                <div
                  className="message-bubble ai"
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    backgroundColor: 'white',
                    color: '#374151',
                    marginRight: 'auto',
                    textAlign: 'left',
                    lineHeight: '1.5',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div className="typing-indicator">
                    <span style={{ height: '8px', width: '8px', backgroundColor: '#9ca3af', borderRadius: '50%', display: 'inline-block', margin: '0 2px', animation: 'typing 1.4s infinite ease-in-out' }}></span>
                    <span style={{ height: '8px', width: '8px', backgroundColor: '#9ca3af', borderRadius: '50%', display: 'inline-block', margin: '0 2px', animation: 'typing 1.4s infinite ease-in-out', animationDelay: '-0.32s' }}></span>
                    <span style={{ height: '8px', width: '8px', backgroundColor: '#9ca3af', borderRadius: '50%', display: 'inline-block', margin: '0 2px', animation: 'typing 1.4s infinite ease-in-out', animationDelay: '-0.16s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div
            className="chat-widget-input-area"
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about robotics concepts..."
              className="chat-input"
              rows="1"
              style={{
                flex: 1,
                border: '1px solid #d1d5db',
                borderRadius: '18px',
                padding: '12px 16px',
                resize: 'none',
                maxHeight: '100px',
                fontFamily: 'inherit',
                fontSize: '14px',
                outline: 'none',
                marginRight: '8px'
              }}
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="send-button"
              style={{
                backgroundColor: isLoading || !inputValue.trim() ? '#d1d5db' : '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '18px',
                padding: '12px 16px',
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                fontWeight: '500'
              }}
            >
              Send
            </button>
          </div>

          {window.selectedText && (
            <div
              className="selected-text-quick-action"
              style={{
                padding: '0 16px 16px',
                backgroundColor: 'white'
              }}
            >
              <button
                onClick={handleAskAboutSelectedText}
                style={{
                  width: '100%',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textAlign: 'left',
                  color: '#374151'
                }}
              >
                Ask about selected text: "{window.selectedText.substring(0, 30)}{window.selectedText.length > 30 ? '...' : ''}"
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;