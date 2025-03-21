import { toast, ToastOptions, Id } from 'react-toastify';

// Base toast configuration
export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

// Standard message templates (can be reused across components)
export const toastMessages = {
  authRequired: 'Authentication required. Please log in to access this page.',
  loginSuccess: 'Successfully logged in!',
  loginError: 'Login failed. Please check your credentials.',
  logoutSuccess: 'Successfully logged out!',
  alreadyAuthenticated: 'You are already logged in. Redirecting to your dashboard.',
  // Add more standard messages as needed
};

// Utility functions for displaying different types of toasts
export const showToast = {
  success: (message: string, options?: Partial<ToastOptions>): Id => {
    return toast.success(message, { ...toastConfig, ...options });
  },
  error: (message: string, options?: Partial<ToastOptions>): Id => {
    return toast.error(message, { ...toastConfig, ...options });
  },
  info: (message: string, options?: Partial<ToastOptions>): Id => {
    return toast.info(message, { ...toastConfig, ...options });
  },
  warning: (message: string, options?: Partial<ToastOptions>): Id => {
    return toast.warning(message, { ...toastConfig, ...options });
  }
};
