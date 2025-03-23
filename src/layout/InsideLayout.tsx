import { Box, useTheme, useMediaQuery } from '@mui/material';

import ChatButton from '../components/ChatButton';
import InsideFooter from '../common/InsideFooter';
import { useNavigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useState } from 'react';
import AppBar from '../components/AppBar';
import InsideNavbar from '../components/InsideNavbar';

interface InsideLayoutProps {
  children: React.ReactNode;
}

const InsideLayout: React.FC<InsideLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Handle sidebar toggle from either component
  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };
  
  return (
    <ProSidebarProvider>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Pass both the toggle function and current state to both components */}
        <AppBar 
          onToggle={handleSidebarToggle} 
          sidebarCollapsed={sidebarCollapsed}
        />
       
        {/* Main content area with dynamic padding based on sidebar state */}
        <Box component="main" sx={{ 
          flexGrow: 1,
          width: '100%',
          pl: { 
            xs: sidebarCollapsed ? 0 : '60px',
            sm: sidebarCollapsed ? '80px' : '250px'
          },
          transition: 'padding-left 0.3s ease',
        }}>
          {/* Only render InsideNavbar on non-mobile devices */}
          {!isMobile && (
            <InsideNavbar 
              onToggle={handleSidebarToggle}
              sidebarCollapsed={sidebarCollapsed}
            />
          )}
          {children}
        </Box>
        
        {/* Chat button */}
        <ChatButton />
        
        {/* CTA Section with dynamic padding */}
        <Box sx={{ 
          pl: { 
            xs: sidebarCollapsed ? 0 : '60px',
            sm: sidebarCollapsed ? '80px' : '250px'
          },
          transition: 'padding-left 0.3s ease',
        }}>
          <InsideFooter />
        </Box>
      </Box>
    </ProSidebarProvider>
  );
};

export default InsideLayout;
