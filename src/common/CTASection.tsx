import React, { ReactNode } from 'react';
import { Box, Typography, Button, Container, useTheme, Grid, Link, Divider, IconButton, Stack } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Logo from './Logo';
import BrushIcon from '@mui/icons-material/Brush';
import { keyframes } from '@mui/system';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
}

// Add these animations before the component definition
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Transform Your Home's Exterior?",
  subtitle = "Contact us today for a free consultation and estimate",
  buttonText = "Get a Free Quote",
  onButtonClick,
  children
}) => {
  const { mode } = useThemeContext();
  const isDark = mode === 'dark';
  const theme = useTheme();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate('/login');
    }
  };

  const footerNavigation = {
    residential: {
      title: 'Residential Services',
      items: [
        { name: 'Exterior Painting', href: '/residential/exterior' },
        { name: 'Interior Painting', href: '/residential/interior' },
        { name: 'Services', href: '/services' },
      ],
    },
    commercial: {
      title: 'Commercial Services',
      items: [
        { name: 'Services', href: '/services' },
        { name: 'National Account', href: '/commercial/national-account' },
        { name: 'Case Studies', href: '/commercial/case-studies' },
      ],
    },
    company: {
      title: 'Company',
      items: [
        { name: 'About Us', href: '/about' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Careers', href: '/careers' },
        { name: 'Find a Location', href: '/locations' },
        { name: 'Blog', href: '/about/blog' },
      ],
    },
    franchise: {
      title: 'Franchise Opportunities',
      items: [
        { name: 'Our Story', href: '/franchise/our-story' },
        { name: 'Why Franchise', href: '/franchise/why-franchise' },
        { name: 'Investment', href: '/franchise/investment' },
        { name: 'Available Markets', href: '/franchise/markets' },
      ],
    },
  };

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Accessibility Statement', href: '/accessibility' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Social Media Terms of Use', href: '/social-terms' },
    { name: 'Your Privacy Choices', href: '/privacy-choices' },
    { name: 'Site Map', href: '/sitemap' },
  ];

  return (
    <>
      {/* Call to Action Section */}
      <Box 
        className="cta-section" 
        sx={{ 
          background: isDark 
            ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 60%, ${theme.palette.primary.main} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 60%, ${theme.palette.primary.dark} 100%)`,
          color: '#fff',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 20%)',
            zIndex: 1,
          }
        }}
      >
        <Container 
          sx={{ 
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box sx={{ 
            animation: `${fadeIn} 0.8s ease-out forwards`,
            mb: 2,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <BrushIcon sx={{ 
              fontSize: 45, 
              mb: 2,
              color: theme.palette.secondary.light, 
              transform: 'rotate(-15deg)' 
            }} />
          </Box>
          
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 3,
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              animation: `${fadeIn} 0.8s ease-out forwards`,
              px: { xs: 2, md: 6 },
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              letterSpacing: '-0.5px',
              lineHeight: 1.2
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 5,
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.9,
              fontWeight: 400,
              animation: `${fadeIn} 0.8s ease-out 0.2s forwards`,
              px: { xs: 2, md: 4 }
            }}
          >
            {subtitle}
          </Typography>
          
          <Button 
            variant={isDark ? "outlined" : "contained"}
            size="large"
            onClick={handleButtonClick}
            startIcon={<BrushIcon />}
            sx={{ 
              borderColor: isDark ? '#fff' : undefined,
              color: isDark ? '#fff' : theme.palette.primary.contrastText,
              bgcolor: isDark ? 'transparent' : theme.palette.secondary.main,
              borderRadius: '30px',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              animation: `${fadeIn} 0.8s ease-out 0.4s forwards, ${pulse} 2s infinite 2s`,
              opacity: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: isDark ? 'rgba(255,255,255,0.15)' : theme.palette.secondary.dark,
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              }
            }}
          >
            {buttonText}
          </Button>
        </Container>
      </Box>

      {/* Optional content between CTA and Footer */}
      {children}

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          bgcolor: isDark ? 'background.paper' : theme.palette.grey[100],
          color: theme.palette.text.primary,
          mt: 0,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={4} justifyContent="space-between">
            {/* Logo and Social Links */}
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 3 }}>
                <Logo size="medium" />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Professional painting services for residential and commercial properties.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                <IconButton
                  aria-label="Facebook"
                  sx={{ 
                    color: theme.palette.primary.main,
                    '&:hover': { color: '#4267B2' }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  aria-label="Twitter"
                  sx={{ 
                    color: theme.palette.primary.main,
                    '&:hover': { color: '#1DA1F2' }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  aria-label="Instagram"
                  sx={{ 
                    color: theme.palette.primary.main,
                    '&:hover': { color: '#E1306C' }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  aria-label="LinkedIn"
                  sx={{ 
                    color: theme.palette.primary.main,
                    '&:hover': { color: '#0077B5' }
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  aria-label="YouTube"
                  sx={{ 
                    color: theme.palette.primary.main,
                    '&:hover': { color: '#FF0000' }
                  }}
                >
                  <YouTubeIcon />
                </IconButton>
              </Stack>
            </Grid>

            {/* Navigation Links */}
            {Object.values(footerNavigation).map((section) => (
              <Grid item xs={6} sm={3} md={2} key={section.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {section.title}
                </Typography>
                <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                  {section.items.map((item) => (
                    <Box component="li" key={item.name} sx={{ pt: 0.5, pb: 0.5 }}>
                      <Link
                        component={RouterLink}
                        to={item.href}
                        sx={{
                          color: 'text.secondary',
                          textDecoration: 'none',
                          '&:hover': {
                            color: theme.palette.primary.main,
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {item.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Legal Links */}
          <Grid container>
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  justifyContent: { xs: 'center', md: 'space-between' },
                  alignItems: 'center'
                }}
              >
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ pb: { xs: 2, md: 0 } }}
                >
                  © {new Date().getFullYear()} Strongest Algorithm. All rights reserved.
                </Typography>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  {legalLinks.map((item) => (
                    <Link
                      key={item.name}
                      component={RouterLink}
                      to={item.href}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CTASection;
