import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { 
  Box, 
  Typography, 
  IconButton, 
  useMediaQuery,
  Badge,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { 
  Sidebar, 
  useProSidebar
} from 'react-pro-sidebar';
import { useLocation } from 'react-router-dom'; // Add this import
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// Import useThemeContext instead of static theme
import { useThemeContext } from '../context/ThemeContext';
import { createAppTheme } from '../theme/theme';
import NavigationMenu from '../context/AppBarContext/NavigationMenu';
import MobileAppBar from '../context/AppBarContext/MobileAppBar';
// Import the useAuth hook
import { useAuth } from '../stores/Auth';

// Interface for props
interface AppBarProps {
  onToggle?: (collapsed: boolean) => void;
  sidebarCollapsed?: boolean; // Add prop to receive current state
}

// Notification item interface
interface NotificationItem {
  id: number;
  message: string;
  read: boolean;
  time: string;
}

// Map routes to menu items - add this outside the component
const routeToMenuItemMap: Record<string, string> = {
  '/home': 'Dashboard',
  '/home/consultation': 'Consultation',
  '/home/chat-with-ai': 'Chat with AI',
  // Add more mappings as needed for your routes
};

const AppBar: React.FC<AppBarProps> = ({ onToggle, sidebarCollapsed }) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [selected, setSelected] = useState('Dashboard'); // Default to Dashboard
  const isMobile = useMediaQuery('(max-width:768px)');
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  
  // Get theme from context - change toggleColorMode to toggleTheme
  const { mode, toggleTheme } = useThemeContext();
  const dynamicTheme = createAppTheme(mode);
  
  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, message: "New quote request received", read: false, time: "10 min ago" },
    { id: 2, message: "Your consultation is scheduled for tomorrow", read: false, time: "1 hour ago" },
    { id: 3, message: "Payment received for invoice #1234", read: true, time: "Yesterday" },
  ]);
  const [notificationExpanded, setNotificationExpanded] = useState(true);

  // Fix the ref structure
  const isInitialRender = React.useRef(true);
  const previousMobile = React.useRef(isMobile);

  // Add a toggle lock to prevent recursive toggling
  const toggleLock = React.useRef(false);

  // Modify the useEffect to use the toggle lock
  useEffect(() => {
    // Prevent toggling during the initial render and when the toggle is locked
    if (onToggle && !isInitialRender.current && !toggleLock.current) {
      // Don't trigger during the isMobile change
      if (previousMobile.current === isMobile) {
        toggleLock.current = true; // Lock to prevent recursive toggling
        try {
          if (isMobile) {
            onToggle(!mobileSidebarVisible);
          } else {
            onToggle(collapsed);
          }
        } finally {
          // Release lock after a small delay
          setTimeout(() => {
            toggleLock.current = false;
          }, 100);
        }
      }
    }
    
    // Track previous mobile state
    previousMobile.current = isMobile;
  }, [collapsed, mobileSidebarVisible, isMobile, onToggle]);

  // Add this effect to handle the initial render flag
  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  useEffect(() => {
    // Auto-collapse sidebar on mobile
    if (isMobile && !collapsed) {
      collapseSidebar(true);
    }
  }, [isMobile, collapsed, collapseSidebar]);

  // Effect to sync ProSidebar with external collapse state
  useEffect(() => {
    // Only run this effect if sidebarCollapsed is explicitly defined
    // and different from the current state
    if (sidebarCollapsed !== undefined && sidebarCollapsed !== collapsed && !isMobile) {
      collapseSidebar(sidebarCollapsed);
    }
  }, [sidebarCollapsed, collapsed, collapseSidebar, isMobile]);

  // Modify handleToggleSidebar to use the toggle lock
  const handleToggleSidebar = () => {
    if (toggleLock.current) return; // Skip if locked

    toggleLock.current = true;
    try {
      if (isMobile) {
        const newState = !mobileSidebarVisible;
        setMobileSidebarVisible(newState);
        if (onToggle) onToggle(newState);
      } else {
        const newState = !collapsed;
        collapseSidebar(newState);
        if (onToggle) onToggle(newState);
      }
    } finally {
      // Release lock after a small delay
      setTimeout(() => {
        toggleLock.current = false;
      }, 100);
    }
  };

  // Get the current location from router
  const location = useLocation();
  
  // Update selected item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const menuItem = routeToMenuItemMap[currentPath];
    
    if (menuItem) {
      setSelected(menuItem);
    }
  }, [location]);

  const handleItemClick = (title: string) => {
    setSelected(title);
  };
  
  const toggleNotificationExpand = () => {
    setNotificationExpanded(!notificationExpanded);
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Get the logout function from Auth context
  const { logout } = useAuth();

  // Update the logout handler to use the actual logout function
  const handleLogout = async () => {
    try {
      // Call the actual logout function from Auth context
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      // You might want to show an error notification here
    }
  };

  return (
    <ThemeProvider theme={dynamicTheme}>
      {isMobile ? (
        // Mobile top navbar with breadcrumb
        <MobileAppBar
          theme={dynamicTheme}
          selected={selected}
          collapsed={collapsed}
          notifications={notifications}
          unreadCount={unreadCount}
          handleItemClick={handleItemClick}
          markAllAsRead={markAllAsRead}
          onToggleSidebar={handleToggleSidebar}
          mode={mode}
          toggleTheme={toggleTheme} // Pass toggleTheme instead of toggleColorMode
        />
      ) : (
        // Regular sidebar for desktop with improved padding
        <Box sx={{ 
          position: 'fixed',
          zIndex: 1300,
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0
        }}>
          <Sidebar
            backgroundColor={mode === 'dark' ? '#323232' : dynamicTheme.palette.background.paper}
            rootStyles={{
              border: 'none',
              color: dynamicTheme.palette.text.primary,
              height: '100%',
              boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}
            width={collapsed ? "80px" : "250px"}
            collapsedWidth="80px"
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%',
              p: collapsed ? 1 : 0 // Add base padding when collapsed
            }}>
              {/* Top header section with improved padding */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  p: collapsed ? 1 : 2,
                  pt: 3,
                  pb: 3,
                  mb: 2,
                  borderBottom: `1px solid ${dynamicTheme.palette.divider}`
                }}
              >
                {!collapsed && (
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: dynamicTheme.palette.primary.main, 
                      pl: 1,
                      cursor: 'pointer'
                    }}
                    onClick={() => window.location.href = '/home'}
                  >
                    Industrial Painter
                  </Typography>
                )}
                <IconButton onClick={handleToggleSidebar} sx={{ color: dynamicTheme.palette.primary.main }}>
                  <MenuRoundedIcon />
                </IconButton>
              </Box>

              {/* Menu section - using NavigationMenu component */}
              <NavigationMenu 
                isMobile={false}
                collapsed={collapsed}
                selected={selected}
                handleItemClick={handleItemClick}
                theme={dynamicTheme}
                mode={mode}
                toggleTheme={toggleTheme} // Pass toggleTheme instead of toggleColorMode
                handleLogout={handleLogout}
              />
              
              {/* Notifications section at the bottom */}
              {!collapsed && (
                <Box sx={{ 
                  borderTop: `1px solid ${dynamicTheme.palette.divider}`,
                  marginTop: 'auto'
                }}>
                  {notificationExpanded && (
                    <Box sx={{ 
                      height: '250px',
                      px: 1,
                      pt: 1,
                      overflow: 'hidden'
                    }}>
                      <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: true }}>
                        <List dense>
                          {notifications.length > 0 ? (
                            [...notifications].reverse().map((notification) => (
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
                      </PerfectScrollbar>
                    </Box>
                  )}
                  
                  {/* Notification header with improved padding */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2,
                    borderTop: notificationExpanded ? `1px solid ${dynamicTheme.palette.divider}` : 'none'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Notifications
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={toggleNotificationExpand}
                        sx={{ ml: 0.5 }}
                      >
                        {notificationExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                      </IconButton>
                    </Box>
                    <Box>
                      <Badge badgeContent={unreadCount} color="error">
                        <NotificationsIcon color="primary" />
                      </Badge>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Sidebar>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default AppBar;
