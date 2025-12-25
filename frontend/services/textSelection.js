// Text Selection Service for capturing selected text
class TextSelectionService {
  constructor() {
    this.selectedText = null;
    this.onSelectionChange = null;
    this.init();
  }

  init() {
    // Add event listeners for text selection
    document.addEventListener('mouseup', this.handleSelection.bind(this));
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.clearSelection();
      }
    });
  }

  handleSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length > 0) {
      this.selectedText = selectedText;

      // Store in global variable for other components to access
      window.selectedText = selectedText;

      // Trigger any registered callbacks
      if (this.onSelectionChange) {
        this.onSelectionChange(selectedText);
      }
    } else {
      this.clearSelection();
    }
  }

  clearSelection() {
    this.selectedText = null;
    window.selectedText = null;
  }

  getSelectedText() {
    return this.selectedText;
  }

  // Register a callback to be called when selection changes
  setOnSelectionChange(callback) {
    this.onSelectionChange = callback;
  }

  // Create a context menu for selected text
  showContextMenu(event, selectedText) {
    // Remove existing context menu if present
    const existingMenu = document.getElementById('text-selection-context-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    // Create context menu
    const menu = document.createElement('div');
    menu.id = 'text-selection-context-menu';
    menu.className = 'text-selection-context-menu';
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
    menu.style.minWidth = '150px';

    // Add menu items
    const askButton = document.createElement('div');
    askButton.textContent = '🤖 Ask AI about this';
    askButton.style.padding = '8px';
    askButton.style.cursor = 'pointer';
    askButton.style.borderRadius = '3px';
    askButton.style.marginBottom = '4px';

    askButton.addEventListener('click', () => {
      // Trigger chat with selected text
      if (window.ChatWidget && typeof window.ChatWidget.askAboutSelectedText === 'function') {
        window.ChatWidget.askAboutSelectedText(selectedText);
      } else {
        // If chat widget isn't available, store the text and open the widget
        window.selectedTextForChat = selectedText;
        window.openChatWidget && window.openChatWidget();
      }
      menu.remove();
    });

    askButton.addEventListener('mouseover', () => {
      askButton.style.backgroundColor = '#f3f4f6';
    });

    askButton.addEventListener('mouseout', () => {
      askButton.style.backgroundColor = 'transparent';
    });

    menu.appendChild(askButton);

    // Add to document
    document.body.appendChild(menu);

    // Auto-remove after timeout
    setTimeout(() => {
      if (document.contains(menu)) {
        menu.remove();
      }
    }, 5000);

    // Remove when clicking elsewhere
    const removeMenu = (e) => {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', removeMenu);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', removeMenu);
    }, 100);
  }

  // Initialize context menu functionality
  initContextMenu() {
    document.addEventListener('mouseup', (event) => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText.length > 10) { // Only show for meaningful selections
        this.showContextMenu(event, selectedText);
      }
    });
  }
}

// Create global instance
const textSelectionService = new TextSelectionService();

// Export for module usage
export default textSelectionService;

// Also make it available globally
if (typeof window !== 'undefined') {
  window.TextSelectionService = textSelectionService;
}