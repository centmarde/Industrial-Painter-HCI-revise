/**
 * Validates email format
 * @param email - Email to validate
 * @returns Error message or empty string if valid
 */
export const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };
  
  /**
   * Validates name
   * @param name - Name to validate
   * @returns Error message or empty string if valid
   */
  export const validateName = (name: string): string => {
    if (!name) return 'Full name is required';
    if (name.length < 2) return 'Name must be at least 2 characters long';
    if (name.length > 100) return 'Name cannot exceed 100 characters';
    return '';
  };
  
  /**
   * Validates password strength
   * @param password - Password to validate
   * @returns Error message or empty string if valid
   */
  export const validateStrongPassword = (password: string): string => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    
    // Check for strength requirements
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumber)) {
      return 'Password must contain uppercase, lowercase letters and numbers';
    }
    
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    
    return '';
  };
  
  /**
   * Validates if passwords match
   * @param password - Original password
   * @param confirmPassword - Confirmation password
   * @returns Error message or empty string if valid
   */
  export const validatePasswordsMatch = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  };
  
  /**
   * Validates if terms are accepted
   * @param accepted - Boolean indicating if terms are accepted
   * @returns Error message or empty string if valid
   */
  export const validateTermsAccepted = (accepted: boolean): string => {
    return accepted ? '' : 'You must agree to the Terms of Service and Privacy Policy';
  };
  
  /**
   * Evaluates password strength
   * @param password - Password to evaluate
   * @returns Object with strength info
   */
  export const getPasswordStrength = (password: string) => {
    if (!password) {
      return { strength: 0, text: 'No password', color: 'text.disabled' };
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Return appropriate feedback based on strength
    if (strength === 3) {
      return { strength, text: 'Strong', color: 'success.main' };
    } else if (strength === 2) {
      return { strength, text: 'Medium', color: 'warning.main' };
    } else {
      return { strength, text: 'Weak', color: 'error.main' };
    }
  };
  