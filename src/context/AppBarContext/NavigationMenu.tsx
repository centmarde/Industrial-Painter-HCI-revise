import React from 'react';
import { 
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Theme
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
import PerfectScrollbar from 'react-perfect-scrollbar';

// Define interface for menu item
export interface NavigationItem {
  title: string;
  icon: React.ReactNode;
}

// Interface for the component props
interface NavigationMenuProps {
  isMobile: boolean;
  collapsed: boolean;
  selected: string;
  handleItemClick: (title: string) => void;
  theme: Theme;
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
  theme
}) => {
  if (isMobile) {
    return (
      <Box sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick(item.title)}
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
          </List>
        </PerfectScrollbar>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flex: '1 1 auto',
      px: collapsed ? 0 : 1,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: true }}>
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              return {
                margin: collapsed ? '5px 0' : '8px 0',
                padding: collapsed ? '12px 5px' : '12px 15px',
                borderRadius: '8px',
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
              onClick={() => handleItemClick(item.title)}
              active={selected === item.title}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </PerfectScrollbar>
    </Box>
  );
};

export default NavigationMenu;
