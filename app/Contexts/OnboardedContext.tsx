import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface OnboardUserContextData {
  onboarded: boolean;
  setOnboarded: Dispatch<SetStateAction<boolean>>;
}

export const OnboardUserContext = createContext<OnboardUserContextData>({
  onboarded: false,
  setOnboarded: () => { },
});

export const OnboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboarded, setOnboarded] = useState<boolean>(false);
  useEffect(() => {
    // Save onboarded state to AsyncStorage whenever it changes
    AsyncStorage.setItem('onboarded', onboarded ? 'true' : 'false');
  }, [onboarded]);
  useEffect(() => {
    // Load onboarded state from AsyncStorage on component mount
    const loadOnboardedState = async () => {
      const storedOnboardedState = await AsyncStorage.getItem('onboarded');
      if (storedOnboardedState !== null) {
        setOnboarded(storedOnboardedState === 'true');
      }
    };
    loadOnboardedState();
  }, []);

  return (
    <OnboardUserContext.Provider
      value={{ onboarded, setOnboarded }}
    >
      {children}
    </OnboardUserContext.Provider>
  );
};