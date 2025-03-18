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
  Tab
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import DarkModeToggle from './DarkModeToggle';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Residential Painting', path: '/residential' },
  { label: 'Commercial Painting', path: '/commercial' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'About Us', path: '/about' },
  { label: 'Find a Location', path: '/locations' },
  { label: 'Own a Franchise', path: '/franchise' },
  { label: 'Careers', path: '/careers' },
];

const OutsideNavbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Logo size="small" />
        <IconButton edge="end" color="inherit" aria-label="close" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            component={Link} 
            to={item.path} 
            sx={{ 
              textAlign: 'center',
              color: theme.palette.text.primary,
              textDecoration: 'none',
              py: 1
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
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
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ 
                    '& .MuiTab-root': { 
                      textTransform: 'none', 
                      fontSize: '0.9rem',
                      minWidth: 'auto',
                      px: 2
                    }
                  }}
                >
                  {navItems.map((item, index) => (
                    <Tab 
                      key={item.label} 
                      label={item.label} 
                      component={Link}
                      to={item.path}
                    />
                  ))}
                </Tabs>
              </Box>
            ) : null}

            {/* Actions section (right side) */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Dark Mode Toggle */}
              <DarkModeToggle />
              
              {/* Mobile menu button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
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
