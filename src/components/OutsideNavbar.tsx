import { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Divider,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import DarkModeToggle from './DarkModeToggle';
import SubmenuDropdown, { SubMenuItem } from '../common/SubmenuDropdown';

interface NavItem {
  label: string;
  path: string;
  children?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { 
    label: 'Residential Painting', 
    path: '/residential',
    children: [
      { label: 'Exterior Painting', path: '/residential/exterior' },
      { label: 'Interior Painting', path: '/residential/interior' },
      { label: 'Services', path: '/residential/services' },
    ]
  },
  { 
    label: 'Commercial Painting', 
    path: '/commercial',
    children: [
      { label: 'Services', path: '/commercial/services' },
      { label: 'National Account', path: '/commercial/national-account' },
      { label: 'Case Studies', path: '/commercial/case-studies' },
    ]
  },
  { label: 'Reviews', path: '/reviews' },
  { 
    label: 'About Us', 
    path: '/about',
    children: [
      { label: 'Why Choose Us?', path: '/about/why-choose-us' },
      { label: 'Social Purpose', path: '/about/social-purpose' },
      { label: 'Painting Blog', path: '/about/blog' },
      { label: 'Diversity & Inclusion', path: '/about/diversity' },
    ]
  },
  { label: 'Find a Location', path: '/locations' },
  { 
    label: 'Own a Franchise', 
    path: '/franchise',
    children: [
      { label: 'Our Story', path: '/franchise/our-story' },
      { label: 'Why Franchise', path: '/franchise/why-franchise' },
      { label: 'The Process', path: '/franchise/process' },
      { label: 'Investment', path: '/franchise/investment' },
      { label: 'Available Markets', path: '/franchise/markets' },
    ]
  },
  { 
    label: 'Careers', 
    path: '/careers',
    children: [
      { label: 'Positions Near You', path: '/careers/positions' },
      { label: 'Work With Corporate', path: '/careers/corporate' },
    ]
  },
  { label: 'login', path: '/login' },
];

const OutsideNavbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Logo size="small" />
        <IconButton edge="end" color="inherit" aria-label="close" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            sx={{ 
              textAlign: 'center',
              color: theme.palette.text.primary,
              textDecoration: 'none',
              py: 1,
              flexDirection: 'column'
            }}
          >
            <SubmenuDropdown
              label={item.label}
              path={item.path}
              children={item.children}
              onClose={handleDrawerToggle}
            />
          </ListItem>
        ))}
        
        {/* Dark Mode Toggle as a list item */}
        <ListItem 
          sx={{ 
            textAlign: 'center',
            py: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}>
            <DarkModeToggle />
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed"
        color="transparent" 
        elevation={0}
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: 'background.paper',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo size="medium" />
            </Box>

            {/* Navigation for desktop */}
            {!isMobile ? (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexGrow: 1,
                pr: 8 // Add padding-right to give space for the absolute-positioned toggle
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  height: '64px', 
                  alignItems: 'center',
                  '& > *': {
                    height: '100%'
                  }
                }}>
                  {navItems.map((item) => (
                    <SubmenuDropdown 
                      key={item.label} 
                      label={item.label} 
                      path={item.path}
                      children={item.children}
                      isTabItem
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 1 }} />
            )}

            {/* Mobile menu button (right aligned) */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
          
          {/* Dark Mode Toggle with absolute positioning - desktop only */}
          {!isMobile && (
            <Box
              sx={{
                position: 'absolute',
                top: theme.spacing(2),
                right: theme.spacing(3),
                zIndex: theme.zIndex.drawer + 2
              }}
            >
              <DarkModeToggle />
            </Box>
          )}
        </Container>
      </AppBar>

      {/* Toolbar placeholder to prevent content from hiding under the AppBar */}
      <Toolbar />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: '80%', 
            maxWidth: 300,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default OutsideNavbar;
