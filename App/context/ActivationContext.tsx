import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivationContext = createContext();

export const ActivationProvider = ({ children }) => {
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const checkActivationStatus = async () => {
      const status = await AsyncStorage.getItem('isActivated');
      setIsActivated(status === 'true');
    };

    checkActivationStatus();
  }, []);

  const activateApp = async () => {
    await AsyncStorage.setItem('isActivated', 'true');
    setIsActivated(true);
  };

  return (
    <ActivationContext.Provider value={{ isActivated, setIsActivated, activateApp }}>
      {children}
    </ActivationContext.Provider>
  );
};

export default ActivationContext;
