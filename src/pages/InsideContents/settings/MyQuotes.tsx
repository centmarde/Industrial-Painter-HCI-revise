import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Grid, 
  Button, 
  CircularProgress, 
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserStore } from '../../../stores/UserStore';
import { deleteQuote } from '../services/SettingsQuotes';
import { createAppTheme } from '../../../theme/theme';
import InsideLayout from '../../../layout/InsideLayout';
const MyQuotes: React.FC = () => {
  const { 
    user, 
    quotes, 
    loading, 
    error, 
    fetchUserQuotes 
  } = useUserStore();
  
  const navigate = useNavigate(); // Initialize useNavigate
  
  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);

  // Use the theme
  const theme = createAppTheme('dark');
  
  // Helper function to safely capitalize first letter of a string
  const capitalizeFirst = (text?: string): string => {
    if (!text) return 'Quote';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  useEffect(() => {
    // Fetch quotes when component mounts
    if (user) {
      fetchUserQuotes();
    }
  }, [user, fetchUserQuotes]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // Handle opening the delete dialog
  const handleDeleteClick = (quoteId: string) => {
    setQuoteToDelete(quoteId);
    setDeleteDialogOpen(true);
  };

  // Handle the actual deletion
  const handleConfirmDelete = async () => {
    if (quoteToDelete) {
      try {
        await deleteQuote(quoteToDelete);
        // Refresh the quotes list
        fetchUserQuotes();
        // Close the dialog
        setDeleteDialogOpen(false);
        setQuoteToDelete(null);
      } catch (err) {
        console.error('Error deleting quote:', err);
        // You might want to show an error message here
      }
    }
  };

  // Handle canceling the delete operation
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setQuoteToDelete(null);
  };
  
  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5">Please log in to view your quotes</Typography>
        </Box>
      </ThemeProvider>
    );
  }
  
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );
  }
  
  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Error: {error}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={fetchUserQuotes}>
            Try Again
          </Button>
        </Box>
      </ThemeProvider>
    );
  }
  
  return (
 <InsideLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">My Quotes</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/home/get-a-quote')} // Add onClick handler
          >
            Request New Quote
          </Button>
        </Box>
        
        {quotes.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="textSecondary">
              You haven't requested any quotes yet.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }} 
              onClick={() => navigate('/home/quote')} // Add onClick handler
            >
              Request Your First Quote
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {quotes.map((quote) => (
              <Grid item xs={12} md={6} key={quote.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">
                        {capitalizeFirst(quote.requirements?.serviceType)}
                        {quote.size?.squareMeters && ` - ${quote.size.squareMeters}m²`}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={quote.status} 
                          color={getStatusColor(quote.status)} 
                          size="small" 
                          sx={{ mr: 1 }}
                        />
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleDeleteClick(quote.id)}
                          aria-label="delete quote"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {quote.requirements?.materials || 'No description available'}
                      {quote.size?.dimensions && ` - ${quote.size.dimensions}`}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {(quote as any).fixedEstimate || 'Price not available'}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Created: {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Quote
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this quote? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </InsideLayout>
  );
};

export default MyQuotes;