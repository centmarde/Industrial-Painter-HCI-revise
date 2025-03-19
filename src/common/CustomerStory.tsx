import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  useTheme,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  Rating
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FactoryIcon from '@mui/icons-material/Factory';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import { 
  fetchCustomerStories, 
  generateFallbackStories,
  CustomerStoryData 
} from '../utils/customerStoryUtils';

// Separate component for fetching and providing customer stories data
class CustomerStoriesData extends React.Component<
  { count?: number, children: (data: { stories: CustomerStoryData[], loading: boolean }) => React.ReactNode },
  { stories: CustomerStoryData[], loading: boolean }
> {
  constructor(props: { count?: number, children: (data: { stories: CustomerStoryData[], loading: boolean }) => React.ReactNode }) {
    super(props);
    this.state = {
      stories: [],
      loading: true
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps: { count?: number }) {
    if (prevProps.count !== this.props.count) {
      this.fetchUsers();
    }
  }

  fetchUsers = async () => {
    const count = this.props.count || 4;
    this.setState({ loading: true });
    
    try {
      const customerStories = await fetchCustomerStories(count);
      this.setState({ 
        stories: customerStories.length > 0 ? customerStories : generateFallbackStories(count), 
        loading: false 
      });
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      this.setState({ 
        stories: generateFallbackStories(count), 
        loading: false 
      });
    }
  };

  render() {
    return this.props.children({
      stories: this.state.stories,
      loading: this.state.loading
    });
  }
}

// Display component for customer stories
const CustomerStoryDisplay: React.FC<{ stories: CustomerStoryData[], loading: boolean }> = ({ stories, loading }) => {
  const theme = useTheme();
  const [expandedStories, setExpandedStories] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedStories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(251, 133, 0, 0.08)'
          : 'rgba(251, 133, 0, 0.04)',
        mt: 8,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            component="span" 
            variant="overline"
            sx={{ 
              color: theme.palette.secondary.main,
              fontWeight: 600,
              letterSpacing: 2,
              display: 'block'
            }}
          >
            REAL RESULTS FOR REAL BUSINESSES
          </Typography>
          
          <Typography 
            variant="h2" 
            sx={{ 
              color: theme.palette.primary.main,
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                bottom: -12,
                left: '20%',
                backgroundColor: theme.palette.secondary.main
              }
            }}
          >
            Customer Success Stories
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mt: 4, 
              color: theme.palette.text.secondary,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            See how Industrial Painter has transformed workspaces and boosted productivity
            for companies across various industries.
          </Typography>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {stories.map((story, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={4}
                  onClick={() => toggleExpand(index)}
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    borderTop: `4px solid ${
                      index % 4 === 0 ? theme.palette.primary.main :
                      index % 4 === 1 ? theme.palette.secondary.main :
                      index % 4 === 2 ? theme.palette.success.main :
                      theme.palette.info.main
                    }`,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 20px -10px ${
                        theme.palette.mode === 'dark' 
                          ? 'rgba(0, 0, 0, 0.3)' 
                          : 'rgba(0, 0, 0, 0.2)'
                      }`,
                      '& .story-overlay': {
                        opacity: 0.7
                      }
                    }
                  }}
                >
                  {/* Background pattern */}
                  <Box 
                    className="story-overlay"
                   
                  />
                  
                  {/* Project type chip */}
                  <Chip 
                    icon={
                      story.projectType.includes('Coating') ? <EngineeringIcon /> :
                      story.projectType.includes('Facility') ? <FactoryIcon /> :
                      <ThumbUpIcon />
                    }
                    label={story.projectType}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontWeight: 600,
                      zIndex: 1,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      backgroundColor: index % 4 === 0 ? theme.palette.primary.main :
                        index % 4 === 1 ? theme.palette.secondary.main :
                        index % 4 === 2 ? theme.palette.success.main :
                        theme.palette.info.main,
                      color: '#fff'
                    }}
                  />
                  
                  <CardContent sx={{ p: 3, zIndex: 1, position: 'relative' }}>
                    <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                      <Avatar
                        src={story.image}
                        alt={story.name}
                        sx={{ 
                          width: 70, 
                          height: 70,
                          border: `3px solid ${theme.palette.background.default}`,
                          boxShadow: `0 3px 6px ${
                            theme.palette.mode === 'dark' 
                              ? 'rgba(0, 0, 0, 0.3)' 
                              : 'rgba(0, 0, 0, 0.1)'
                          }`
                        }}
                      />
                      <Box sx={{ ml: 2, mt:5 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            lineHeight: 1.2,
                            color: theme.palette.text.primary
                          }}
                        >
                          {story.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500
                          }}
                        >
                          {story.position}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{
                            color: theme.palette.text.secondary,
                            display: 'block',
                            mt: 0.5
                          }}
                        >
                          {story.company}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider 
                      sx={{ 
                        my: 2,
                        opacity: 0.7,
                        borderColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        mb: 2,
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.03)' 
                          : 'rgba(251, 133, 0, 0.02)',
                        p: 2,
                        borderRadius: 1,
                        boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)'
                      }}
                    >
                      <FormatQuoteIcon 
                        sx={{ 
                          fontSize: 40, 
                          color: theme.palette.mode === 'dark' 
                            ? 'rgba(255,255,255,0.1)' 
                            : 'rgba(251, 133, 0, 0.2)',
                          position: 'absolute',
                          top: -10,
                          left: -8,
                          transform: 'scaleX(-1)'
                        }} 
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontStyle: 'italic',
                          pl: 3,
                          color: theme.palette.text.primary,
                          mb: 1,
                          lineHeight: 1.5,
                          fontWeight: theme.palette.mode === 'dark' ? 300 : 400,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        "{expandedStories[index] ? story.testimonial : 
                          story.testimonial.length > 120 ? 
                          `${story.testimonial.substring(0, 120)}...` : 
                          story.testimonial}"
                      </Typography>
                      {story.testimonial.length > 120 && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: 'block',
                            textAlign: 'right',
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                            mt: 1
                          }}
                        >
                          {expandedStories[index] ? "Show less" : "Read more"}
                        </Typography>
                      )}
                    </Box>
                    
                    <Typography 
                      variant="h6"
                      sx={{
                        borderLeft: `3px solid ${
                          index % 4 === 0 ? theme.palette.primary.main :
                          index % 4 === 1 ? theme.palette.secondary.main :
                          index % 4 === 2 ? theme.palette.success.main :
                          theme.palette.info.main
                        }`,
                        pl: 2,
                        my: 2,
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: theme.palette.mode === 'dark' 
                          ? theme.palette.primary.light 
                          : theme.palette.primary.dark
                      }}
                    >
                      {story.transformationTitle}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        lineHeight: 1.6
                      }} 
                      paragraph
                    >
                      {story.transformationText1.substring(0, 80)}...
                    </Typography>
                    
                    <Box 
                      sx={{ 
                        mt: 3, 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 2,
                        borderTop: `1px dashed ${
                          theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(0, 0, 0, 0.1)'
                        }`
                      }}
                    >
                      <Box>
                        <Typography 
                          variant="caption" 
                          sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                            display: 'block'
                          }}
                        >
                          Project Date
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}
                        >
                          {story.projectDate}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography 
                          variant="caption" 
                          sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                            display: 'block',
                            textAlign: 'center'
                          }}
                        >
                          Satisfaction
                        </Typography>
                        <Rating
                          value={story.satisfaction / 2} // Convert 10-scale to 5-scale
                          readOnly
                          precision={0.5}
                          icon={<StarIcon fontSize="small" sx={{ color: theme.palette.secondary.main }} />}
                          emptyIcon={<StarIcon fontSize="small" sx={{ opacity: 0.3 }} />}
                        />
                      </Box>
                      
                      <Box sx={{ 
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(251, 133, 0, 0.15)'
                          : 'rgba(251, 133, 0, 0.08)',
                        p: 1,
                        borderRadius: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}>
                        <Typography 
                          variant="caption" 
                          sx={{
                            fontWeight: 'bold',
                            color: theme.palette.primary.main
                          }}
                        >
                          {story.location.split(',')[0]}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

// Main component that composes the data provider and display components
const CustomerStory: React.FC = () => {
  return (
    <CustomerStoriesData count={4}>
      {({ stories, loading }) => (
        <CustomerStoryDisplay stories={stories} loading={loading} />
      )}
    </CustomerStoriesData>
  );
};

export default CustomerStory;
