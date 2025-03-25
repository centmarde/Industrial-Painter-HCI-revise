import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/FirebaseConfig';

// Define what we want to store from the User object
interface StoredUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified?: boolean;
  phoneNumber?: string | null;
}

// Define Firestore user data interface
interface FirestoreUserData {
  photoURL?: string;
  displayName?: string;
  // Add other Firestore fields as needed
}

interface UserStore {
  user: User | null;
  firestoreUserData: FirestoreUserData | null;
  setUser: (user: User | null) => void;
  resetUser: () => void;
  fetchFirestoreUserData: (uid: string) => Promise<void>;
}

// Function to extract required user properties
const extractUserProperties = (user: User | null): StoredUser | null => {
  if (!user) return null;
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
  };
};

// Create a store with persistence
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      firestoreUserData: null,
      setUser: (user) => {
        console.log('Setting user:', user ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        } : 'null');
        set({ user });
        
        // Fetch Firestore user data if user exists
        if (user) {
          get().fetchFirestoreUserData(user.uid);
        }
      },
      resetUser: () => {
        console.log('User reset to null');
        set({ user: null, firestoreUserData: null });
      },
      fetchFirestoreUserData: async (uid) => {
        try {
          const userDocRef = doc(db, 'users', uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as FirestoreUserData;
            console.log('Fetched Firestore user data:', userData);
            set({ firestoreUserData: userData });
          } else {
            console.log('No Firestore user document found');
            set({ firestoreUserData: null });
          }
        } catch (error) {
          console.error('Error fetching Firestore user data:', error);
          set({ firestoreUserData: null });
        }
      }
    }),
    {
      name: 'user-storage',
      // Improved partialize to extract only what we need
      partialize: (state) => ({
        user: extractUserProperties(state.user),
        firestoreUserData: state.firestoreUserData
      }),
      // Add merge function to handle the stored data properly
      merge: (persistedState, currentState) => {
        return {
          ...currentState,
          user: (persistedState as any).user ? (persistedState as any).user as unknown as User : null,
          firestoreUserData: (persistedState as any).firestoreUserData || null
        };
      },
    }
  )
);
