import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { validateEmail, validateStrongPassword } from '../utils/Validator';
import Oauth from '../common/Oauth';
import { useAuth } from '../stores/Auth';
import { showToast, toastMessages } from '../utils/toastConfig';

const AnimatedButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.2),
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.custom.darkest,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    auth: ''
  });
  
  const navigate = useNavigate();

  // Wrap the useAuth call in a try-catch to handle the case where AuthProvider is missing
  let login: (email: string, password: string) => Promise<any>;
  try {
    const auth = useAuth();
    login = auth.login;
  } catch (error) {
    console.error('Auth Provider Error:', error);
    // Show an error UI if the AuthProvider is missing
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">
          Authentication provider not found. Please ensure that your application is wrapped with AuthProvider.
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Add {'<AuthProvider>...</AuthProvider>'} to your App component.
          </Typography>
        </Alert>
      </Box>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === 'rememberMe') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear errors when typing
      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleBlur = (name: string) => {
    let error = '';
    
    switch (name) {
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validateStrongPassword(formData.password);
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '', auth: '' };
    let isValid = true;
    
    const emailError = validateEmail(formData.email);
    
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
        await login(formData.email, formData.password);
        console.log('Login successful');
        showToast.success(toastMessages.loginSuccess);
        // Navigate to home page after successful login
        navigate('/home');
      } catch (error: any) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid email or password.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Too many attempts. Please try again later.';
        }
        
        setErrors(prev => ({ ...prev, auth: errorMessage }));
        showToast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {errors.auth && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.auth}
        </Alert>
      )}
      
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
        autoComplete="current-password"
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
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox 
              name="rememberMe" 
              color="primary" 
              checked={formData.rememberMe} 
              onChange={handleChange}
            />
          }
          label="Remember me"
        />
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ 
            cursor: 'pointer', 
            '&:hover': { textDecoration: 'underline' } 
          }}
        >
          Forgot password?
        </Typography>
      </Box>
      
      <AnimatedButton
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </AnimatedButton>
      
      <Oauth />
    </Box>
  );
};

export default LoginForm;
