import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
//import { Button, Input, Icon } from '@rneui/themed';
//import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen'

import AuthProvider from './src/context/auth';
import Routes from './src/routes';

export default function appAstro() {

  useEffect(()=> {
    SplashScreen.hide();
    OneSignal.setAppId('288c1e9f-c483-4ad8-9033-c7264ed011ea');
    
    
// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});
  },[]);

  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#171717' barStyle='light-content'/>
        <Routes/>
    </AuthProvider>
    </NavigationContainer>
  );
}