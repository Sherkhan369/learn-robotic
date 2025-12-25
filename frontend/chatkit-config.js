// ChatKit Configuration for Textbook Integration
const chatkitConfig = {
  // API Configuration
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000',

  // Chat widget settings
  widget: {
    title: 'Robotics Textbook Assistant',
    subtitle: 'Ask questions about Physical AI & Humanoid Robotics',
    placeholder: 'Ask about ROS 2, Gazebo, NVIDIA Isaac, VLA, or any robotics concept...',
    initialMessage: "Hello! I'm your Robotics Textbook Assistant. Ask me anything about the textbook content!",

    // Styling
    position: 'right', // 'left' or 'right'
    theme: 'light', // 'light' or 'dark'

    // Features
    enableTextSelection: true,
    enableSourceAttribution: true,
    enableHistory: true
  },

  // Text selection capture
  textSelection: {
    enabled: true,
    captureMethod: 'mouseup', // Event that triggers text selection capture
    minSelectionLength: 5, // Minimum number of characters to enable selection
    contextMenu: true // Show context menu for selected text
  },

  // API endpoints
  endpoints: {
    query: '/api/v1/query',
    selectedTextQuery: '/api/v1/query/selected-text',
    health: '/health'
  }
};

// Initialize the chat widget
function initializeChatWidget() {
  // Check if the widget is already initialized
  if (window.chatWidgetInitialized) {
    return;
  }

  // Create the chat widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'chatkit-widget';
  widgetContainer.className = 'chatkit-widget';
  document.body.appendChild(widgetContainer);

  // Add basic styling
  const style = document.createElement('style');
  style.textContent = `
    .chatkit-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;
      width: 380px;
      height: 600px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .chatkit-widget {
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        border-radius: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Mark as initialized
  window.chatWidgetInitialized = true;

  // Initialize the chat functionality
  initializeChatFunctionality();
}

// Initialize chat functionality
function initializeChatFunctionality() {
  // Add event listener for text selection
  if (chatkitConfig.textSelection.enabled) {
    document.addEventListener(chatkitConfig.textSelection.captureMethod, function(e) {
      const selectedText = window.getSelection().toString().trim();

      if (selectedText.length >= chatkitConfig.textSelection.minSelectionLength) {
        // Store the selected text for later use
        window.selectedText = selectedText;

        // Optionally show a context menu or button
        if (chatkitConfig.textSelection.contextMenu) {
          showSelectionContextMenu(e, selectedText);
        }
      }
    });
  }
}

// Show context menu for selected text
function showSelectionContextMenu(event, selectedText) {
  // Remove existing context menu if present
  const existingMenu = document.getElementById('chatkit-selection-menu');
  if (existingMenu) {
    existingMenu.remove();
  }

  // Create context menu
  const menu = document.createElement('div');
  menu.id = 'chatkit-selection-menu';
  menu.className = 'chatkit-selection-menu';
  menu.style.position = 'fixed';
  menu.style.left = event.pageX + 'px';
  menu.style.top = event.pageY + 'px';
  menu.style.backgroundColor = '#fff';
  menu.style.border = '1px solid #ddd';
  menu.style.borderRadius = '4px';
  menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  menu.style.padding = '8px';
  menu.style.zIndex = '10001';
  menu.style.fontSize = '14px';
  menu.style.cursor = 'pointer';

  menu.textContent = 'Ask about this text';
  menu.onclick = function() {
    // Send the selected text to the chat
    openChatAndAskAboutText(selectedText);
    menu.remove();
  };

  document.body.appendChild(menu);

  // Remove menu after a delay
  setTimeout(() => {
    if (document.contains(menu)) {
      menu.remove();
    }
  }, 3000);
}

// Open chat and ask about selected text
function openChatAndAskAboutText(selectedText) {
  // This would open the chat widget and pre-fill with a query about the selected text
  console.log('Selected text:', selectedText);
  // Implementation would depend on the actual chat widget implementation
}

// Make config available globally
window.ChatkitConfig = chatkitConfig;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatWidget);
} else {
  initializeChatWidget();
}

export default chatkitConfig;