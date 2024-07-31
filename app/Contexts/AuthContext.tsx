import React, { useState, createContext, useEffect, Dispatch, SetStateAction } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface UserContextData {
  user: boolean;
  setUser: Dispatch<SetStateAction<boolean>>;
}
export const AuthUserContext = createContext<UserContextData>({
  user: false,
  setUser: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<boolean>(false);
  useEffect(() => {
    // Save onboarded state to AsyncStorage whenever it changes
    AsyncStorage.setItem('user', user ? 'true' : 'false');
  }, [user]);
  useEffect(() => {
    // Load onboarded state from AsyncStorage on component mount
    const loadUserState = async () => {
      const storedUserState = await AsyncStorage.getItem('user');
      if (storedUserState !== null) {
        setUser(storedUserState === 'true');
      }
    };
    loadUserState();
  }, []);
  return (
    <AuthUserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </ AuthUserContext.Provider>
  );
};
