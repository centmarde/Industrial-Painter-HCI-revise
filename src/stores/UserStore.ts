import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';

// Define what we want to store from the User object
interface StoredUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified?: boolean;
  phoneNumber?: string | null;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  resetUser: () => void;
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
    (set) => ({
      user: null,
      setUser: (user) => {
        console.log('Setting user:', user ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        } : 'null');
        set({ user });
      },
      resetUser: () => {
        console.log('User reset to null');
        set({ user: null });
      },
    }),
    {
      name: 'user-storage',
      // Improved partialize to extract only what we need
      partialize: (state) => ({
        user: extractUserProperties(state.user)
      }),
      // Add merge function to handle the stored data properly
      merge: (persistedState, currentState) => {
        return {
          ...currentState,
          user: (persistedState as { user: StoredUser | null }).user ? (persistedState as { user: StoredUser | null }).user as unknown as User : null
        };
      },
    }
  )
);
