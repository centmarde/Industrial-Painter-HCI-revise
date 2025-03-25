import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DarkModeToggle from './DarkModeToggle';
import { useUserStore } from '../stores/UserStore';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { useAuth } from '../stores/Auth';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';

interface MenuAppBarProps {
  onToggle?: (collapsed: boolean) => void;
  sidebarCollapsed?: boolean;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
  };
}

export default function MenuAppBar({ onToggle, sidebarCollapsed = false }: MenuAppBarProps) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const { user } = useUserStore();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
    handleClose();
  };

  const handleConfirmLogout = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleSidebarToggle = () => {
    // Simply call onToggle with the inverse of current state
    if (onToggle) {
      onToggle(!sidebarCollapsed);
    }
  };

  const handleProfile = () => {
    navigate('/settings/my-account');
    handleClose();
  };

  const handleAccountSettings = () => {
    navigate('/settings/my-account');
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" color="default">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <DarkModeToggle />
          
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <UserAvatar />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user ? (
                  <div>
                    <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
                      <UserAvatar size={40} additionalSx={{ marginRight: 1 }} />
                      <Typography variant="body2" color="text.primary">
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleAccountSettings}>Account Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem onClick={handleClose}>Login</MenuItem>
                    <MenuItem onClick={handleClose}>Register</MenuItem>
                  </div>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Logout confirmation dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleCancelLogout}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout}>Cancel</Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
