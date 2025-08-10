'use client';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  role: string | null;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isAuthReady: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Força a atualização do token para obter os custom claims mais recentes.
        const idTokenResult = await currentUser.getIdTokenResult(true);
        const userRole = (idTokenResult.claims.role as string) || null;
        
        setUser(currentUser);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, role, isAuthReady };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
