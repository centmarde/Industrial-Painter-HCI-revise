import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Divider,
  useTheme
} from '@mui/material';
import OutsideLayout from '../../layout/OutsideLayout';

const Diversity: React.FC = () => {
  const currentTheme = useTheme();

  return (
    <OutsideLayout>
      <Container maxWidth="lg" sx={{ pt: 6, pb: 10 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Diversity & Inclusion
          </Typography>
          <Divider sx={{ 
            width: '80px', 
            mx: 'auto', 
            borderBottomWidth: 4, 
            borderColor: currentTheme.palette.primary.main,
            mb: 4
          }} />
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Building a painting company that celebrates differences and creates opportunities for everyone
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ 
          p: 4, 
          mb: 6, 
          background: `linear-gradient(45deg, ${currentTheme.palette.background.paper}, ${currentTheme.custom.lighter})`,
          borderRadius: 3
        }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom color="primary">
                Our Commitment
              </Typography>
              <Typography paragraph>
                At Industrial Painter, we believe diversity drives innovation and inclusion fosters belonging. 
                We're committed to creating a workplace that welcomes people of all backgrounds, identities, and perspectives.
              </Typography>
              <Typography paragraph>
                We recognize that our differences make us stronger, more creative, and better positioned to serve our diverse customer base.
                Our commitment to diversity and inclusion isn't just a statement—it's embedded in our core values and daily operations.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                bgcolor: 'background.default', 
                p: 3, 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography variant="h6" component="h3" gutterBottom color="secondary.main">
                  Our Diversity & Inclusion Principles
                </Typography>
                <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
                  <li>Fostering a culture of belonging where everyone feels valued</li>
                  <li>Recruiting and developing diverse talent at all levels</li>
                  <li>Ensuring equitable opportunities for growth and advancement</li>
                  <li>Creating inclusive teams that drive innovation</li>
                  <li>Partnering with diverse suppliers and community organizations</li>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderTop: `4px solid ${currentTheme.palette.primary.main}` }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Inclusive Hiring
              </Typography>
              <Typography>
                We actively work to eliminate bias in our recruitment process and seek out talent from diverse backgrounds.
                Our training programs provide opportunities for people with various skill levels to build careers in the painting industry.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderTop: `4px solid ${currentTheme.palette.secondary.main}` }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Equal Opportunity
              </Typography>
              <Typography>
                We provide equal employment opportunities regardless of race, color, religion, gender, gender identity, 
                national origin, sexual orientation, age, disability, or veteran status. Our promotion practices 
                are designed to recognize talent and potential.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderTop: `4px solid ${currentTheme.custom.darkest}` }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Community Engagement
              </Typography>
              <Typography>
                We engage with diverse communities through outreach programs, partnerships with local organizations, and 
                by supporting initiatives that promote equality and inclusion in the communities we serve.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ borderLeft: `4px solid ${currentTheme.palette.primary.main}`, pl: 2 }}>
            Our Progress and Goals
          </Typography>
          <Typography paragraph>
            We continuously measure our progress on diversity and inclusion metrics and set ambitious goals for improvement.
            Our leadership team is accountable for creating and maintaining an inclusive culture across all our locations.
          </Typography>
          <Typography paragraph>
            We believe that building a diverse workforce isn't just the right thing to do—it's also good business.
            Research consistently shows that diverse teams outperform homogeneous ones, and inclusive companies 
            attract better talent and enjoy higher employee retention rates.
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            bgcolor: currentTheme.palette.mode === 'light' ? 'rgba(251, 133, 0, 0.05)' : 'rgba(251, 133, 0, 0.1)', 
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" gutterBottom color="primary.main">
            Join Our Diverse Team
          </Typography>
          <Typography paragraph>
            We're always looking for talented individuals who bring unique perspectives and experiences.
            If you're interested in joining a company that values diversity and inclusion, check out our current openings.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography 
              component="a" 
              href="/careers/positions" 
              sx={{ 
                color: currentTheme.palette.primary.main,
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              View Career Opportunities →
            </Typography>
          </Box>
        </Paper>
      </Container>
    </OutsideLayout>
  );
};

export default Diversity;
