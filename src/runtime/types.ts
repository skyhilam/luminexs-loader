export interface LoaderInstance {
  /** Show loading spinner with optional message */
  load: (message?: string) => void;
  /** Show custom message without spinner */
  open: (message?: string) => void;
  /** Show success state and auto-dismiss */
  success: (message?: string) => void;
  /** Show error state and auto-dismiss */
  error: (message?: string) => void;
  /** Clear message and mode */
  clear: () => void;
  /** Close the loader overlay */
  close: () => void;
  /** Whether the loader is currently visible */
  readonly isVisible: boolean;
  /** Current mode: null | 'success' | 'error' */
  readonly mode: 'success' | 'error' | null;
  /** Current message */
  readonly message: string;
}
