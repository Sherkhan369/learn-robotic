import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

const ChatWidget = ({ apiEndpoint = 'http://localhost:8000' }) => {
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
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
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

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button className="chat-widget-button" onClick={toggleChat}>
          <span>🤖</span> Ask AI
        </button>
      )}

      {/* Chat Widget Container */}
      {isOpen && (
        <div className="chat-widget-container">
          <div className="chat-widget-header">
            <div className="chat-widget-title">
              <span>🤖 Robotics Textbook Assistant</span>
            </div>
            <button className="chat-widget-close" onClick={toggleChat}>
              ×
            </button>
          </div>

          <div className="chat-widget-messages">
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
                  {message.type === 'user' && <div className="message-bubble user">{message.content}</div>}
                  {message.type === 'ai' && (
                    <div className="message-bubble ai">
                      <div className="ai-content">{message.content}</div>
                      {message.sources && message.sources.length > 0 && (
                        <div className="sources">
                          <details>
                            <summary>Sources</summary>
                            <ul>
                              {message.sources.map((source, idx) => (
                                <li key={idx}>
                                  <span className="source-path">{source.source_path}</span>
                                  <span className="source-score">Relevance: {(source.score * 100).toFixed(1)}%</span>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      )}
                    </div>
                  )}
                  {message.type === 'error' && <div className="message-bubble error">{message.content}</div>}
                </div>
              ))
            )}
            {isLoading && (
              <div className="chat-message ai">
                <div className="message-bubble ai">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-widget-input-area">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about robotics concepts..."
              className="chat-input"
              rows="1"
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="send-button"
            >
              Send
            </button>
          </div>

          {window.selectedText && (
            <div className="selected-text-quick-action">
              <button onClick={handleAskAboutSelectedText}>
                Ask about selected text: "{window.selectedText.substring(0, 30)}{window.selectedText.length > 30 ? '...' : ''}"
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;