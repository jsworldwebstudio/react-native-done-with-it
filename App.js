import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';

import AppNavigator from './app/navigation/AppNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import OfflineNotice from './app/components/OfflineNotice';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import { navigationRef } from './app/navigation/rootNavigation';
import logger from './app/utility/logger';

// logger.start();

export default function AppOld() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const appReady = () => {
    // this function replaces: () => setIsReady(true)
    logger.start();
    setIsReady(true);
  };

  if (!isReady)
  return <AppLoading startAsync={restoreUser} onFinish={appReady} />

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};