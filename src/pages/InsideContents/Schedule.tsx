import React, { useState, useEffect, useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
  ThemeProvider,
  Badge
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import RefreshIcon from '@mui/icons-material/Refresh';
import { interviewData, InterviewData } from '../../data/interviewData';
import theme from '../../theme/theme';
import InsideLayout from '../../layout/InsideLayout';

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [interviews, setInterviews] = useState<InterviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  
  // Function to get random interviews (simulating fetching from API)
  const fetchRandomInterviews = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Current date for checking future dates
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day
      
      // Randomly shuffle the array of interviews
      const shuffled = [...interviewData].sort(() => 0.5 - Math.random());
      
      // Select a random subset
      const selectedInterviews = shuffled.slice(0, Math.floor(Math.random() * 5) + 3);
      
      // Update the dates to be within the current month but only for current day and future
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      const updatedInterviews = selectedInterviews.map(interview => {
        const startDate = new Date(interview.start);
        const endDate = new Date(interview.end);
        
        // Set to current month but keep day, hour, minute
        startDate.setFullYear(currentYear);
        startDate.setMonth(currentMonth);
        
        endDate.setFullYear(currentYear);
        endDate.setMonth(currentMonth);
        
        // Ensure the date is today or in the future
        if (startDate < today) {
          // If the day is in the past, move it to a future date
          const daysToAdd = Math.floor(Math.random() * 14) + 1; // Random between 1-14 days ahead
          startDate.setDate(today.getDate() + daysToAdd);
          endDate.setDate(today.getDate() + daysToAdd);
          endDate.setHours(startDate.getHours() + 1); // Ensure end is after start
        }
        
        return {
          ...interview,
          start: startDate,
          end: endDate
        };
      });
      
      setInterviews(updatedInterviews);
      
      // Create a list of days that have interviews for highlighting
      const daysWithInterviews = updatedInterviews.map(interview => interview.start.getDate());
      setHighlightedDays([...new Set(daysWithInterviews)]); // Remove duplicates
      
      setLoading(false);
    }, 500);
  };

  // Get interviews for the selected date
  const getInterviewsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    const date = selectedDate.toDate();
    return interviews.filter(interview => 
      interview.start.getDate() === date.getDate() &&
      interview.start.getMonth() === date.getMonth() &&
      interview.start.getFullYear() === date.getFullYear()
    );
  };

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle date change
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // Custom component to highlight days with interviews
  const ServerDay = (props: PickersDayProps<dayjs.Dayjs> & { highlightedDays?: number[] }) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    
    // Check if day is in the past
    const isInPast = day.isBefore(dayjs(), 'day');
    
    // Only highlight if the day is not in the past, not outside current month, and has interviews
    const isHighlighted = !isInPast && 
                          !outsideCurrentMonth && 
                          highlightedDays.includes(day.date());
    
    return (
    
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isHighlighted ? "•" : undefined}
        color="primary"
        sx={{
          '& .MuiBadge-badge': {
            fontSize: '1.5rem',
            height: '16px',
            minWidth: '16px',
            top: '15%',
            right: '15%',
            transform: 'scale(1) translate(50%, -50%)',
            transformOrigin: '100% 0%',
            background: isHighlighted ? 'linear-gradient(45deg, #FB8500, #FF6B00)' : 'transparent',
            boxShadow: isHighlighted ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
            animation: isHighlighted ? 'pulse 1.5s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1) translate(50%, -50%)' },
              '50%': { transform: 'scale(1.2) translate(50%, -50%)' },
              '100%': { transform: 'scale(1) translate(50%, -50%)' }
            }
          }
        }}
      >
        <PickersDay 
          {...other} 
          outsideCurrentMonth={outsideCurrentMonth} 
          day={day}
          sx={{
            ...(isHighlighted && {
              backgroundColor: 'rgba(251, 133, 0, 0.1)',
              fontWeight: 'bold',
              border: '2px solid rgba(251, 133, 0, 0.7)',
              borderRadius: '50%',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(251, 133, 0, 0.2)',
                transform: 'scale(1.1)'
              }
            })
          }}
        />
      </Badge>
     
    );
  };

  // Fetch interviews when component mounts
  useEffect(() => {
    fetchRandomInterviews();
  }, []);

  // Function to determine if a date has interviews
  const hasInterviewsOnDate = (date: Date) => {
    return interviews.some(interview => 
      interview.start.getDate() === date.getDate() &&
      interview.start.getMonth() === date.getMonth() &&
      interview.start.getFullYear() === date.getFullYear()
    );
  };

  // Format the selected date for display
  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    return selectedDate.toDate().toLocaleDateString(undefined, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <InsideLayout>
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Job Interview Schedule
        </Typography>
        
        <Grid container spacing={3}>
          {/* Calendar Section */}
          <Grid item xs={12} md={8} sx={{
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.01)',
            }
          }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar 
                value={selectedDate}
                onChange={handleDateChange}
                slots={{
                  day: ServerDay
                }}
                slotProps={{
                  day: {
                    highlightedDays
                  } as any
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  padding: '20px',
                  minHeight: '500px',
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiDayCalendar-header, .MuiPickersDay-root': {
                    fontSize: '1.2rem'  // Larger text
                  },
                  '& .MuiPickersCalendarHeader-label': {
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: theme.palette.primary.main
                  },
                  '& .MuiPickersDay-root.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    transform: 'scale(1.2)',
                    transition: 'transform 0.2s ease-in-out',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  },
                  '& .MuiPickersDay-root:hover': {
                    backgroundColor: 'rgba(251, 133, 0, 0.15)',
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s ease-in-out'
                  },
                  '& .MuiPickersDay-root': {
                    margin: '4px',
                    height: '45px',
                    width: '45px'
                  },
                  '& .MuiDayCalendar-weekContainer': {
                    margin: '8px 0'
                  },
                  '& .MuiPickersCalendarHeader-root': {
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    marginTop: '10px',
                    marginBottom: '20px'
                  }
                }}
              />
            </LocalizationProvider>
            
          
          </Grid>
          
          {/* Interviews List Section */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 6, 
                minHeight: 500,
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius
              }}
            >
              <Typography variant="h6" gutterBottom>
                Interviews for {formatSelectedDate()}
              </Typography>
              
              {getInterviewsForSelectedDate().length === 0 ? (
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center" 
                  height="400px"
                > 
                  <Typography variant="body1" color="textSecondary">
                    No interviews scheduled for this date
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ mt: 2 }}>
                  {getInterviewsForSelectedDate().map((interview) => (
                    <Card 
                      key={interview.id} 
                      sx={{ 
                        mb: 2,
                        borderLeft: `5px solid ${interview.color || theme.palette.primary.main}`,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <CardHeader 
                        avatar={
                          <Avatar sx={{ bgcolor: interview.color || theme.palette.primary.main }}>
                            {interview.candidateName.charAt(0)}
                          </Avatar>
                        }
                        action={
                          <Tooltip title={interview.description}>
                            <IconButton aria-label="info">
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        }
                        title={interview.title}
                        subheader={`${formatTime(interview.start)} - ${formatTime(interview.end)}`}
                      />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <PersonIcon fontSize="small" color="primary" />
                              <Typography variant="body2">{interview.candidateName}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <WorkIcon fontSize="small" color="primary" />
                              <Typography variant="body2">{interview.position}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <LocationOnIcon fontSize="small" color="primary" />
                              <Typography variant="body2">{interview.location}</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                    <Box 
              sx={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                mt: 3, 
                mb: 2 
              }}
            >
              <Chip 
                icon={<RefreshIcon />}
                label={loading ? "Loading..." : "Refresh Interviews"} 
                color="primary" 
                onClick={fetchRandomInterviews} 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '20px 10px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)'
                  },
                  '&:active': {
                    transform: 'translateY(1px)'
                  }
                }}
                disabled={loading}
              />
            </Box>
                </Box>
                
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
    </InsideLayout>
  );
};

export default Schedule;
