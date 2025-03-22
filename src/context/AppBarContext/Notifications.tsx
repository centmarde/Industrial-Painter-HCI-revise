import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme/theme';

// Notification item interface
interface NotificationItem {
  id: number;
  message: string;
  read: boolean;
  time: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, message: "New quote request received", read: false, time: "10 min ago" },
    { id: 2, message: "Your consultation is scheduled for tomorrow", read: false, time: "1 hour ago" },
    { id: 3, message: "Payment received for invoice #1234", read: true, time: "Yesterday" },
  ]);
  
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const unreadCount = notifications.filter(notif => !notif.read).length;
  const open = Boolean(anchorEl);
  const id = open ? 'notifications-popover' : undefined;
  
  return (
    <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Notifications
        </Typography>
        <IconButton 
          size="medium" 
          color="primary" 
          onClick={handleClick}
          aria-describedby={id}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: 300, maxHeight: 400, overflow: 'auto', p: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            {unreadCount > 0 && (
              <Typography 
                variant="body2" 
                color="primary" 
                sx={{ cursor: 'pointer' }}
                onClick={markAllAsRead}
              >
                Mark all as read
              </Typography>
            )}
          </Box>
          <Divider />
          <List>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem 
                  key={notification.id}
                  sx={{ 
                    backgroundColor: notification.read ? 'transparent' : 'rgba(251, 133, 0, 0.1)',
                    mb: 0.5,
                    borderRadius: 1
                  }}
                >
                  <ListItemText 
                    primary={notification.message}
                    secondary={notification.time}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No notifications" />
              </ListItem>
            )}
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default Notifications;
