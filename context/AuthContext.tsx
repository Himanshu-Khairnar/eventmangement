"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/clientApp";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in 
        setUser(user);
      } else {
        // User is signed out 
        setUser(null);
      }
      setLoading(false);
    });

    // 🧹 Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🛰️ Custom hook to use the auth context easily
export const useAuth = () => useContext(AuthContext);