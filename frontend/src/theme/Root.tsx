import React, { useEffect, useState } from 'react';
import ChatbotComponent from '../components/ChatbotComponent';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import AuthModal from '../components/Auth/AuthModal';
import SigninForm from '../components/Auth/SigninForm';
import SignupForm from '../components/Auth/SignupForm';

/**
 * Root wrapper for the entire Docusaurus application
 * This wraps the app with all necessary contexts and includes the chatbot
 */
export default function Root({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<'signin' | 'signup' | null>(null);

  useEffect(() => {
    // Add auth buttons to navbar
    const addAuthButtons = () => {
      const navbar = document.querySelector('.navbar__items--right');
      if (navbar && !document.getElementById('auth-buttons-container')) {
        const container = document.createElement('div');
        container.id = 'auth-buttons-container';
        container.style.cssText = 'display: flex; gap: 8px; margin-left: 12px; align-items: center;';

        const signinBtn = document.createElement('button');
        signinBtn.textContent = 'Sign In';
        signinBtn.style.cssText = `
          background: transparent;
          border: 2px solid var(--ifm-color-primary);
          color: var(--ifm-color-primary);
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        `;
        signinBtn.onmouseover = () => {
          signinBtn.style.background = 'var(--ifm-color-primary)';
          signinBtn.style.color = 'white';
        };
        signinBtn.onmouseout = () => {
          signinBtn.style.background = 'transparent';
          signinBtn.style.color = 'var(--ifm-color-primary)';
        };
        signinBtn.onclick = () => setActiveModal('signin');

        const signupBtn = document.createElement('button');
        signupBtn.textContent = 'Sign Up';
        signupBtn.style.cssText = `
          background: var(--ifm-color-primary);
          border: 2px solid var(--ifm-color-primary);
          color: white;
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        `;
        signupBtn.onmouseover = () => {
          signupBtn.style.background = 'var(--ifm-color-primary-dark)';
          signupBtn.style.borderColor = 'var(--ifm-color-primary-dark)';
        };
        signupBtn.onmouseout = () => {
          signupBtn.style.background = 'var(--ifm-color-primary)';
          signupBtn.style.borderColor = 'var(--ifm-color-primary)';
        };
        signupBtn.onclick = () => setActiveModal('signup');

        container.appendChild(signinBtn);
        container.appendChild(signupBtn);
        navbar.appendChild(container);
      }
    };

    // Wait for navbar to be rendered
    const timer = setTimeout(addAuthButtons, 100);

    // Re-run when route changes
    const observer = new MutationObserver(addAuthButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleAuthSuccess = () => {
    setActiveModal(null);
    window.location.reload();
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <ChatbotComponent />

        <AuthModal
          isOpen={activeModal === 'signin'}
          onClose={() => setActiveModal(null)}
          title="Sign In"
        >
          <SigninForm
            onSwitchToSignup={() => setActiveModal('signup')}
            onSuccess={handleAuthSuccess}
          />
        </AuthModal>

        <AuthModal
          isOpen={activeModal === 'signup'}
          onClose={() => setActiveModal(null)}
          title="Create Account"
        >
          <SignupForm
            onSwitchToSignin={() => setActiveModal('signin')}
            onSuccess={handleAuthSuccess}
          />
        </AuthModal>
      </AuthProvider>
    </ThemeProvider>
  );
}