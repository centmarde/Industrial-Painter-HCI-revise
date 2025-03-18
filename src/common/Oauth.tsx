import { Box, IconButton, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const CircleIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 46,
  height: 46,
  borderRadius: '50%',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const OrDivider = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  margin: '16px 0',
});

const Oauth = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <Box sx={{ mt: 3 }}>
      <OrDivider>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
          OR
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </OrDivider>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <SocialIconButton onClick={() => handleSocialLogin('Google')}>
          <CircleIconWrapper>
            <span className="mdi mdi-google" style={{ color: '#DB4437', fontSize: '24px' }}></span>
          </CircleIconWrapper>
        </SocialIconButton>

        <SocialIconButton onClick={() => handleSocialLogin('Facebook')}>
          <CircleIconWrapper>
            <span className="mdi mdi-facebook" style={{ color: '#4267B2', fontSize: '24px' }}></span>
          </CircleIconWrapper>
        </SocialIconButton>

        <SocialIconButton onClick={() => handleSocialLogin('Instagram')}>
          <CircleIconWrapper>
            <span className="mdi mdi-instagram" style={{ color: '#E1306C', fontSize: '24px' }}></span>
          </CircleIconWrapper>
        </SocialIconButton>
      </Box>
    </Box>
  );
};

export default Oauth;
