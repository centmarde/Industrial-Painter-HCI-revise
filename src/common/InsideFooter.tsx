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
  title,
  subtitle,
  buttonText,
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
