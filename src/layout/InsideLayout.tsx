import { Box, useTheme, useMediaQuery } from '@mui/material';
import InnerNavbar from '../components/InnerNavbar';
import ChatButton from '../components/ChatButton';
import InsideFooter from '../common/InsideFooter';
import { useNavigate } from 'react-router-dom';

interface OutsideLayoutProps {
  children: React.ReactNode;
}

const OutsideLayout: React.FC<OutsideLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <InnerNavbar />
      
      
      {/* Main content area with responsive padding */}
      <Box component="main" sx={{ 
        flexGrow: 1,
        width: '100%',
        px: 0, // Remove padding
      }}>
        {children}
      </Box>
      
      {/* Chat button */}
      <ChatButton />
       {/* CTA Section */}
       <InsideFooter  />
    </Box>
  );
};

export default OutsideLayout;
