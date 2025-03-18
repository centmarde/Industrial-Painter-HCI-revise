import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Fab, 
  Paper, 
  TextField, 
  IconButton, 
  Typography, 
  Tooltip, 
  Zoom, 
  Collapse 
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

// Define message type
interface ChatMessage {
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = () => {
    if (message.trim()) {
      // Add user message to chat
      const userMessage: ChatMessage = {
        text: message.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setMessage('');
      
      // Simulate reply after a short delay
      setTimeout(() => {
        const systemReply: ChatMessage = {
          text: "Thank you for your message. We've sent you an email with further information. Our team will get back to you shortly.",
          sender: 'system',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, systemReply]);
      }, 800);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Chat interface */}
      <Collapse in={isOpen} timeout={300}>
        <Paper
          elevation={6}
          sx={{
            position: 'absolute',
            bottom: 70,
            right: 0,
            width: 320,
            height: 400,
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Chat header */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Message Us</Typography>
            <IconButton size="small" onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Chat messages area */}
          <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              How can we help you today?
            </Typography>
            
            {/* Messages display */}
            {messages.map((msg, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mb: 1,
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' 
                }}
              >
                <Paper 
                  elevation={1}
                  sx={{
                    p: 1,
                    maxWidth: '80%',
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'primary.light',
                    color: 'white',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          
          {/* Message input area */}
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton 
              color="primary" 
              onClick={handleSend} 
              disabled={!message.trim()}
              sx={{ ml: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Collapse>
      
      {/* Chat button */}
      <Tooltip 
        title="Message Us" 
        placement="left" 
        TransitionComponent={Zoom}
        arrow
      >
        <Fab
          color="primary"
          aria-label="chat"
          onClick={isOpen ? handleClose : handleOpen}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default ChatButton;
