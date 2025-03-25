import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/FirebaseConfig';

// Define nested types for requirements and size
interface QuoteRequirements {
  serviceType?: string;
  materials?: string;
  timeframe?: string;
}

interface QuoteSize {
  dimensions?: string;
  squareMeters?: string;
}

export interface Quote {
  id: string;
  userId: string;
  userEmail?: string;
  requirements?: QuoteRequirements;
  size?: QuoteSize;
  fixedEstimate?: string;
  detailedResponse?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt?: Date;
}

// Fetch all quotes
export const fetchAllQuotes = async (): Promise<Quote[]> => {
  try {
    const quotesRef = collection(db, 'quotes');
    const querySnapshot = await getDocs(quotesRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    } as Quote));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

// Fetch quotes by user ID
export const fetchQuotesByUserId = async (userId: string): Promise<Quote[]> => {
  try {
    const quotesRef = collection(db, 'quotes');
    const q = query(quotesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    } as Quote));
  } catch (error) {
    console.error('Error fetching quotes by user ID:', error);
    throw error;
  }
};

// Create a new quote
export const createQuote = async (quoteData: Omit<Quote, 'id'>): Promise<string> => {
  try {
    const quotesRef = collection(db, 'quotes');
    const docRef = await addDoc(quotesRef, quoteData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
};

// Update an existing quote
export const updateQuote = async (quoteId: string, quoteData: Partial<Quote>): Promise<void> => {
  try {
    const quoteRef = doc(db, 'quotes', quoteId);
    await updateDoc(quoteRef, {
      ...quoteData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating quote:', error);
    throw error;
  }
};

// Delete a quote
export const deleteQuote = async (quoteId: string): Promise<void> => {
  try {
    const quoteRef = doc(db, 'quotes', quoteId);
    await deleteDoc(quoteRef);
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};

// Get a single quote by ID
export const getQuoteById = async (quoteId: string): Promise<Quote | null> => {
  try {
    const quoteRef = doc(db, 'quotes', quoteId);
    const quoteDoc = await getDoc(quoteRef);
    
    if (quoteDoc.exists()) {
      const data = quoteDoc.data();
      return {
        id: quoteDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Quote;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting quote by ID:', error);
    throw error;
  }
};
