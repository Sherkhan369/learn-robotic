import React from 'react';
import ChatbotComponent from '../components/ChatbotComponent';

// Root component that includes the chatbot on all pages
const Root = ({ children }) => {
  return (
    <>
      {children}
      <ChatbotComponent />
    </>
  );
};

export default Root;