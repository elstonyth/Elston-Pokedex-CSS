import { writable } from 'svelte/store';

// Lightbox state
export const lightbox = writable({
  isOpen: false,
  currentCard: null,
  currentIndex: 0
});

// Open lightbox with a card
export const openLightbox = (card, index = 0) => {
  lightbox.set({
    isOpen: true,
    currentCard: card,
    currentIndex: index
  });
};

// Close lightbox
export const closeLightbox = () => {
  lightbox.set({
    isOpen: false,
    currentCard: null,
    currentIndex: 0
  });
};

// Navigate lightbox
export const navigateLightbox = (direction, cards) => {
  lightbox.update(state => {
    const newIndex = state.currentIndex + direction;
    if (newIndex >= 0 && newIndex < cards.length) {
      return {
        ...state,
        currentIndex: newIndex,
        currentCard: cards[newIndex]
      };
    }
    return state;
  });
};

// Dark mode preference
const storedDarkMode = typeof localStorage !== 'undefined'
  ? localStorage.getItem('pokemon-dark-mode')
  : null;
const systemPrefersDark = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-color-scheme: dark)').matches 
  : true;
export const darkMode = writable(storedDarkMode !== null ? storedDarkMode === 'true' : systemPrefersDark);

darkMode.subscribe(value => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('pokemon-dark-mode', value.toString());
  }
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('light-mode', !value);
  }
});

// Toggle dark mode
export const toggleDarkMode = () => {
  darkMode.update(v => !v);
};

// Mobile drawer state
export const mobileDrawer = writable(false);

// Toast notifications
export const toasts = writable([]);

let toastId = 0;
export const addToast = (message, type = 'info', duration = 3000) => {
  const id = ++toastId;
  toasts.update(t => [...t, { id, message, type }]);
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
  return id;
};

export const removeToast = (id) => {
  toasts.update(t => t.filter(toast => toast.id !== id));
};

// Keyboard shortcuts enabled
export const keyboardShortcutsEnabled = writable(true);

// Current view mode (grid, list)
export const viewMode = writable('grid');
