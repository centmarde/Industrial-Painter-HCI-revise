import { Box, Typography, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';
import { useState, useEffect, useRef } from 'react';
// Import relevant icons from Material UI
import SavingsIcon from '@mui/icons-material/Savings';
import HomeIcon from '@mui/icons-material/Home';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';

interface AnnouncementBannerProps {
  messages?: string[];
  textColor?: string;
}

// Enhanced animation with slight bounce effect
const slideAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  5% {
    transform: translateX(95%);
    opacity: 1;
  }
  10% {
    transform: translateX(90%);
  }
  95% {
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

// Define message structure with icon association
const defaultMessages = [
  {
    text: "Spring Sales Event | 10% off Home Projects $2500+ | Learn More",
    icon: <SavingsIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
  },
  {
    text: "Summer Special | Free Consultation for Kitchen Remodels | Book Now",
    icon: <HomeIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
  },
  {
    text: "Limited Time Offer | Free Color Matching Service with Any Project | Click for Details",
    icon: <ColorLensIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
  },
  {
    text: "Refer a Friend | Get $200 Credit on Your Next Project | See Terms",
    icon: <PeopleIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
  },
  {
    text: "Professional Painters Since 1995 | Fully Licensed and Insured | Get a Quote",
    icon: <VerifiedIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
  }
];

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  messages = defaultMessages.map(m => m.text),
  textColor
}) => {
  const theme = useTheme();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Add this line
  const messageRef = useRef<HTMLDivElement>(null);
  const animationDuration = 20000; // 5 minutes in milliseconds
  
  useEffect(() => {
    const updateMessage = () => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    };
    
    const resetAnimation = () => {
      setAnimationKey(prev => prev + 1);
    };

    const messageTimer = setInterval(updateMessage, animationDuration);
    const animationTimer = setInterval(resetAnimation, animationDuration);
    
    return () => {
      clearInterval(messageTimer);
      clearInterval(animationTimer);
    };
  }, [messages.length, animationDuration]);
  
  // Get the appropriate icon for the current message
  const getCurrentIcon = () => {
    // If custom messages are provided (without icons), use the corresponding default icon if available
    if (messages !== defaultMessages.map(m => m.text)) {
      const index = currentMessageIndex % defaultMessages.length;
      return defaultMessages[index].icon;
    }
    return defaultMessages[currentMessageIndex].icon;
  };

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
      
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography
          key={animationKey} // Add this line
          ref={messageRef}
          variant="body2"
          sx={{
            color: textColor || theme.palette.warning.main,
            whiteSpace: 'nowrap',
            animation: `${slideAnimation} ${animationDuration/1000}s linear infinite`,
            position: 'absolute',
            fontWeight: 500,
            right: 0,
            width: 'max-content',
            transform: 'translateY(-50%)',
            top: '10%',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              animationPlayState: 'paused',
              cursor: 'pointer',
              textDecoration: 'underline',
            },
            [theme.breakpoints.down('sm')]: {
              animation: `${slideAnimation} ${animationDuration/1000}s linear infinite`,
            },
          }}
        >
          {getCurrentIcon()}
          {messages[currentMessageIndex]}
          {/* Add a separator between repeated announcements */}
          <Box component="span" sx={{ mx: 4, opacity: 0.7 }}></Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default AnnouncementBanner;
