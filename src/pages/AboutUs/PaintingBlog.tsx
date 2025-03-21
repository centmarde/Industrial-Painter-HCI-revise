import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tab, 
  Tabs, 
  Paper, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Divider,
  useTheme
} from '@mui/material';
import OutsideLayout from '../../layout/OutsideLayout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`painting-tabpanel-${index}`}
      aria-labelledby={`painting-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `painting-tab-${index}`,
    'aria-controls': `painting-tabpanel-${index}`,
  };
}

interface BlogCategory {
  title: string;
  description: string;
  articles: BlogArticle[];
}

interface BlogArticle {
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

const PaintingBlog: React.FC = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const categories: BlogCategory[] = [
    {
      title: "Exterior House Painting",
      description: "Tips, techniques, and inspiration for exterior painting projects to enhance your home's curb appeal.",
      articles: [
        {
          title: "Preparing Your Home's Exterior for Painting",
          excerpt: "Learn the essential steps to prepare your home's exterior for a fresh coat of paint that will last for years.",
          image: "https://source.unsplash.com/random/300x200/?house-painting",
          date: "June 15, 2023"
        },
        {
          title: "Best Weather Conditions for Exterior Painting",
          excerpt: "Discover the ideal weather conditions for exterior painting projects to achieve the best results.",
          image: "https://source.unsplash.com/random/300x200/?weather-painting",
          date: "July 3, 2023"
        }
      ]
    },
    {
      title: "Interior House Painting",
      description: "Transform your indoor spaces with professional interior painting advice and color inspiration.",
      articles: [
        {
          title: "Room-by-Room Interior Painting Guide",
          excerpt: "A comprehensive guide to painting different rooms in your home with the right colors and techniques.",
          image: "https://source.unsplash.com/random/300x200/?interior-painting",
          date: "May 22, 2023"
        },
        {
          title: "Creating Accent Walls That Pop",
          excerpt: "How to create stunning accent walls that become the focal point of any room.",
          image: "https://source.unsplash.com/random/300x200/?accent-wall",
          date: "August 10, 2023"
        }
      ]
    },
    {
      title: "Commercial Painting",
      description: "Professional insights on commercial painting projects from office spaces to retail environments.",
      articles: [
        {
          title: "Industrial Painting Safety Standards",
          excerpt: "Understanding the safety protocols and standards required for industrial painting projects.",
          image: "https://source.unsplash.com/random/300x200/?industrial-painting",
          date: "April 5, 2023"
        },
        {
          title: "Scheduling Commercial Painting to Minimize Disruption",
          excerpt: "Strategies for completing commercial painting projects with minimal impact on business operations.",
          image: "https://source.unsplash.com/random/300x200/?commercial-building",
          date: "September 18, 2023"
        }
      ]
    },
    {
      title: "Color Trends",
      description: "Stay updated with the latest color trends, palettes, and forecasts in the painting industry.",
      articles: [
        {
          title: "2023 Color of the Year Selections",
          excerpt: "Exploring the colors of the year chosen by major paint manufacturers and their influence on design.",
          image: "https://source.unsplash.com/random/300x200/?color-palette",
          date: "January 12, 2023"
        },
        {
          title: "Emerging Color Trends for 2024",
          excerpt: "A sneak peek at the color trends expected to dominate interior and exterior design next year.",
          image: "https://source.unsplash.com/random/300x200/?color-trends",
          date: "October 30, 2023"
        }
      ]
    },
    {
      title: "General Articles",
      description: "General painting tips, DIY projects, and industry insights to help with all your painting needs.",
      articles: [
        {
          title: "Eco-Friendly Paint Options",
          excerpt: "A guide to environmentally friendly paint choices that reduce VOCs and environmental impact.",
          image: "https://source.unsplash.com/random/300x200/?eco-paint",
          date: "March 7, 2023"
        },
        {
          title: "Essential Painting Tools Every Homeowner Should Have",
          excerpt: "A comprehensive list of painting tools that make DIY projects easier and more professional.",
          image: "https://source.unsplash.com/random/300x200/?painting-tools",
          date: "November 14, 2023"
        }
      ]
    }
  ];

  return (
    <OutsideLayout>
      <Box sx={{ 
        bgcolor: 'background.default', 
        py: 6, 
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: `linear-gradient(180deg, ${theme.palette.primary.main}1A 0%, ${theme.palette.primary.main}00 100%)`,
          zIndex: 0
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            align="center"
            sx={{ 
              color: 'primary.main',
              mb: 2,
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              left: '50%',
              transform: 'translateX(-50%)',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '25%',
                width: '50%',
                height: '4px',
                bgcolor: 'secondary.main',
                borderRadius: '2px'
              }
            }}
          >
            Painting Blog
          </Typography>
          
          <Typography 
            variant="h5" 
            component="p" 
            align="center"
            sx={{ 
              mb: 5,
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              animation: 'fadeIn 0.8s ease-in-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Explore our articles to learn about the latest techniques, trends, and tips in the painting industry.
          </Typography>

          <Paper 
            elevation={3}
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              mb: 4,
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
              }
            }}
          >
            <Box sx={{ 
              bgcolor: 'background.paper', 
              display: 'flex', 
              justifyContent: 'center',
              width: '100%'
            }}>
              <Tabs 
                value={value} 
                onChange={handleChange} 
                aria-label="painting categories"
                variant="scrollable"
                scrollButtons="auto"
                centered
                sx={{ 
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    py: 2,
                    px: 3,
                    transition: 'all 0.3s ease',
                    mx: 0.5,
                    borderRadius: '4px 4px 0 0',
                    textAlign: 'center',
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    backgroundColor: 'primary.main',
                  },
                  '& .MuiTabs-flexContainer': {
                    justifyContent: 'center',
                  },
                  width: {
                    xs: '100%',
                    md: 'auto'
                  },
                  mx: 'auto'
                }}
              >
                {categories.map((category, index) => (
                  <Tab 
                    key={index} 
                    label={category.title} 
                    {...a11yProps(index)} 
                    sx={{ 
                      fontWeight: 500,
                      color: 'text.primary',
                      '&.Mui-selected': {
                        color: 'primary.main',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(251,133,0,0.05)'
                      },
                      '&:hover': {
                        color: 'primary.light',
                        backgroundColor: 'rgba(251,133,0,0.03)'
                      }
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            {categories.map((category, index) => (
              <TabPanel key={index} value={value} index={index}>
                <Box sx={{ 
                  mb: 4,
                  animation: 'fadeIn 0.5s ease-in-out',
                }}>
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      color: 'primary.main',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -5,
                        left: 0,
                        width: '40px',
                        height: '3px',
                        bgcolor: 'secondary.main',
                        borderRadius: '3px'
                      }
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ color: 'text.secondary', mb: 3 }}
                  >
                    {category.description}
                  </Typography>
                  <Divider sx={{ mb: 4 }} />
                </Box>
                
                <Grid container spacing={3}>
                  {category.articles.map((article, articleIndex) => (
                    <Grid item xs={12} md={6} key={articleIndex} sx={{
                      transform: 'translateY(20px)',
                      opacity: 0,
                      animation: `fadeSlideUp 0.5s ease-out ${0.1 + articleIndex * 0.1}s forwards`,
                      '@keyframes fadeSlideUp': {
                        to: { opacity: 1, transform: 'translateY(0)' }
                      }
                    }}>
                      <Card 
                        sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column',
                          transition: 'all 0.3s ease',
                          overflow: 'hidden',
                          position: 'relative',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 12px 20px ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.4)'}`,
                            '& .MuiCardMedia-root': {
                              transform: 'scale(1.05)'
                            },
                            '& .article-title': {
                              color: 'primary.main'
                            }
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '4px',
                            backgroundColor: 'primary.main',
                            transform: 'scaleX(0)',
                            transformOrigin: 'right',
                            transition: 'transform 0.3s ease',
                          },
                          '&:hover::after': {
                            transform: 'scaleX(1)',
                            transformOrigin: 'left',
                          }
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={article.image}
                          alt={article.title}
                          sx={{
                            transition: 'transform 0.5s ease',
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography 
                            variant="caption" 
                            component="p"
                            sx={{ 
                              color: 'primary.main',
                              mb: 1,
                              fontWeight: 'medium',
                              display: 'inline-block',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: `${theme.palette.primary.main}1A`
                            }}
                          >
                            {article.date}
                          </Typography>
                          <Typography 
                            gutterBottom 
                            variant="h5" 
                            component="h3"
                            className="article-title"
                            sx={{ 
                              color: 'secondary.main', 
                              fontWeight: 'medium',
                              transition: 'color 0.3s ease'
                            }}
                          >
                            {article.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {article.excerpt}
                          </Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            mt: 'auto',
                          }}>
                            <Typography 
                              variant="button" 
                              sx={{ 
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  color: 'primary.dark',
                                  transform: 'translateX(4px)'
                                },
                                '&::after': {
                                  content: '"→"',
                                  ml: 1,
                                  transition: 'transform 0.2s ease'
                                },
                                '&:hover::after': {
                                  transform: 'translateX(2px)'
                                }
                              }}
                            >
                              Read More
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                    Want to see more articles about {category.title.toLowerCase()}?
                  </Typography>
                  <Box 
                    component="button"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
                      border: 'none',
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 'medium',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      }
                    }}
                  >
                    View All Articles
                  </Box>
                </Box>
              </TabPanel>
            ))}
          </Paper>
        </Container>
      </Box>
    </OutsideLayout>
  );
};

export default PaintingBlog;
