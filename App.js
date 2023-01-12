import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
//import { Button, Input, Icon } from '@rneui/themed';
//import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/context/auth';
import Routes from './src/routes';

export default function appAstro() {
  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#171717' barStyle='light-content'/>
        <Routes/>
    </AuthProvider>
    </NavigationContainer>
  );
}