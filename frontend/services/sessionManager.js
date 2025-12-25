// Session Manager for Chat Widget
class SessionManager {
  constructor() {
    this.sessionId = null;
    this.userId = null;
    this.storageKey = 'chat_session_data';
    this.init();
  }

  init() {
    // Load existing session or create new one
    this.loadSession();
  }

  loadSession() {
    const sessionData = localStorage.getItem(this.storageKey);
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        this.sessionId = parsed.sessionId || this.generateSessionId();
        this.userId = parsed.userId || null;
      } catch (e) {
        // If parsing fails, create new session
        this.createSession();
      }
    } else {
      this.createSession();
    }
  }

  createSession(userId = null) {
    this.sessionId = this.generateSessionId();
    this.userId = userId;

    const sessionData = {
      sessionId: this.sessionId,
      userId: this.userId,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(this.storageKey, JSON.stringify(sessionData));
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getActiveSessionId() {
    return this.sessionId;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId) {
    this.userId = userId;
    this.saveSession();
  }

  saveSession() {
    const sessionData = {
      sessionId: this.sessionId,
      userId: this.userId,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(this.storageKey, JSON.stringify(sessionData));
  }

  clearSession() {
    localStorage.removeItem(this.storageKey);
    this.sessionId = null;
    this.userId = null;
  }

  // Get session info for API requests
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      userId: this.userId
    };
  }
}

// Create global instance
const sessionManager = new SessionManager();

// Export for module usage
export default sessionManager;

// Also make it available globally
if (typeof window !== 'undefined') {
  window.SessionManager = sessionManager;
}