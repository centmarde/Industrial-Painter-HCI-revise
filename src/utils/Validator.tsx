export interface ValidationResult {
    isValid: boolean;
    message: string;
  }
  
  export const validateEmail = (email: string): ValidationResult => {
    if (!email.trim()) {
      return { isValid: false, message: 'Email is required' };
    }
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Email is invalid' };
    }
    
    return { isValid: true, message: '' };
  };
  
  export const validatePassword = (password: string, minLength: number = 8): ValidationResult => {
    if (!password) {
      return { isValid: false, message: 'Password is required' };
    }
    
    if (password.length < minLength) {
      return { isValid: false, message: `Password must be at least ${minLength} characters` };
    }
    
    return { isValid: true, message: '' };
  };
  
  export const validateStrongPassword = (password: string): ValidationResult => {
    const baseValidation = validatePassword(password);
    if (!baseValidation.isValid) {
      return baseValidation;
    }
    
    const strongPasswordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!strongPasswordRegex.test(password)) {
      return { isValid: false, message: 'Password must include uppercase, lowercase and numbers' };
    }
    
    return { isValid: true, message: '' };
  };
  
  export const validatePasswordsMatch = (password: string, confirmPassword: string): ValidationResult => {
    if (!confirmPassword) {
      return { isValid: false, message: 'Please confirm your password' };
    }
    
    if (password !== confirmPassword) {
      return { isValid: false, message: 'Passwords do not match' };
    }
    
    return { isValid: true, message: '' };
  };
  
  export const validateName = (name: string): ValidationResult => {
    if (!name.trim()) {
      return { isValid: false, message: 'Name is required' };
    }
    
    return { isValid: true, message: '' };
  };
  
  export const validateTermsAccepted = (accepted: boolean): ValidationResult => {
    if (!accepted) {
      return { isValid: false, message: 'You must agree to the terms and conditions' };
    }
    
    return { isValid: true, message: '' };
  };
  
  export const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '', color: 'grey.500' };
    
    if (password.length < 6) {
      return { strength: 1, text: 'Weak', color: 'error.main' };
    } else if (password.length < 10) {
      return { strength: 2, text: 'Moderate', color: 'warning.main' };
    } else if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 3, text: 'Strong', color: 'success.main' };
    } else {
      return { strength: 2, text: 'Moderate', color: 'warning.main' };
    }
  };
  