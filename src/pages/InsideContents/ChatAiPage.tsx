import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Container, 
  CircularProgress, 
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BrushIcon from '@mui/icons-material/Brush';
import InsideLayout from '../../layout/InsideLayout';
import { Response } from '../../utils/OpenAi';

const ChatAiPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<{type: 'user' | 'ai', content: string}[]>([]);
  const responseRef = useRef<HTMLDivElement>(null);
  const { getResponse } = Response();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to conversation
    setConversation(prev => [...prev, { type: 'user', content: input }]);
    
    // Clear input and set loading
    const userQuery = input;
    setInput('');
    setLoading(true);

    try {
      // Get AI response about industrial painting instead of pests
      const response = await getResponse(userQuery);
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { type: 'ai', content: response }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setConversation(prev => [...prev, { 
        type: 'ai', 
        content: 'Sorry, I encountered an error while processing your request.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <InsideLayout>
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: (theme) => theme.palette.mode === 'light' 
            ? `linear-gradient(135deg, ${theme.custom.lighter} 0%, ${theme.custom.light} 100%)`
            : `linear-gradient(135deg, #202020 0%, #121212 100%)`,
          display: 'flex',
          flexDirection: 'column',
          padding: isMobile ? 1 : 3,
        }}
      >
        <Container maxWidth="lg" sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          py: isMobile ? 2 : 4,
          px: isMobile ? 1 : 2,
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            gutterBottom
            align="center"
            sx={{ 
              fontWeight: 700,
              color: (theme) => theme.custom.darkest,
              mb: isMobile ? 2 : 4
            }}
          >
            Industrial Painting AI Assistant
          </Typography>

          <Paper 
            elevation={3} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: isMobile ? 'calc(100vh - 150px)' : '70vh',
              borderRadius: 2,
              overflow: 'hidden',
              animation: 'fadeIn 0.5s ease-in-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            {/* Conversation Display Area */}
            <Box 
              ref={responseRef}
              sx={{
                flex: 1,
                overflowY: 'auto',
                p: isMobile ? 2 : 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: theme.palette.background.default
              }}
            >
              {conversation.length === 0 ? (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  color: theme.palette.text.secondary,
                  textAlign: 'center',
                  p: 3
                }}>
                  <BrushIcon sx={{ fontSize: 40, color: theme.custom.darkest, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Ask about industrial painting services
                  </Typography>
                  <Typography variant="body1">
                    Examples:
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    "How much would it cost to paint a 10,000 sq ft warehouse?"
                  </Typography>
                  <Typography variant="body2">
                    "What type of paint is best for offshore metal structures?"
                  </Typography>
                  <Typography variant="body2">
                    "How long does industrial painting typically take for a factory floor?"
                  </Typography>
                </Box>
              ) : (
                conversation.map((msg, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: '85%',
                      alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                      bgcolor: msg.type === 'user' 
                        ? theme.palette.primary.main 
                        : theme.palette.background.paper,
                      color: msg.type === 'user' 
                        ? theme.palette.primary.contrastText 
                        : theme.palette.text.primary,
                      borderRadius: msg.type === 'user' 
                        ? '15px 15px 5px 15px' 
                        : '15px 15px 15px 5px',
                    }}
                  >
                    {msg.type === 'ai' ? (
                      <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br>') }} />
                    ) : (
                      <Typography>{msg.content}</Typography>
                    )}
                  </Paper>
                ))
              )}
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 2 }}>
                  <CircularProgress size={24} sx={{ color: theme.custom.darkest }} />
                </Box>
              )}
            </Box>

            <Divider />

            {/* Input Area */}
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{ 
                p: isMobile ? 1.5 : 2, 
                display: 'flex', 
                alignItems: 'center',
                bgcolor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`
              }}
            >
              <TextField
                fullWidth
                placeholder="Ask about industrial painting services..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                variant="outlined"
                sx={{ 
                  mr: isMobile ? 0.5 : 1,
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s',
                    '&:focus-within': {
                      boxShadow: '0 0 0 2px rgba(251, 133, 0, 0.2)',
                    }
                  }
                }}
                disabled={loading}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                endIcon={!isMobile && <SendIcon />}
                disabled={loading || !input.trim()}
                sx={{ 
                  minWidth: isMobile ? '40px' : '120px',
                  width: isMobile ? '40px' : 'auto',
                  height: isMobile ? '48px' : '56px',
                  px: isMobile ? 1 : 2,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(251, 133, 0, 0.4)' },
                    '70%': { boxShadow: '0 0 0 8px rgba(251, 133, 0, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(251, 133, 0, 0)' },
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 
                  isMobile ? <SendIcon fontSize="small" /> : "Send"}
              </Button>
            </Box>
          </Paper>

          <Typography 
            variant="caption" 
            sx={{ 
              mt: isMobile ? 1 : 2, 
              textAlign: 'center', 
              color: theme.palette.text.secondary,
              display: 'block'
            }}
          >
            Responses are AI-generated and may require verification for specifics like pricing and timelines.
          </Typography>
        </Container>
      </Box>
    </InsideLayout>
  );
};

export default ChatAiPage;
