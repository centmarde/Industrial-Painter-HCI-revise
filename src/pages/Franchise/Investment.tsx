import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import OutsideLayout from '../../layout/OutsideLayout';

interface InvestmentRow {
  category: string;
  low: number;
  high: number;
}

const InvestmentPage: React.FC = () => {
  const theme = useTheme();

  const investmentData: InvestmentRow[] = [
    { category: 'Initial Franchise Fee', low: 60000, high: 60000 },
    { category: 'Contractor License', low: 500, high: 2500 },
    { category: 'Commercial Services Fee', low: 6000, high: 10000 },
    { category: 'Computer System and Proprietary Software', low: 3000, high: 8000 },
    { category: 'Advertising & Marketing', low: 12000, high: 30000 },
    { category: 'Travel and Living Expenses While Training', low: 4000, high: 8000 },
    { category: 'Miscellaneous Opening Costs', low: 1500, high: 5000 },
    { category: 'Insurance', low: 8000, high: 20000 },
    { category: 'Equipment', low: 5000, high: 15000 },
    { category: 'Real Estate', low: 8000, high: 24000 },
    { category: 'Office Equipment', low: 3000, high: 10000 },
    { category: 'Additional Funds', low: 30000, high: 60000 },
    { category: 'Vehicle', low: 30000, high: 50000 },
  ];

  // Calculate total
  const totalLow = investmentData.reduce((sum, item) => sum + item.low, 0);
  const totalHigh = investmentData.reduce((sum, item) => sum + item.high, 0);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography 
      variant="h4" 
      component="h2" 
      sx={{ 
        mb: 3, 
        mt: 6, 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: -8,
          left: 0,
          width: 60,
          height: 4,
          backgroundColor: theme.palette.primary.main,
        }
      }}
    >
      {children}
    </Typography>
  );

  return (
    <OutsideLayout>
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          mb: 6, 
          color: theme.palette.primary.main,
          fontWeight: 'bold'
        }}
      >
        Franchise Investment
      </Typography>

      {/* Initial Investment Section */}
      <SectionTitle>Initial Investment</SectionTitle>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Typography variant="body1" paragraph>
          We know you want to start a business, but going it alone means minimal support and help for success. Joining a franchise means starting a business with established brand recognition and a proven path to success. You have many options when it comes to starting a franchise business. Each franchise opportunity has different investment requirements, including startup fees. CertaPro Painters® makes owning a franchise affordable for just about anyone.
        </Typography>
        <Typography variant="body1" paragraph>
          We know you want to be successful, and we want our success to be yours to make your dream of business ownership a reality. The total investment to start a CertaPro franchise ranges from $171,000 to $302,500. The cost ranges that make up the total investment are broken down below.
        </Typography>

        <TableContainer 
          component={Paper} 
          sx={{ 
            mt: 4, 
            borderRadius: 2, 
            overflow: 'hidden',
            maxWidth: '100%'
          }}
        >
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Investment Category</TableCell>
                  <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Low</TableCell>
                  <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>High</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {investmentData.map((row) => (
                  <TableRow key={row.category} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                    <TableCell component="th" scope="row">{row.category}</TableCell>
                    <TableCell align="right">{formatCurrency(row.low)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.high)}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: theme.palette.secondary.dark }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Total Investment</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrency(totalLow)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrency(totalHigh)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Paper>

      {/* What do you get Section */}
      <SectionTitle>What Do You Get?</SectionTitle>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Brand Recognition" 
                  secondary="Access to an established brand with national presence" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Proven Business Model" 
                  secondary="A system that has been refined over decades of operation" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Comprehensive Training" 
                  secondary="Initial and ongoing education for you and your team" 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Marketing Support" 
                  secondary="Professional materials and campaigns to help grow your business" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Operations Support" 
                  secondary="Guidance on day-to-day business operations and best practices" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Proprietary Software" 
                  secondary="Custom tools designed to help you manage your painting business efficiently" 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      {/* About the Training Section */}
      <SectionTitle>About the Training</SectionTitle>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Typography variant="body1" paragraph>
          Our comprehensive training program is designed to set you up for success from day one. Training includes both classroom and hands-on experiences covering all aspects of the business:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Business Operations" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Marketing Strategies" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Sales Techniques" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Customer Service Excellence" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Technical Painting Knowledge" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Financial Management" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          After initial training, you'll receive ongoing support from our experienced franchise support team, including regular updates on industry trends and best practices.
        </Typography>
      </Paper>

      {/* Territories Section */}
      <SectionTitle>Territories</SectionTitle>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Typography variant="body1" paragraph>
          Each franchisee receives a territory in which to promote residential painting and decorating services. The size of the territory depends on many factors:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Population density in the area" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Economic conditions and home values" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Geographic considerations" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Competition analysis" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Market potential for painting services" />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          Territories are carefully mapped to provide sufficient business opportunity while ensuring franchisees don't compete with each other for the same customers.
        </Typography>
      </Paper>

      {/* Limitations Section */}
      <SectionTitle>Limitations</SectionTitle>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Typography variant="body1" paragraph>
          While franchising offers many benefits, there are some limitations to be aware of:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Operational Guidelines" 
                  secondary="You must adhere to brand standards and operational procedures" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Territory Restrictions" 
                  secondary="Marketing and services must stay within your designated territory" 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Royalty Payments" 
                  secondary="Ongoing fees based on your business revenue" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Marketing Contributions" 
                  secondary="Required participation in national advertising fund" 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      {/* Franchise Agreement Renewals Section */}
      <SectionTitle>Franchise Agreement Renewals</SectionTitle>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Typography variant="body1" paragraph>
          Our franchise agreements typically run for an initial term of 10 years with options to renew at the end of the term. The renewal process includes:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText 
              primary="Performance Review" 
              secondary="Evaluation of your business performance over the term" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText 
              primary="Compliance Check" 
              secondary="Verification that you've met all contractual obligations" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText 
              primary="Renewal Fee" 
              secondary="A fee that is typically lower than the initial franchise fee" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText 
              primary="Updated Agreement" 
              secondary="You'll sign the then-current franchise agreement, which may differ from your original terms" 
            />
          </ListItem>
        </List>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Most of our franchisees choose to renew their agreements, which demonstrates the value and success of our business model.
        </Typography>
      </Paper>

      {/* Financial Support Section */}
      <SectionTitle>Financial Support</SectionTitle>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}
      >
        <Typography variant="body1" paragraph>
          While we don't directly finance franchisees, we offer valuable support to help you secure the funding you need:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="SBA Loan Assistance" 
                  secondary="Guidance for qualifying for Small Business Administration loans" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Relationships with Lenders" 
                  secondary="Introductions to financial institutions familiar with our franchise model" 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Financial Planning Assistance" 
                  secondary="Help with business plans and financial projections" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Veteran Discounts" 
                  secondary="Special franchise fee discounts for qualified military veterans" 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Typography variant="body1" paragraph sx={{ mt: 2, fontWeight: 'bold' }}>
          Our goal is to help qualified candidates find the right financial solution to begin their franchise journey successfully.
        </Typography>
      </Paper>
    </Container>
    </OutsideLayout>
  );
};

export default InvestmentPage;
