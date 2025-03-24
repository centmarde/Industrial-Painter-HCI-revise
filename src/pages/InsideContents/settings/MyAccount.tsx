import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, TextField, Button, Avatar, 
  Tab, Tabs, Paper, Grid, Snackbar, Alert, 
  CircularProgress, IconButton, InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  doc, getDoc, updateDoc, setDoc 
} from 'firebase/firestore';
// Remove unused imports
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth, db } from '../../../lib/FirebaseConfig';
import { useUserStore } from '../../../stores/UserStore';
import { validateName } from '../../../utils/Validator';
import { uploadProfilePicture } from '../../../utils/StorageUtils';
import SecurityTab from './SecurityTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const MyAccount = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get user from Zustand store
  const storeUser = useUserStore((state) => state.user);
  const setStoreUser = useUserStore((state) => state.setUser);
  
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState<any>({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    bio: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [openAlert, setOpenAlert] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Load user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // First check if we have a user in the store
        const currentUser = storeUser || auth.currentUser;
        
        if (!currentUser) {
          throw new Error('No user is signed in');
        }

        const userId = id || currentUser.uid;
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            displayName: userData.displayName || currentUser.displayName || '',
            email: userData.email || currentUser.email || '',
            phoneNumber: userData.phoneNumber || currentUser.phoneNumber || '',
            photoURL: userData.photoURL || currentUser.photoURL || '',
            bio: userData.bio || '',
          });
        } else {
          // Create user document if it doesn't exist
          await setDoc(userDocRef, {
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            phoneNumber: currentUser.phoneNumber || '',
            photoURL: currentUser.photoURL || '',
            bio: '',
            createdAt: new Date(),
          });
          
          // Set initial user state with data from auth
          setUser({
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            phoneNumber: currentUser.phoneNumber || '',
            photoURL: currentUser.photoURL || '',
            bio: '',
          });
        }
      } catch (error: any) {
        showAlert('error', `Error loading user data: ${error.message}`);
        // If there's no user, redirect to login
        if (error.message === 'No user is signed in') {
          navigate('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, storeUser, navigate]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev: typeof user) => ({ ...prev, [name]: value }));
    
    // Validate display name if that field was changed
    if (name === 'displayName') {
      const error = validateName(value);
      if (error) {
        showAlert('error', error);
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const currentUser = storeUser || auth.currentUser;
      if (!currentUser) throw new Error('No user is signed in');
      
      const userId = id || currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      
      let photoURL = user.photoURL;
      if (photoFile) {
        // Use the enhanced utility function that now uses Supabase
        try {
          photoURL = await uploadProfilePicture(photoFile, currentUser);
          
          // The URL is now stored in Firestore by the utility function
          // And the path reference is also stored
        } catch (uploadError: any) {
          showAlert('error', uploadError.message);
          // Continue with the update even if the image upload fails
        }
      }
      
      await updateDoc(userDocRef, {
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
        // Don't need to update photoURL here as it's handled by the upload function
        updatedAt: new Date(),
      });
      
      // Update local state
      setUser((prev: typeof user) => ({ ...prev, photoURL: photoURL || prev.photoURL }));
      
      // Also update Firebase Auth user profile if possible
      if (auth.currentUser) {
        // Firebase Auth update method seems to be commented out in your code
        // But let's use it if you want to uncomment it later
        /* 
        await auth.currentUser.updateProfile({
          displayName: user.displayName,
          photoURL: photoURL || user.photoURL,
        }); 
        */
        
        // Update the user in the Zustand store
        setStoreUser(auth.currentUser);
      }
      
      showAlert('success', 'Profile updated successfully!');
    } catch (error: any) {
      showAlert('error', `Error updating profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', my: 10 }}>
     
      
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue}
          onChange={handleTabChange} 
          aria-label="account tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label={<Box sx={{ display: 'flex', alignItems: 'center' }}><AccountCircleIcon sx={{ mr: 1 }} />Profile</Box>} 
            id="account-tab-0" 
            aria-controls="account-tabpanel-0" 
          />
          <Tab 
           label={<Box sx={{ display: 'flex', alignItems: 'center' }}><LockIcon sx={{ mr: 1 }} />Security</Box>} 
            id="account-tab-1" 
            aria-controls="account-tabpanel-1" 
          />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                src={photoPreview || user.photoURL} 
                alt={user.displayName}
                sx={{ width: 150, height: 150, mb: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              
              <Button
                component="label"
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
                size="small"
                sx={{ mb: 3, borderRadius: '24px', px: 2 }}
              >
                Change Photo
                <VisuallyHiddenInput type="file" accept="image/*" onChange={handlePhotoChange} />
              </Button>
              
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2, px: 2 }}>
                Upload a professional profile photo to enhance your profile
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Display Name"
                  name="displayName"
                  value={user.displayName}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!validateName(user.displayName)}
                  helperText={validateName(user.displayName) || ""}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
                
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  disabled
                  variant="outlined"
                  helperText="Email cannot be changed"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
                
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
                
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Bio"
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Tell us a bit about yourself"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={updateProfile}
                disabled={loading}
                sx={{ 
                  borderRadius: '24px', 
                  px: 4,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: 2
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <SecurityTab 
            loading={loading}
            setLoading={setLoading}
            showAlert={showAlert}
          />
        </TabPanel>
      </Paper>
      
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyAccount;
