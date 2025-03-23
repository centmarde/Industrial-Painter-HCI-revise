import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  CircularProgress,
  Container,
  Chip,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { QuoteService, QuoteData, QuoteResponse } from './services/QuoteService';
import { saveQuote } from './services/QuoteSaveService';
import { 
  ServiceType, 
  Suggestion, 
  getSizeSuggestions, 
  getDimensionSuggestions,
  getMaterialSuggestions,
  getTimeframeSuggestions 
} from './services/SuggestionService';
import { useUserStore } from '../../stores/UserStore';
import InsideLayout from '../../layout/InsideLayout';

const steps = ['Service Type', 'Size Information', 'Requirements'];

const Quote = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const quoteService = new QuoteService();
  const user = useUserStore(state => state.user);
  
  // State for managing the form steps
  const [activeStep, setActiveStep] = useState(0);
  
  // State for managing form data
  const [quoteData, setQuoteData] = useState<QuoteData>({
    serviceType: '',
    size: {
      squareMeters: '',
      dimensions: ''
    },
    requirements: {
      materials: '',
      timeframe: ''
    }
  });

  // State for dynamic suggestions
  const [sizeSuggestions, setSizeSuggestions] = useState<Suggestion[]>([]);
  const [dimensionSuggestions, setDimensionSuggestions] = useState<Suggestion[]>([]);
  const [materialSuggestions, setMaterialSuggestions] = useState<Suggestion[]>([]);
  const [timeframeSuggestions, setTimeframeSuggestions] = useState<Suggestion[]>([]);
  
  // State for AI response
  const [aiResponse, setAiResponse] = useState('');
  const [fixedEstimate, setFixedEstimate] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State for saving quote
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Update suggestions when service type changes
  useEffect(() => {
    if (quoteData.serviceType) {
      const serviceType = quoteData.serviceType as ServiceType;
      setSizeSuggestions(getSizeSuggestions(serviceType));
      setDimensionSuggestions(getDimensionSuggestions(serviceType));
      setMaterialSuggestions(getMaterialSuggestions(serviceType));
      setTimeframeSuggestions(getTimeframeSuggestions(serviceType));
    }
  }, [quoteData.serviceType]);
  
  // Handle next step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // Handle service type selection
  const handleServiceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteData({
      ...quoteData,
      serviceType: event.target.value
    });
  };
  
  // Handle size information changes
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteData({
      ...quoteData,
      size: {
        ...quoteData.size,
        [event.target.name]: event.target.value
      }
    });
  };
  
  // Handle requirements changes
  const handleRequirementsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteData({
      ...quoteData,
      requirements: {
        ...quoteData.requirements,
        [event.target.name]: event.target.value
      }
    });
  };
  
  // Handle size suggestion click
  const handleSizeSuggestionClick = (value: string) => {
    setQuoteData({
      ...quoteData,
      size: {
        ...quoteData.size,
        squareMeters: value
      }
    });
  };
  
  // Handle dimension suggestion click
  const handleDimensionSuggestionClick = (value: string) => {
    setQuoteData({
      ...quoteData,
      size: {
        ...quoteData.size,
        dimensions: value
      }
    });
  };
  
  // Handle material suggestion click
  const handleMaterialSuggestionClick = (value: string) => {
    setQuoteData({
      ...quoteData,
      requirements: {
        ...quoteData.requirements,
        materials: value
      }
    });
  };
  
  // Handle timeframe suggestion click
  const handleTimeframeSuggestionClick = (value: string) => {
    setQuoteData({
      ...quoteData,
      requirements: {
        ...quoteData.requirements,
        timeframe: value
      }
    });
  };
  
  // Submit form and get AI response
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await quoteService.getQuoteResponse(quoteData);
      setAiResponse(response.detailedResponse);
      setFixedEstimate(response.fixedEstimate);
      setActiveStep(steps.length);
    } catch (error) {
      console.error('Error getting quote:', error);
      setAiResponse('Sorry, there was an error generating your quote. Please try again.');
      setFixedEstimate('');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle accepting the quote
  const handleAcceptQuote = async () => {
    setSaving(true);
    setSaveError(null);
    
    try {
      // Use the saveQuote service function with user from store
      const saveResult = await saveQuote(
        quoteData,
        fixedEstimate,
        aiResponse,
        user
      );
      
      if (saveResult.success) {
        // Set success state
        setSaveSuccess(true);
        
        // Navigate after 3 seconds
        setTimeout(() => {
          navigate('/home/my-quotes');
        }, 3000);
      } else {
        // Handle error
        setSaveError(saveResult.error || 'Failed to save quote');
      }
    } catch (error: any) {
      console.error('Error saving quote:', error);
      setSaveError(error.message || 'There was an error saving your quote. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  // Validate if the current step is complete
  const isStepComplete = () => {
    switch (activeStep) {
      case 0:
        return quoteData.serviceType !== '';
      case 1:
        return quoteData.size.squareMeters !== '' && quoteData.size.dimensions !== '';
      case 2:
        return quoteData.requirements.materials !== '' && quoteData.requirements.timeframe !== '';
      default:
        return false;
    }
  };
  
  // Render step content based on active step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">What type of painting service do you need?</FormLabel>
            <RadioGroup
              value={quoteData.serviceType}
              onChange={handleServiceTypeChange}
            >
              <FormControlLabel value="commercial" control={<Radio />} label="Commercial" />
              <FormControlLabel value="industrial" control={<Radio />} label="Industrial" />
              <FormControlLabel value="interiorDesign" control={<Radio />} label="Interior Design" />
              <FormControlLabel value="exteriorPaint" control={<Radio />} label="Exterior Paint" />
            </RadioGroup>
          </FormControl>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Size and Dimensions
            </Typography>
            <TextField
              fullWidth
              label="Square Meters"
              name="squareMeters"
              value={quoteData.size.squareMeters}
              onChange={handleSizeChange}
              margin="normal"
              type="number"
              required
              placeholder="e.g., 25"
              helperText="Enter the total area to be painted"
            />
            
            <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
              Quick size suggestions:
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 1,
              mb: 2
            }}>
              {sizeSuggestions.map((suggestion) => (
                <Chip
                  key={suggestion.label}
                  label={`${suggestion.label} (${suggestion.value}m²)`}
                  onClick={() => handleSizeSuggestionClick(suggestion.value)}
                  clickable
                  color={quoteData.size.squareMeters === suggestion.value ? "primary" : "default"}
                  sx={{ 
                    cursor: 'pointer',
                    width: '100%',
                    height: 'auto',
                    padding: '8px 0',
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }
                  }}
                />
              ))}
            </Box>
            
            <TextField
              fullWidth
              label="Structure Dimensions"
              name="dimensions"
              value={quoteData.size.dimensions}
              onChange={handleSizeChange}
              margin="normal"
              required
              placeholder="e.g., 5m x 3m x 2.5m"
              helperText="Please describe the dimensions of the structure"
            />
            
            <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
              Common room dimensions:
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 1,
              mb: 2
            }}>
              {dimensionSuggestions.map((suggestion) => (
                <Chip
                  key={suggestion.label}
                  label={`${suggestion.label}`}
                  onClick={() => handleDimensionSuggestionClick(suggestion.value)}
                  clickable
                  color={quoteData.size.dimensions === suggestion.value ? "primary" : "default"}
                  sx={{ 
                    cursor: 'pointer',
                    width: '100%',
                    height: 'auto',
                    padding: '8px 0',
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Materials and Timeframe
            </Typography>
            <TextField
              fullWidth
              label="Materials Required"
              name="materials"
              value={quoteData.requirements.materials}
              onChange={handleRequirementsChange}
              margin="normal"
              multiline
              rows={3}
              required
              placeholder="e.g., Water-based paint, Premium finish, Anti-mold coating"
              helperText="What kind of paint or materials do you prefer?"
            />
            
            <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
              Suggested materials for {quoteData.serviceType}:
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 1,
              mb: 2
            }}>
              {materialSuggestions.map((suggestion) => (
                <Chip
                  key={suggestion.label}
                  label={suggestion.label}
                  onClick={() => handleMaterialSuggestionClick(suggestion.value)}
                  clickable
                  color={quoteData.requirements.materials === suggestion.value ? "primary" : "default"}
                  sx={{ 
                    cursor: 'pointer',
                    width: '100%',
                    height: 'auto',
                    padding: '8px 0',
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }
                  }}
                />
              ))}
            </Box>
            
            <TextField
              fullWidth
              label="Timeframe"
              name="timeframe"
              value={quoteData.requirements.timeframe}
              onChange={handleRequirementsChange}
              margin="normal"
              required
              placeholder="e.g., Within 2 weeks, By December 15th"
              helperText="When do you need this project completed?"
            />
            
            <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
              Suggested timeframes:
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 1,
              mb: 2
            }}>
              {timeframeSuggestions.map((suggestion) => (
                <Chip
                  key={suggestion.label}
                  label={suggestion.label}
                  onClick={() => handleTimeframeSuggestionClick(suggestion.value)}
                  clickable
                  color={quoteData.requirements.timeframe === suggestion.value ? "primary" : "default"}
                  sx={{ 
                    cursor: 'pointer',
                    width: '100%',
                    height: 'auto',
                    padding: '8px 0',
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };
  
  return (
    <InsideLayout>
      <Container maxWidth="lg">
        {/* Simplified Title and Image section with Grid-like layout */}
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            my: { xs: 2, sm: 3, md: 4 },
            px: 2
          }}
        >
          <Box 
            sx={{ 
              width: { xs: '100%', md: '60%' }, // 6 columns of 10
              textAlign: { xs: 'center', md: 'left' },
              pr: { md: 3 }
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 700,
                mb: 1
              }}
            >
              Get Your Painting Quote with AI
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                opacity: 0.9 
              }}
            >
              Fast, accurate estimates tailored to your specific painting needs
            </Typography>
          </Box>
          
          <Box sx={{ 
            width: { xs: '100%', md: '40%' }, // 4 columns of 10
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 2, md: 0 }
          }}>
            <img 
              src="/images/misc/qoute.png" 
              alt="Professional Painting Service" 
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Box>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            my: 3, 
            bgcolor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius
          }}
        >
          <Stepper 
            activeStep={activeStep} 
            sx={{ mb: 4 }}
            alternativeLabel
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: { zIndex: 1 }
                  }}
                >
                  <Typography 
                    sx={{ 
                      display: { xs: 'none', sm: 'block' }
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === steps.length ? (
            // Results page
            <Box>
              <Typography variant="h5" gutterBottom>
                Here's Your Personalized Quote
              </Typography>
              
              {loading ? (
                <Box display="flex" justifyContent="center" my={4}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {fixedEstimate && (
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 3, 
                        my: 3, 
                        bgcolor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        textAlign: 'center',
                        borderRadius: '8px'
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Estimated Project Cost
                      </Typography>
                      <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                        {fixedEstimate}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                        This estimate is based on the information provided
                      </Typography>
                    </Paper>
                  )}
                  
                  <Paper elevation={1} sx={{ p: 3, my: 2, bgcolor: theme.palette.background.default }}>
                    <Typography 
                      variant="h6" 
                      sx={{ mb: 2, color: theme.palette.text.secondary }}
                    >
                      Detailed Quote Information
                    </Typography>
                    <Typography 
                      dangerouslySetInnerHTML={{ __html: aiResponse }} 
                      sx={{ whiteSpace: 'pre-line' }}
                    />
                  </Paper>
                </>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setActiveStep(0);
                    setAiResponse('');
                    setFixedEstimate('');
                  }}
                  disabled={saving}
                >
                  Get Another Quote
                </Button>
                
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<span role="img" aria-label="checkmark">✓</span>}
                  onClick={handleAcceptQuote}
                  disabled={saving || saveSuccess}
                >
                  {saving ? <CircularProgress size={24} color="inherit" /> : 
                   saveSuccess ? 'Accepted!' : 'Accept Quote'}
                </Button>
              </Box>
              
              {saveSuccess && (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    mt: 2, 
                    p: 2, 
                    bgcolor: theme.palette.success.light,
                    color: theme.palette.success.contrastText,
                    borderRadius: '4px'
                  }}
                >
                  <Typography align="center">
                    Your quote has been saved! Redirecting to your quotes in 3 seconds...
                  </Typography>
                </Paper>
              )}
            </Box>
          ) : (
            // Form steps
            <Box>
              {getStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isStepComplete() || loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Get Quote'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={!isStepComplete()}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Paper>
        
        {/* Error Snackbar */}
        <Snackbar 
          open={!!saveError} 
          autoHideDuration={6000} 
          onClose={() => setSaveError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSaveError(null)} severity="error" sx={{ width: '100%' }}>
            {saveError}
          </Alert>
        </Snackbar>
      </Container>
    </InsideLayout>
  );
};

export default Quote;
