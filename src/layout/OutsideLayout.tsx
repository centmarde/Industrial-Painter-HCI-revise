import { Box, useTheme, useMediaQuery } from '@mui/material';
import OutsideNavbar from '../components/OutsideNavbar';
import ChatButton from '../components/ChatButton';
import AnnouncementBanner from '../common/AnnouncementBanner';

interface OutsideLayoutProps {
  children: React.ReactNode;
}

const OutsideLayout: React.FC<OutsideLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <OutsideNavbar />
      <AnnouncementBanner />
      
      {/* Main content area with responsive padding */}
      <Box component="main" sx={{ 
        flexGrow: 1,
        width: '100%',
        px: isMobile ? 2 : 3,
      }}>
        {children}
      </Box>
      
      {/* Chat button */}
      <ChatButton />
    </Box>
  );
};

export default OutsideLayout;
