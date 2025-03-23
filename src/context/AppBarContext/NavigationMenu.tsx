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
  Button,
  Collapse
} from '@mui/material';
import { 
  Menu, 
  MenuItem,
  SubMenu
} from 'react-pro-sidebar';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Define interface for menu item
export interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isUtility?: boolean;
  color?: string;
  children?: NavigationItem[];
  path?: string;
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
  { title: 'Get a Quote', icon: <ReceiptLongIcon />, path: '/home/get-a-quote' },
  { title: 'Chat with Ai', icon: <SmartToyIcon />, path: '/home/chat-with-ai' },
  { title: 'Consultation', icon: <ChatIcon />, path: '/home/consultation' },
  { 
    title: 'Settings', 
    icon: <SettingsIcon />, 
    children: [
      { title: 'My Account', icon: <AccountCircleIcon />, path: '/home/my-account' },
      { title: 'My Quotes', icon: <ListAltIcon />, path: '/home/my-quotes' }
    ]
  },
  { title: 'Career', icon: <WorkIcon />, path: '/home/career' },
  { title: 'Schedules', icon: <CalendarMonthIcon />, path: '/home/schedules' },
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
  // Add state for mobile submenu expansion
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
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

  // Function to toggle mobile submenu
  const handleToggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  // Function to handle navigation when menu item is clicked
  const handleNavigation = (item: NavigationItem) => {
    // If item has children, toggle submenu instead of navigating (for mobile view)
    if (isMobile && item.children) {
      handleToggleSubmenu(item.title);
      return;
    }
    
    // For items without children, navigate directly
    if (!item.children && item.path) {
      // Call the original handleItemClick function
      handleItemClick(item.title);
      // Navigate to the path
      navigate(item.path);
    }
  };

  // Function to handle child item navigation
  const handleChildNavigation = (childItem: NavigationItem, parentTitle: string) => {
    if (childItem.path) {
      handleItemClick(`${parentTitle} - ${childItem.title}`);
      navigate(childItem.path);
    }
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
                <React.Fragment key={item.title}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(item)}
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
                      {item.children && (
                        openSubmenu === item.title ? <ExpandLess /> : <ExpandMore />
                      )}
                    </ListItemButton>
                  </ListItem>
                  
                  {/* Render children if any */}
                  {item.children && (
                    <Collapse in={openSubmenu === item.title} timeout="auto" unmountOnExit>
                      <List 
                        component="div" 
                        disablePadding 
                        sx={{ 
                          overflowX: 'hidden',
                          width: '100%',
                          ml: 2.5 // Increased indentation
                        }}
                      >
                        {item.children.map((child) => (
                          <ListItem key={child.title} disablePadding>
                            <ListItemButton
                              sx={{ 
                                pl: 2, // Reduced padding
                                maxWidth: '100%',
                                minHeight: '32px', // Smaller height
                                '&.Mui-selected': {
                                  backgroundColor: 'transparent', 
                                  color: theme.palette.primary.main, 
                                  fontWeight: 500,
                                },
                                '&:hover': {
                                  backgroundColor: 'transparent',
                                  color: theme.palette.primary.main,
                                },
                                borderLeft: selected === `${item.title} - ${child.title}` ? 
                                  `1px solid ${theme.palette.primary.main}` : // Thinner border
                                  '1px solid transparent',
                              }}
                              onClick={() => handleChildNavigation(child, item.title)}
                              selected={selected === `${item.title} - ${child.title}`}
                            >
                              <Box sx={{ 
                                mr: 1, // Smaller margin
                                color: selected === `${item.title} - ${child.title}` 
                                  ? theme.palette.primary.main
                                  : theme.palette.primary.main, // Match parent color
                                fontSize: '0.8rem', // Smaller icon
                                display: 'flex',
                                alignItems: 'center',
                                '& > svg': {
                                  fontSize: '0.9rem' // Explicitly size icons smaller
                                }
                              }}>
                                {child.icon}
                              </Box>
                              <ListItemText 
                                primary={child.title} 
                                primaryTypographyProps={{
                                  noWrap: true,
                                  variant: 'body2',
                                  sx: {
                                    fontSize: '0.75rem', // Even smaller text
                                    color: selected === `${item.title} - ${child.title}` 
                                      ? theme.palette.primary.main 
                                      : theme.palette.primary.main, // Match parent color
                                    fontWeight: selected === `${item.title} - ${child.title}` ? 500 : 400
                                  }
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
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
                  margin: '0',
                  padding: collapsed ? '10px 5px' : '10px 12px',
                  borderRadius: '4px', // Reduced border radius for minimalism
                  backgroundColor: active ? theme.palette.primary.light : undefined,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                  },
                  color: active ? theme.palette.secondary.contrastText : undefined,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                };
              },
              subMenuContent: ({ level }) => ({
                backgroundColor: 'transparent',
                borderLeft: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, // Subtle line to show hierarchy
                marginLeft: collapsed ? 0 : '20px',
                paddingLeft: 0,
                boxShadow: 'none', // Remove shadow for minimalism
                border: 'none', // Remove border
                overflow: 'hidden',
                overflowX: 'hidden',
                maxWidth: '100%',
               
              }),
              SubMenuExpandIcon: () => ({
                color: theme.palette.text.secondary,
                fontSize: '1rem', // Smaller icon
              }),
              label: () => ({
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }),
            }}
            rootStyles={{
              overflow: 'hidden',
              maxWidth: '100%'
            }}
          >
            {menuItems.map((item) => (
              item.children ? (
                <SubMenu
                  key={item.title}
                  label={item.title}
                  icon={item.icon}
                  defaultOpen={false}
                  rootStyles={{
                    ['& > .ps-menu-button']: {
                      backgroundColor: 'transparent', // Remove background for minimalism
                      maxWidth: '100%',
                      overflow: 'hidden',
                      transition: 'none', // Remove transition for cleaner look
                    },
                    maxWidth: '100%'
                  }}
                  onOpenChange={(open) => {
                    if (open) {
                      setOpenSubmenu(item.title);
                    } else if (openSubmenu === item.title) {
                      setOpenSubmenu(null);
                    }
                  }}
                >
                  {item.children.map((child) => (
                    <MenuItem
                      key={child.title}
                      icon={child.icon}
                      onClick={() => handleChildNavigation(child, item.title)}
                      active={selected === `${item.title} - ${child.title}`}
                      rootStyles={{
                        margin: '2px 0', // Reduce vertical spacing for compact design
                        padding: '6px 12px', // Reduce padding
                        borderRadius: 0, // Remove border radius
                        color: theme.palette.text.secondary, // Lower contrast for inactive
                        borderLeft: selected === `${item.title} - ${child.title}` ?
                          `2px solid ${theme.palette.primary.main}` : // Simple active indicator
                          '2px solid transparent',
                        backgroundColor: 'transparent', // No background
                        maxWidth: '100%',
                        overflow: 'hidden',
                        ['& .ps-menu-icon']: {
                          color: selected === `${item.title} - ${child.title}` 
                            ? theme.palette.primary.main // Use primary color for selected
                            : theme.palette.text.secondary, // Lighter color for non-selected
                          minWidth: '24px',
                          fontSize: '0.9rem', // Smaller icon
                        },
                        ['& .ps-menu-label']: {
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: '0.85rem', // Smaller text for minimalist
                          fontWeight: selected === `${item.title} - ${child.title}` ? 500 : 400, // Slightly bold when active
                          color: selected === `${item.title} - ${child.title}` 
                            ? theme.palette.primary.main 
                            : theme.palette.text.secondary,
                        },
                        '&:hover': {
                          backgroundColor: 'transparent', // No hover effect
                          color: theme.palette.primary.main, // Just change text color on hover
                        }
                      }}
                    >
                      {child.title}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem 
                  key={item.title}
                  icon={item.icon} 
                  onClick={() => handleNavigation(item)}
                  active={selected === item.title}
                >
                  {item.title}
                </MenuItem>
              )
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
