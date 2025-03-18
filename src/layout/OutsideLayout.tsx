import { Box } from '@mui/material';
import OutsideNavbar from '../components/OutsideNavbar';

interface OutsideLayoutProps {
  children: React.ReactNode;
}

const OutsideLayout: React.FC<OutsideLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <OutsideNavbar />
      
      {/* Main content area */}
      <Box component="main" sx={{ 
        flexGrow: 1,
        width: '100%'
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default OutsideLayout;
