import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Notifications } from 'expo';
// import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import expoPushTokensApi from '../api/expoPushTokens';
import navigation from '../navigation/rootNavigation';
import logger from '../utility/logger';

const useNotifications = () => {

  useEffect(() => {
    // registerForPushNotifications();
    registerForPushNotificationsAsync();

    // Notifications.addListener((notification) => {
    //   navigation.navigate('Account');
    // });

    // if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  // const registerForPushNotifications = async () => {
  //   try {
  //     const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     console.log(permission);
  //     if (!permission.granted) return;
  
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } catch (error) {
  //     console.log('Error getting a push token', error);
  //   }
  // };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // console.log('1st - Failed to get push token for push notification!', error);
        logger.log('1st - Failed to get push token for push notification!', error);
        return;
      }

      token = await Notifications.getExpoPushTokenAsync();
      // logger.log('token: ', token);
      expoPushTokensApi.register(token);
    } else {
      // console.log('Must use physical device for Push Notifications');
      logger.log('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    };
  };
};

// const localNotifications = (title, body) => {
//   Notifications.presentLocalNotificationAsync({
//     title,
//     body
//   });
// };

export default useNotifications;