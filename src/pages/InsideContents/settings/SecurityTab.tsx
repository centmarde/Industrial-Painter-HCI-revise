import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Grid, 
  CircularProgress, IconButton, InputAdornment,
  LinearProgress
} from '@mui/material';
import { 
  updatePassword, reauthenticateWithCredential, 
  EmailAuthProvider
} from 'firebase/auth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { auth } from '../../../lib/FirebaseConfig';
import { 
  validateStrongPassword, 
  validatePasswordsMatch,
  getPasswordStrength
} from '../../../utils/Validator';
import { useUserStore } from '../../../stores/UserStore';

interface SecurityTabProps {
  setLoading: (loading: boolean) => void;
  loading: boolean;
  showAlert: (type: 'success' | 'error', message: string) => void;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ 
  setLoading, 
  loading, 
  showAlert 
}) => {
  const storeUser = useUserStore((state) => state.user);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    text: '',
    color: 'text.disabled'
  });

  const validatePasswordForm = () => {
    const errors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    
    if (!oldPassword) errors.oldPassword = 'Old password is required';
    
    const newPasswordError = validateStrongPassword(newPassword);
    if (newPasswordError) {
      errors.newPassword = newPasswordError;
    }
    
    const confirmPasswordError = validatePasswordsMatch(newPassword, confirmPassword);
    if (confirmPasswordError) {
      errors.confirmPassword = confirmPasswordError;
    }
    
    setPasswordErrors(errors);
    return !errors.oldPassword && !errors.newPassword && !errors.confirmPassword;
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    
    // Update password strength
    setPasswordStrength(getPasswordStrength(value));
  };

  const handlePasswordChange = async () => {
    if (!validatePasswordForm()) return;
    
    setLoading(true);
    try {
      const currentUser = storeUser || auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('No user is signed in or email is missing');
      }
      
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        oldPassword
      );
      
      await reauthenticateWithCredential(currentUser, credential);
      
      // Update password
      await updatePassword(currentUser, newPassword);
      
      // Clear form
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      showAlert('success', 'Password changed successfully!');
    } catch (error: any) {
      let errorMessage = 'Failed to change password';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'The old password is incorrect';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Try again later';
      } else if (error.message) {
        errorMessage = error.message;
      }
      showAlert('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Current Password"
            type={showOldPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={!!passwordErrors.oldPassword}
            helperText={passwordErrors.oldPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={handleNewPasswordChange}
            error={!!passwordErrors.newPassword}
            helperText={passwordErrors.newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {newPassword && (
            <Box sx={{ mt: 1, mb: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={(passwordStrength.strength / 3) * 100} 
                color={
                  passwordStrength.strength === 3 ? "success" :
                  passwordStrength.strength === 2 ? "warning" : "error"
                }
                sx={{ height: 8, borderRadius: 5 }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: passwordStrength.color,
                  display: 'block',
                  textAlign: 'right',
                  mt: 0.5
                }}
              >
                {passwordStrength.text} password
              </Typography>
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!passwordErrors.confirmPassword}
            helperText={passwordErrors.confirmPassword || 
              (confirmPassword ? validatePasswordsMatch(newPassword, confirmPassword) : '')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePasswordChange}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update Password'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SecurityTab;
