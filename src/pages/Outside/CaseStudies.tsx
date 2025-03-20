import React from 'react';
import { 
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Button,
  ThemeProvider
} from '@mui/material';
import theme from '../../theme/theme';
import OutsideLayout from '../../layout/OutsideLayout';

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Hotel Exterior Painting Project",
    description: "Complete exterior refresh for a 12-story luxury hotel, including weather-resistant coating application and custom color matching to maintain brand integrity.",
    image: "https://source.unsplash.com/random/300x200/?hotel,painting",
    category: "Commercial"
  },
  {
    id: 2,
    title: "Neutrality Office Exterior Project",
    description: "Modern exterior painting solution for a tech company headquarters, featuring eco-friendly materials and precise color application.",
    image: "https://source.unsplash.com/random/300x200/?office,building",
    category: "Commercial"
  },
  {
    id: 3,
    title: "Commercial Painting Project for Office Interior",
    description: "Complete interior painting renovation for a 50,000 sq ft office space, including custom color schemes for different departments and specialized coatings for high-traffic areas.",
    image: "https://source.unsplash.com/random/300x200/?office,interior",
    category: "Commercial"
  },
  {
    id: 4,
    title: "Shell Car Wash Conversion Project",
    description: "Transformation of an existing car wash facility with brand-compliant colors and specialized water-resistant coatings to withstand daily operations.",
    image: "https://source.unsplash.com/random/300x200/?carwash",
    category: "Commercial"
  },
  {
    id: 5,
    title: "Industrial Painting Project for Local Government",
    description: "Large-scale painting project for municipal buildings including specialized coatings for weather protection and graffiti resistance.",
    image: "https://source.unsplash.com/random/300x200/?government,building",
    category: "Industrial"
  },
  {
    id: 6,
    title: "Military Line Striping in Warehouses",
    description: "Precision line striping in military warehouses for safety compliance and optimal traffic management, using heavy-duty epoxy-based paints.",
    image: "https://source.unsplash.com/random/300x200/?warehouse,military",
    category: "Industrial"
  },
  {
    id: 7,
    title: "Manufacturing Facility Floor Coating",
    description: "Specialized epoxy floor coating for a 100,000 sq ft manufacturing facility, designed to withstand heavy machinery and chemical exposure.",
    image: "https://source.unsplash.com/random/300x200/?factory,floor",
    category: "Industrial"
  },
  {
    id: 8,
    title: "Healthcare Facility Anti-Microbial Painting",
    description: "Implementation of anti-microbial paint solutions throughout a medical center, ensuring compliance with healthcare safety standards.",
    image: "https://source.unsplash.com/random/300x200/?hospital,hallway",
    category: "Commercial"
  },
  {
    id: 9,
    title: "School District Summer Renovation",
    description: "Comprehensive painting project across multiple school buildings, completed during summer break to minimize disruption to educational activities.",
    image: "https://source.unsplash.com/random/300x200/?school,hallway",
    category: "Commercial"
  }
 
];

const CaseStudies: React.FC = () => {
  const theme = useTheme();
  
  return (
    <OutsideLayout>
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          py: 8, 
          backgroundColor: theme.palette.background.default 
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6, 
              color: theme.palette.primary.main,
              fontWeight: 'bold' 
            }}
          >
            Case Studies
          </Typography>
          
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 6, 
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ 
                color: theme.palette.text.primary,
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                pb: 1,
                mb: 3
              }}
            >
              Commercial & Industrial Painting Excellence
            </Typography>
            <Typography variant="body1" paragraph>
              At Industrial Painter, we've completed numerous successful projects across various sectors. 
              Our case studies showcase our commitment to quality, efficiency, and customer satisfaction. 
              Each project represents our ability to deliver exceptional results, on time and within budget, 
              regardless of scale or complexity.
            </Typography>
          </Paper>
          
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 4, 
              color: theme.palette.text.primary,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              pl: 2
            }}
          >
            Commercial Painting Case Studies
          </Typography>
          
          <Grid container spacing={4}>
            {caseStudies.filter(study => study.category === "Commercial").map((study) => (
              <Grid item xs={12} sm={6} md={4} key={study.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={study.image}
                    alt={study.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" sx={{ color: theme.palette.primary.main }}>
                      {study.title}
                    </Typography>
                    <Typography>
                      {study.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                      sx={{ 
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          color: '#fff'
                        }
                      }}
                    >
                      Read More
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Typography 
            variant="h4" 
            sx={{ 
              mt: 8, 
              mb: 4, 
              color: theme.palette.text.primary,
              borderLeft: `4px solid ${theme.palette.secondary.main}`,
              pl: 2
            }}
          >
            Industrial Painting Case Studies
          </Typography>
          
          <Grid container spacing={4}>
            {caseStudies.filter(study => study.category === "Industrial").map((study) => (
              <Grid item xs={12} sm={6} md={4} key={study.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={study.image}
                    alt={study.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" sx={{ color: theme.palette.secondary.main }}>
                      {study.title}
                    </Typography>
                    <Typography>
                      {study.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      size="small"
                      sx={{ 
                        borderColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.main,
                          color: '#fff'
                        }
                      }}
                    >
                      Read More
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
       
        </Container>
      </Box>
    </ThemeProvider>
    </OutsideLayout>
  );
};

export default CaseStudies;
