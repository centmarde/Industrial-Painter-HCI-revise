import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Theme,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { 
  Menu, 
  MenuItem
} from 'react-pro-sidebar';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Define interface for menu item
export interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isUtility?: boolean;
  color?: string;
}

// Interface for the component props
interface NavigationMenuProps {
  isMobile: boolean;
  collapsed: boolean;
  selected: string;
  handleItemClick: (title: string) => void;
  theme: Theme;
  mode?: 'light' | 'dark';
  toggleTheme?: () => void;
  handleLogout?: () => void;
}

// Menu items data structure for reuse
export const menuItems: NavigationItem[] = [
  { title: 'Get a Quote', icon: <ReceiptLongIcon /> },
  { title: 'Consultation', icon: <ChatIcon /> },
  { title: 'My Account', icon: <AccountCircleIcon /> },
  { title: 'Settings', icon: <SettingsIcon /> },
  { title: 'Career', icon: <WorkIcon /> },
  { title: 'Schedules', icon: <CalendarMonthIcon /> },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  isMobile,
  collapsed,
  selected,
  handleItemClick,
  theme,
  mode = 'light',
  toggleTheme,
  handleLogout
}) => {
  const navigate = useNavigate();
  // Add state for logout confirmation dialog
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  // Functions to handle dialog
  const openLogoutDialog = () => setLogoutDialogOpen(true);
  const closeLogoutDialog = () => setLogoutDialogOpen(false);
  
  // Function to handle confirm logout
  const confirmLogout = () => {
    closeLogoutDialog();
    if (handleLogout) {
      handleLogout();
    }
  };

  // Modified to show dialog for both mobile and desktop
  const handleLogoutClick = () => {
    // Show confirmation dialog for both mobile and desktop
    openLogoutDialog();
  };

  // Function to handle navigation when menu item is clicked
  const handleNavigation = (title: string) => {
    // Call the original handleItemClick function
    handleItemClick(title);
    
    // Navigate to the appropriate URL
    const path = `/home/${title.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(path);
  };

  // Create utility items for theme toggle and logout
  const utilityItems: NavigationItem[] = [
    { 
      title: mode === 'dark' ? 'Light Mode' : 'Dark Mode',
      icon: mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />,
      onClick: toggleTheme,
      isUtility: true
    },
    { 
      title: 'Logout',
      icon: <LogoutIcon fontSize="small" />,
      onClick: handleLogoutClick, // Changed to use the new handler function
      isUtility: true,
      color: theme.palette.error.main
    }
  ];

  if (isMobile) {
    return (
      <>
        <Box sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
          <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.title)}
                    selected={selected === item.title}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                      },
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                      },
                    }}
                  >
                    <Box sx={{ mr: 2 }}>{item.icon}</Box>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
              
              {/* Utility Items Section */}
              <Divider sx={{ my: 1 }} />
              
              {utilityItems.map((item) => (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    onClick={item.onClick}
                    sx={{
                      color: item.color,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <Box sx={{ mr: 2 }}>{item.icon}</Box>
                    <ListItemText 
                      primary={item.title} 
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        fontSize: '0.8rem'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
        </Box>
        
        {/* Add dialog for mobile view */}
        <Dialog
          open={logoutDialogOpen}
          onClose={closeLogoutDialog}
          aria-labelledby="mobile-logout-dialog-title"
          aria-describedby="mobile-logout-dialog-description"
        >
          <DialogTitle id="mobile-logout-dialog-title" sx={{ color: theme.palette.primary.main }}>
            Confirm Logout
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="mobile-logout-dialog-description">
              Are you sure you want to log out of your account?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={closeLogoutDialog} variant="outlined">
              Cancel
            </Button>
            <Button 
              onClick={confirmLogout} 
              variant="contained" 
              color="primary" 
              autoFocus
            >
              Log Out
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Box sx={{ 
        flex: '1 1 auto',
        px: collapsed ? 0 : 1,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: true }}>
          <Menu
            menuItemStyles={{
              button: ({ level, active }) => {
                return {
                  margin: collapsed ? '4px 0' : '6px 0', // Smaller margins for more compact layout
                  padding: collapsed ? '10px 5px' : '10px 12px', // Reduced padding
                  borderRadius: '6px', // Slightly smaller border radius
                  backgroundColor: active ? theme.palette.primary.light : undefined,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                  },
                  color: active ? theme.palette.primary.contrastText : undefined,
                };
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem 
                key={item.title}
                icon={item.icon} 
                onClick={() => handleNavigation(item.title)}
                active={selected === item.title}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
          
          {/* Divider between regular menu and utility items */}
          <Divider sx={{ my: 1, mx: collapsed ? 0 : 1 }} />
          
          {/* Utility Menu Items */}
          <Menu
            menuItemStyles={{
              button: ({ level, active }) => {
                return {
                  margin: collapsed ? '2px 0' : '4px 0', // Even smaller margins for utility items
                  padding: collapsed ? '8px 5px' : '8px 12px', // Smaller padding
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                };
              },
            }}
          >
            {utilityItems.map((item) => (
              collapsed ? (
                <Tooltip key={item.title} title={item.title} placement="right">
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.5 }}>
                    <Box 
                      onClick={item.onClick} 
                      sx={{ 
                        color: item.color,
                        display: 'flex', 
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        }
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Box>
                </Tooltip>
              ) : (
                <MenuItem 
                  key={item.title}
                  icon={item.icon}
                  onClick={item.onClick}
                  // Style is controlled by menuItemStyles above
                  rootStyles={{ color: item.color }}
                >
                  <span style={{ fontSize: '0.8rem' }}>{item.title}</span>
                </MenuItem>
              )
            ))}
          </Menu>
        </PerfectScrollbar>
      </Box>
      
      {/* Logout Confirmation Dialog - now shared between mobile and desktop */}
      <Dialog
        open={logoutDialogOpen}
        onClose={closeLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title" sx={{ color: theme.palette.primary.main }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={closeLogoutDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={confirmLogout} 
            variant="contained" 
            color="primary" 
            autoFocus
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavigationMenu;
