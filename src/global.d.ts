// Global type declarations

// Google Analytics gtag function (loaded externally)
declare function gtag(...args: any[]): void;

// Extend Window interface for custom events
interface WindowEventMap {
  'randomCard': CustomEvent;
}
