/**
 * Focus trap utility for modals and dialogs
 * Keeps keyboard focus within a container element
 */

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Creates a focus trap within a container element
 * @param {HTMLElement} container - The container to trap focus within
 * @returns {{ destroy: () => void }} - Object with destroy method to remove trap
 */
export function createFocusTrap(container) {
  if (!container) return { destroy: () => {} };
  
  // Store the element that was focused before the trap
  const previouslyFocused = document.activeElement;
  
  // Helper to get current focusable elements (re-queries on each use for dynamic DOM)
  const getFocusableElements = () => container.querySelectorAll(FOCUSABLE_SELECTORS);
  
  // Focus the first focusable element
  const initialElements = getFocusableElements();
  if (initialElements.length > 0) {
    /** @type {HTMLElement} */ (initialElements[0]).focus();
  }
  
  function handleKeydown(event) {
    if (event.key !== 'Tab') return;
    
    // Re-query elements each time to handle dynamic DOM changes
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = /** @type {HTMLElement} */ (focusableElements[0]);
    const lastElement = /** @type {HTMLElement} */ (focusableElements[focusableElements.length - 1]);
    
    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  container.addEventListener('keydown', handleKeydown);
  
  return {
    destroy() {
      container.removeEventListener('keydown', handleKeydown);
      // Restore focus to the previously focused element
      if (previouslyFocused && previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    }
  };
}

/**
 * Svelte action for focus trap
 * Usage: <div use:focusTrap>...</div>
 */
export function focusTrap(node) {
  const trap = createFocusTrap(node);
  
  return {
    destroy() {
      trap.destroy();
    }
  };
}
