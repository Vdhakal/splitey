import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: async () => {},
});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const testStorage = async () => {
      await AsyncStorage.setItem('testKey', 'testValue');
      const value = await AsyncStorage.getItem('testKey');
      console.log('Test AsyncStorage value:', value);
    };
    testStorage();
  }, []);

  const login = async (newToken: string) => {
    console.log('Login called with token:', newToken);
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
    console.log('Token after login:', token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
