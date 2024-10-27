import React, { createContext, useContext, useEffect, useState } from 'react';
import LocalStorageKeys from '../../constants/local-storage-keys';

interface AuthContextType {
  isAuthenticated: boolean | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AppAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const userID = localStorage.getItem(LocalStorageKeys.USER_ID);
    const username = localStorage.getItem(LocalStorageKeys.USERNAME);
    const password = localStorage.getItem(LocalStorageKeys.PASSWORD);
    const role = localStorage.getItem(LocalStorageKeys.ROLE);

    const isValid = Boolean(userID && username && password && role);
    setIsAuthenticated(isValid);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AppAuthProvider");
  }
  return context;
};
