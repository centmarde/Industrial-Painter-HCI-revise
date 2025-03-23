import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../lib/FirebaseConfig';
import { QuoteData } from './QuoteService';

// Define the structure for a saved quote
export interface SavedQuote {
  userId: string;
  userEmail: string | null;
  serviceType: string;
  size: {
    squareMeters: string;
    dimensions: string;
  };
  requirements: {
    materials: string;
    timeframe: string;
  };
  fixedEstimate: string;
  detailedResponse: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: any; // Firebase Timestamp
}

// Define response type for saveQuote function
export interface SaveQuoteResponse {
  success: boolean;
  error?: string;
  quoteId?: string;
}

/**
 * Save a quote to Firestore
 * Tries to use the provided user first, falls back to Firebase auth,
 * then falls back to Auth context user if available
 */
export async function saveQuote(
  quoteData: QuoteData,
  fixedEstimate: string,
  detailedResponse: string,
  userFromStore: any = null, // Accept user from store as optional parameter
  authContextUser: any = null // Accept Auth context user as optional parameter
): Promise<SaveQuoteResponse> {
  try {
    // Try to get user from store first, then Firebase auth, then Auth context
    let user = userFromStore;
    
    if (!user) {
      const auth = getAuth();
      user = auth.currentUser;
    }
    
    // If we still don't have a user, try the Auth context user
    if (!user && authContextUser) {
      user = authContextUser;
    }
    
    // If we still don't have a user, return error
    if (!user) {
      return {
        success: false,
        error: 'User not authenticated. Please log in to save quotes.'
      };
    }
    
    // Prepare the quote data
    const quoteToSave: SavedQuote = {
      userId: user.uid,
      userEmail: user.email,
      serviceType: quoteData.serviceType,
      size: quoteData.size,
      requirements: quoteData.requirements,
      fixedEstimate: fixedEstimate,
      detailedResponse: detailedResponse,
      status: 'pending',
      createdAt: serverTimestamp(),
    };
    
    // Save to Firestore
    const quotesCollection = collection(db, 'quotes');
    const docRef = await addDoc(quotesCollection, quoteToSave);
    
    return {
      success: true,
      quoteId: docRef.id
    };
    
  } catch (error: any) {
    console.error('Error saving quote:', error);
    return {
      success: false,
      error: error.message || 'There was an error saving your quote.'
    };
  }
}
