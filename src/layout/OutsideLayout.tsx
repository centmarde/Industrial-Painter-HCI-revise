import { Box, useTheme, useMediaQuery } from '@mui/material';
import OutsideNavbar from '../components/OutsideNavbar';
import ChatButton from '../components/ChatButton';
import CTASection from '../common/CTASection';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/UserStore';

interface OutsideLayoutProps {
  children: React.ReactNode;
}

const OutsideLayout: React.FC<OutsideLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useUserStore(state => state.user);
  
  const handleDashboardClick = () => {
    navigate('/home');
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <OutsideNavbar 
        isAuthenticated={!!user} 
        onDashboardClick={handleDashboardClick} 
      />
      
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
       <CTASection 
        title="Ready to Transform Your Space?"
        subtitle="Contact us today for a free consultation and personalized quote"
        buttonText="Get a Free Quote"
        onButtonClick={() => navigate(user ? '/home' : '/login')}
      />
    </Box>
  );
};

export default OutsideLayout;
