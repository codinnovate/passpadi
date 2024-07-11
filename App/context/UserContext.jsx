import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId !== null) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Failed to fetch userId from AsyncStorage:', error);
      }
    };
    getUserId();
  }, []);

  return (
    <UserContext.Provider value={{ userId }} >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
