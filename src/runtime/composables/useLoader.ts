import { ref } from 'vue';

import type { LoaderInstance } from '../types';

type LoaderMode = 'success' | 'error' | null;

// Shared reactive state (singleton across the app)
const message = ref('');
const mode = ref<LoaderMode>(null);
const isVisible = ref(false);
const showSvg = ref(false);

let dismissTimer: ReturnType<typeof setTimeout> | null = null;
let config = {
  successMessage: '操作成功',
  errorMessage: '操作失敗',
  dismissDuration: 2000,
};

function clearTimer(): void {
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }
}

function cancel(): void {
  if (mode.value) {
    clear();
    close();
  }
}

function load(msg?: string): void {
  showSvg.value = true;
  open(msg);
}

function open(msg?: string): void {
  if (msg) {
    message.value = msg;
  }
  isVisible.value = true;
}

function getDefaultMessage(currentMode: 'success' | 'error'): string {
  return currentMode === 'success'
    ? config.successMessage
    : config.errorMessage;
}

function showResult(
  msg: string | undefined,
  resultMode: 'success' | 'error',
): void {
  clearTimer();
  showSvg.value = false;
  mode.value = resultMode;
  message.value = msg ?? getDefaultMessage(resultMode);
  isVisible.value = true;

  dismissTimer = setTimeout(() => {
    cancel();
  }, config.dismissDuration);
}

function success(msg?: string): void {
  showResult(msg, 'success');
}

function error(msg?: string): void {
  showResult(msg, 'error');
}

function clear(): void {
  clearTimer();
  message.value = '';
  mode.value = null;
  showSvg.value = false;
}

function close(): void {
  if (!mode.value) {
    isVisible.value = false;
  }
}

/** Internal: set config from runtime config */
export function _setLoaderConfig(cfg: typeof config): void {
  config = { ...config, ...cfg };
}

/** Internal reactive state for the Loader component */
export const _state = {
  isVisible,
  showSvg,
  message,
  mode,
  cancel,
} as const;

/**
 * Composable for programmatic loading overlay control.
 *
 * @example
 * ```ts
 * const loader = useLoader();
 * loader.load();
 * await someAsyncWork();
 * loader.success('Done!');
 * ```
 */
export function useLoader(): LoaderInstance {
  return {
    load,
    open,
    success,
    error,
    clear,
    close,
    get isVisible() {
      return isVisible.value;
    },
    get mode() {
      return mode.value;
    },
    get message() {
      return message.value;
    },
  };
}
