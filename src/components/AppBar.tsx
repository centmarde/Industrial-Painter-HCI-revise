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
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import theme from '../theme/theme';
import NavigationMenu from '../context/AppBarContext/NavigationMenu';
import MobileAppBar from '../context/AppBarContext/MobileAppBar';

// Interface for props
interface AppBarProps {
  onToggle?: (collapsed: boolean) => void;
}

// Notification item interface
interface NotificationItem {
  id: number;
  message: string;
  read: boolean;
  time: string;
}

const AppBar: React.FC<AppBarProps> = ({ onToggle }) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [selected, setSelected] = useState('Get a Quote');
  const isMobile = useMediaQuery('(max-width:768px)');
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  
  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, message: "New quote request received", read: false, time: "10 min ago" },
    { id: 2, message: "Your consultation is scheduled for tomorrow", read: false, time: "1 hour ago" },
    { id: 3, message: "Payment received for invoice #1234", read: true, time: "Yesterday" },
  ]);
  const [notificationExpanded, setNotificationExpanded] = useState(true);

  // Call onToggle whenever collapsed state changes
  useEffect(() => {
    if (onToggle) {
      if (isMobile) {
        // For mobile, pass the mobileSidebarVisible state
        onToggle(!mobileSidebarVisible);
      } else {
        // For desktop, pass the ProSidebar collapsed state
        onToggle(collapsed);
      }
    }
  }, [collapsed, mobileSidebarVisible, isMobile, onToggle]);

  useEffect(() => {
    // Auto-collapse sidebar on mobile
    if (isMobile && !collapsed) {
      collapseSidebar(true);
    }
  }, [isMobile, collapsed, collapseSidebar]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarVisible(!mobileSidebarVisible);
    } else {
      collapseSidebar();
    }
  };

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

  return (
    <ThemeProvider theme={theme}>
      {isMobile ? (
        // Mobile top navbar with breadcrumb
        <MobileAppBar
          theme={theme}
          selected={selected}
          collapsed={collapsed}
          notifications={notifications}
          unreadCount={unreadCount}
          handleItemClick={handleItemClick}
          markAllAsRead={markAllAsRead}
          onToggleSidebar={handleToggleSidebar}
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
            backgroundColor={theme.palette.background.paper}
            rootStyles={{
              border: 'none',
              color: theme.palette.text.primary,
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
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}
              >
                {!collapsed && (
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, pl: 1 }}>
                    Industrial Painter
                  </Typography>
                )}
                <IconButton onClick={handleToggleSidebar} sx={{ color: theme.palette.primary.main }}>
                  <MenuRoundedIcon />
                </IconButton>
              </Box>

              {/* Menu section - using NavigationMenu component */}
              <NavigationMenu 
                isMobile={false}
                collapsed={collapsed}
                selected={selected}
                handleItemClick={handleItemClick}
                theme={theme}
              />
              
              {/* Notifications section at the bottom */}
              {!collapsed && (
                <Box sx={{ 
                  borderTop: `1px solid ${theme.palette.divider}`,
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
                    borderTop: notificationExpanded ? `1px solid ${theme.palette.divider}` : 'none'
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
