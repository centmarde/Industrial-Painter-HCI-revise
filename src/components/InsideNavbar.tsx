import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DarkModeToggle from './DarkModeToggle';
import { useUserStore } from '../stores/UserStore';
import { Avatar, Divider } from '@mui/material';
import { useAuth } from '../stores/Auth';

interface MenuAppBarProps {
  onToggle?: (collapsed: boolean) => void;
  sidebarCollapsed?: boolean; // Add prop to receive current state
}

export default function MenuAppBar({ onToggle, sidebarCollapsed = false }: MenuAppBarProps) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useUserStore();
  const { logout } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleSidebarToggle = () => {
    // Simply call onToggle with the inverse of current state
    if (onToggle) {
      onToggle(!sidebarCollapsed);
    }
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
                {user?.photoURL ? (
                  <Avatar src={user.photoURL} alt={user.displayName || 'User'} />
                ) : (
                  <AccountCircle />
                )}
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
                  <>
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="subtitle1">{user.displayName || 'User'}</Typography>
                      <Typography variant="body2" color="text.primary">{user.email}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleClose}>Login</MenuItem>
                    <MenuItem onClick={handleClose}>Register</MenuItem>
                  </>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
