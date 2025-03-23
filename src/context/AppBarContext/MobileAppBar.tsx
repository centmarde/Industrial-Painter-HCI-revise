import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  AppBar as MuiAppBar,
  Toolbar,
  Drawer,
  Breadcrumbs,
  Link
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigationMenu from './NavigationMenu';
import { Theme } from '@mui/material/styles';

// Notification item interface
interface NotificationItem {
  id: number;
  message: string;
  read: boolean;
  time: string;
}

// Interface for props
interface MobileAppBarProps {
  theme: Theme;
  selected: string;
  collapsed: boolean;
  notifications: NotificationItem[];
  unreadCount: number;
  handleItemClick: (title: string) => void;
  markAllAsRead: () => void;
  onToggleSidebar: () => void;
}

const MobileAppBar: React.FC<MobileAppBarProps> = ({
  theme,
  selected,
  collapsed,
  notifications,
  unreadCount,
  handleItemClick,
  markAllAsRead,
  onToggleSidebar
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileNotificationsExpanded, setMobileNotificationsExpanded] = useState(true);

  const toggleMobileNotifications = () => {
    setMobileNotificationsExpanded(!mobileNotificationsExpanded);
  };

  // Fix the handleToggleSidebar function to avoid double toggling
  const handleToggleSidebar = () => {
    // Only toggle drawer state locally, don't call parent toggle
    setMobileDrawerOpen(!mobileDrawerOpen);
    // Don't call onToggleSidebar here - this was causing the loop
  };

  const handleCloseDrawer = () => {
    setMobileDrawerOpen(false);
  };

  const handleMobileItemClick = (title: string) => {
    handleItemClick(title);
    handleCloseDrawer();
  };

  return (
    <>
      <MuiAppBar position="fixed" sx={{ 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1300,
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Breadcrumb */}
          <Breadcrumbs 
            aria-label="breadcrumb" 
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ flexGrow: 1 }}
          >
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
              {selected}
            </Typography>
          </Breadcrumbs>
          
          {/* Mobile menu toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit" 
              edge="end" 
              onClick={handleToggleSidebar}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Badge badgeContent={unreadCount} color="error" sx={{ ml: 1 }}>
              <NotificationsIcon color="primary" />
            </Badge>
          </Box>
        </Toolbar>
      </MuiAppBar>
      
      {/* Mobile drawer menu */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" color="primary.main">
            Industrial Painter
          </Typography>
        </Box>
        
        {/* Menu items section with scrollable content */}
        <NavigationMenu 
          isMobile={true}
          collapsed={collapsed}
          selected={selected}
          handleItemClick={handleMobileItemClick}
          theme={theme}
        />
        
        {/* Mobile notifications section */}
        <Box sx={{ 
          borderTop: `1px solid ${theme.palette.divider}`,
          p: 2
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 1
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Notifications
              </Typography>
              <IconButton 
                size="small" 
                onClick={toggleMobileNotifications}
                sx={{ ml: 0.5 }}
              >
                {mobileNotificationsExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              </IconButton>
            </Box>
            <Box>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon color="primary" />
              </Badge>
            </Box>
          </Box>
          
          {/* Expanded notification list for mobile */}
          {mobileNotificationsExpanded && (
            <Box sx={{ 
              height: '250px', 
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: 1,
              mt: 1,
              mb: 1,
              overflow: 'hidden'
            }}>
              <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: true }}>
                <Box sx={{ p: 1 }}>
                  <List dense>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <ListItem 
                          key={notification.id}
                          sx={{ 
                            backgroundColor: notification.read ? 'transparent' : 'rgba(251, 133, 0, 0.1)',
                            mb: 0.5,
                            borderRadius: 1,
                            p: 1
                          }}
                        >
                          <ListItemText 
                            primary={notification.message}
                            secondary={notification.time}
                            primaryTypographyProps={{ variant: 'body2' }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No notifications" primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    )}
                  </List>
                </Box>
              </PerfectScrollbar>
            </Box>
          )}
          
          {unreadCount > 0 && (
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ cursor: 'pointer', textAlign: 'center', mb: 1 }}
              onClick={markAllAsRead}
            >
              Mark all as read
            </Typography>
          )}
        </Box>
      </Drawer>
      
      {/* Add toolbar spacing to prevent content from hiding under appbar */}
      <Toolbar />
    </>
  );
};

export default MobileAppBar;
