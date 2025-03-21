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
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../common/Logo';
import DarkModeToggle from './DarkModeToggle';

const InnerNavbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
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
            {/* Mobile menu button (left aligned) */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Dark Mode Toggle - desktop only */}
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <DarkModeToggle />
              </Box>
            )}

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Logo - right aligned (reversed from OutsideNavbar) */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo size="medium" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Toolbar placeholder to prevent content from hiding under the AppBar */}
      <Toolbar />

      {/* Mobile Drawer - now opens from left */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="left"
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

export default InnerNavbar;
