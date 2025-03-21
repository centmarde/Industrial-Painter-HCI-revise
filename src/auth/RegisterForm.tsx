import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  InputAdornment, 
  IconButton,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person,
  CheckCircleOutline
} from '@mui/icons-material';
import { 
  validateEmail, 
  validateName, 
  validateStrongPassword, 
  validatePasswordsMatch, 
  validateTermsAccepted,
  getPasswordStrength 
} from '../utils/Validator';
import { useAuth } from '../stores/Auth';
import { showToast } from '../utils/toastConfig';

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
}

const AnimatedButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.2),
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'all 0.6s ease',
  },
  '&:hover:before': {
    left: '100%',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease',
    '&.Mui-focused': {
      '& fieldset': {
        borderWidth: '2px',
      },
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& label.Mui-focused': {
    fontWeight: 500,
  },
}));

const PasswordStrengthIndicator = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(-1),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: '',
    auth: ''
  });

  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === 'agreeToTerms') {
      setFormData(prev => ({ ...prev, [name]: checked }));
      if (checked) {
        setErrors(prev => ({ ...prev, agreeToTerms: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear errors when typing
      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
      
      // Special handling for confirm password
      if (name === 'confirmPassword' || name === 'password') {
        if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        } else if (name === 'confirmPassword' && value !== formData.password) {
          setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        } else if (name === 'confirmPassword' && value === formData.password) {
          setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
      }
    }
  };

  const handleBlur = (name: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validateStrongPassword(formData.password);
        if (!error && formData.confirmPassword) {
          // Also validate confirm password if it exists
          const confirmError = validatePasswordsMatch(formData.password, formData.confirmPassword);
          setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
        }
        break;
      case 'confirmPassword':
        error = validatePasswordsMatch(formData.password, formData.confirmPassword);
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = { 
      name: '', 
      email: '', 
      password: '', 
      confirmPassword: '',
      agreeToTerms: '',
      auth: ''
    };
    let isValid = true;
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validateStrongPassword(formData.password);
    const confirmPasswordError = validatePasswordsMatch(formData.password, formData.confirmPassword);
    const termsError = validateTermsAccepted(formData.agreeToTerms);
    
    if (nameError) {
      newErrors.name = nameError;
      isValid = false;
    }
    
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }
    
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }
    
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
      isValid = false;
    }
    
    if (termsError) {
      newErrors.agreeToTerms = termsError;
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors(prev => ({ ...prev, auth: '' }));
      
      try {
        await register(formData.email, formData.password, formData.name);
        console.log('Registration successful');
        showToast.success('Registration successful! You can now log in.');
        setRegistrationSuccess(true);
        
        // Clear form data
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false
        });
        
        // Remove the timeout - we'll let the user choose when to switch tabs
        // by clicking the button instead of auto-switching
      } catch (error: any) {
        console.error('Registration error:', error);
        let errorMessage = 'Registration failed. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email is already in use.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address.';
        }
        
        setErrors(prev => ({ ...prev, auth: errorMessage }));
        showToast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (registrationSuccess) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <CheckCircleOutline sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Registration Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Your account has been created. You can now log in.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setRegistrationSuccess(false);
            // Always call onRegisterSuccess to switch to login tab when button is clicked
            if (onRegisterSuccess) onRegisterSuccess();
          }}
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {errors.auth && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.auth}
        </Alert>
      )}
      
      <StyledTextField
        fullWidth
        id="name"
        name="name"
        label="Full Name"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        onBlur={() => handleBlur('name')}
        error={!!errors.name}
        helperText={errors.name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person color="action" />
            </InputAdornment>
          ),
        }}
      />

      <StyledTextField
        fullWidth
        id="email"
        name="email"
        label="Email Address"
        variant="outlined"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => handleBlur('email')}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="action" />
            </InputAdornment>
          ),
        }}
      />
      
      <StyledTextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        value={formData.password}
        onChange={handleChange}
        onBlur={() => handleBlur('password')}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      
      {formData.password && (
        <PasswordStrengthIndicator>
          <Box 
            sx={{ 
              display: 'flex', 
              width: '100%',
              gap: 0.5 
            }}
          >
            {[1, 2, 3].map((level) => (
              <Box 
                key={level}
                sx={{
                  height: 4,
                  borderRadius: 1,
                  flex: 1,
                  bgcolor: level <= passwordStrength.strength 
                    ? passwordStrength.color 
                    : 'grey.300'
                }}
              />
            ))}
          </Box>
          <Typography variant="caption" sx={{ ml: 1, color: passwordStrength.color }}>
            {passwordStrength.text}
          </Typography>
        </PasswordStrengthIndicator>
      )}
      
      <StyledTextField
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        variant="outlined"
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={() => handleBlur('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      
      <FormControlLabel
        control={
          <Checkbox 
            name="agreeToTerms" 
            color="primary" 
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
        }
        label={
          <Typography variant="body2">
            I agree to the Terms of Service and Privacy Policy
          </Typography>
        }
      />
      
      {errors.agreeToTerms && (
        <Typography variant="caption" color="error" sx={{ mt: -1, mb: 1, display: 'block' }}>
          {errors.agreeToTerms}
        </Typography>
      )}
      
      <AnimatedButton
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
      </AnimatedButton>
      
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
        By registering, you'll get access to exclusive industrial painting tools and resources.
      </Typography>
    </Box>
  );
};

export default RegisterForm;
