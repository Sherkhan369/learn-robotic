import React from 'react';
import ChatbotComponent from '../components/ChatbotComponent';

/**
 * Root wrapper for the entire Docusaurus application
 * This wraps the app with all necessary contexts and includes the chatbot
 */
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ChatbotComponent />
    </>
  );
}