import { reactive } from 'vue';

export const toastState = reactive({
  toasts: []
});

let nextId = 1;

/**
 * Show a toast notification
 * @param {string} message - The main body message of the toast
 * @param {'success'|'error'|'info'|'warning'} [type='success'] - Toast type
 * @param {number} [duration=5000] - Duration in ms before auto-dismiss (0 for persistent)
 * @param {string} [title=''] - Optional bold title
 * @returns {number} Toast ID
 */
export function showToast(message, type = 'success', duration = 5000, title = '') {
  const id = nextId++;
  const toast = {
    id,
    message,
    type,
    title,
    timer: null
  };

  if (duration > 0) {
    toast.timer = setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  toastState.toasts.push(toast);
  return id;
}

/**
 * Remove a toast by ID
 * @param {number} id
 */
export function removeToast(id) {
  const index = toastState.toasts.findIndex(t => t.id === id);
  if (index !== -1) {
    const [removed] = toastState.toasts.splice(index, 1);
    if (removed?.timer) {
      clearTimeout(removed.timer);
    }
  }
}

export default {
  toastState,
  showToast,
  removeToast
};
