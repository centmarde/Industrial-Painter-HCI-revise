import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/FirebaseConfig';
import { useUserStore } from './UserStore';

interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Use the Zustand store for user data
  const setUser = useUserStore(state => state.setUser);
  const resetUser = useUserStore(state => state.resetUser);
 
  // We no longer initialize from Zustand to avoid circular dependency
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Only update states if there's a change to avoid loops
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setCurrentUser(user);
        // Also update Zustand store
        setUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser]);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with user's name
      if (result.user) {
        await updateProfile(result.user, { displayName: name });
      }
      return result.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      resetUser();
      // Only redirect after the signOut and resetUser operations are complete
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
