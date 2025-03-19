import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  Rating, 
  useTheme, 
  CircularProgress,
  Divider
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { formatDistance } from 'date-fns';
import OutsideLayout from '../../layout/OutsideLayout';
import CustomerStory from '../../common/CustomerStory';

// Types for our data
interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  login: {
    uuid: string;
  };
}

interface Review {
  id: string;
  user: RandomUser;
  rating: number;
  comment: string;
  date: Date;
}

// Review comments to randomly select from
const reviewComments = [
  "Industrial Painter delivered exceptional quality work, transforming our space completely. The team was professional and efficient from start to finish.",
  "Couldn't be happier with the results! Their attention to detail and precise color matching was impressive.",
  "The crew was prompt, courteous, and cleaned up perfectly after completing the job. Highly recommend their services.",
  "Our factory looks brand new after their industrial coating application. Their expertise in handling large-scale projects is unmatched.",
  "Great value for the quality of work. The paint has held up beautifully even in our high-traffic commercial space.",
  "They completed the project ahead of schedule and within budget. Will definitely use their services again.",
  "The team worked around our business hours to minimize disruption. Professional from quote to completion.",
  "Their knowledge of industrial-grade materials impressed me. The finish is exactly what we needed for our manufacturing facility.",
  "Five stars for their customer service alone! The actual painting exceeded our expectations.",
  "The protective coatings they applied to our equipment have already proven their worth. Excellent investment.",
  "Meticulous preparation made all the difference in the final result. Very satisfied with their thorough approach.",
  "They handled our complex requirements with ease. The project manager kept us informed throughout the process.",
  "The color consultant helped us choose the perfect shade for our brand identity. Truly professional service.",
  "Their specialized coatings for our industrial equipment have already reduced maintenance costs substantially.",
  "From the initial consultation to the final walkthrough, every step was handled with utmost professionalism.",
  "The crew finished our warehouse project in half the time I expected with no compromise on quality.",
  "We've received countless compliments on the new look of our office space. Worth every penny!",
  "Their eco-friendly paint options were exactly what we were looking for our LEED-certified building.",
  "The attention to detail on our intricate trim work was outstanding. True craftsmen at work.",
  "Second time using Industrial Painter and they've exceeded expectations once again!",
  "Their team worked seamlessly with our other contractors to keep our renovation on schedule.",
  "The project manager's communication was excellent - we always knew what to expect each day.",
  "Our metal fabrication facility needed specialized coatings, and they delivered perfectly.",
  "The durability of their paint job has been incredible - still looks fresh after heavy use.",
  "They managed to match our corporate colors perfectly across all our branches for consistent branding."
];

const Reviews: React.FC = () => {
  const theme = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch 10 random users
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        
        if (data.results) {
          // Generate reviews with random ratings and comments
          const generatedReviews = data.results.map((user: RandomUser) => {
            const randomRating = Math.floor(Math.random() * 2) + 4; // Ratings between 4-5
            const randomComment = reviewComments[Math.floor(Math.random() * reviewComments.length)];
            const randomDate = new Date();
            randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 60)); // Random date within last 60 days
            
            return {
              id: user.login.uuid,
              user,
              rating: randomRating,
              comment: randomComment,
              date: randomDate
            };
          });
          
          setReviews(generatedReviews);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching random users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <OutsideLayout>
      <Box 
        sx={{ 
          pt: 8, 
          backgroundColor: theme.palette.background.default 
        }}
      >
        <Container maxWidth="lg">
          <Box 
            component="img"
            src="/images/misc/Reviews.png" // Update with your actual image path
            alt="Customer Reviews"
            sx={{
              width: '100%',
              maxWidth: 300,
              height: 'auto',
              mb: 2,
              mx: 'auto',
              display: 'block',
              objectFit: 'cover'
            }}
          />
          
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              color: theme.palette.primary.main,
              mb: 2,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 60 }} />
            Customer Reviews
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              color: theme.palette.text.secondary,
              mb: 6,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            See what our customers have to say about our industrial painting services
          </Typography>
          
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress 
                color="primary" 
                size={60}
                thickness={4}
                sx={{ 
                  color: theme.palette.primary.main
                }}
              />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {reviews.slice(0, 9).map((review) => (
                <Grid item xs={12} sm={6} md={4} key={review.id}>
                  <Paper 
                    elevation={3}
                    sx={{
                      p: 3,
                      height: 280, // Fixed height
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: theme.shape.borderRadius,
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      overflow: 'hidden',
                      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                      background: theme.palette.mode === 'dark' 
                        ? `linear-gradient(145deg, ${theme.palette.background.paper}, rgba(30, 30, 30, 0.7))` 
                        : `linear-gradient(145deg, #ffffff, #f8f8f8)`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0px 12px 24px rgba(251, 133, 0, ${theme.palette.mode === 'dark' ? '0.2' : '0.1'})`,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar 
                        src={review.user.picture.medium} 
                        alt={`${review.user.name.first} ${review.user.name.last}`}
                        sx={{ 
                          width: 56, 
                          height: 56, 
                          mr: 2,
                          border: `2px solid ${theme.palette.primary.main}`,
                          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                        }}
                      />
                      <Box>
                        <Typography 
                          variant="h6" 
                          component="h3"
                          sx={{ 
                            fontWeight: 600,
                            color: theme.palette.text.primary 
                          }}
                        >
                          {review.user.name.first} {review.user.name.last}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="textSecondary"
                          sx={{ 
                            fontSize: '0.875rem' 
                          }}
                        >
                          {formatDistance(review.date, new Date(), { addSuffix: true })}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Rating 
                      value={review.rating} 
                      readOnly 
                      precision={0.5}
                      sx={{ 
                        mb: 1.5,
                        '& .MuiRating-iconFilled': {
                          color: theme.palette.primary.main,
                        },
                        '& .MuiRating-iconEmpty': {
                          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
                        }
                      }}
                    />
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        flexGrow: 1,
                        lineHeight: 1.6,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,
                        color: theme.palette.text.primary,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '100%',
                          height: '25px',
                          background: theme.palette.mode === 'dark' 
                            ? 'linear-gradient(to bottom, rgba(30, 30, 30, 0), rgba(30, 30, 30, 1))' 
                            : 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
                        }
                      }}
                    >
                      {review.comment}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        
        <CustomerStory />
      </Box>
    </OutsideLayout>
  );
};

export default Reviews;
