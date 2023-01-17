import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking  } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../../context/auth';
import Brasileirao from './brasileirao';
import CopaBrasil from './copaBrasil';
import Tudo from './tudo';

export default function Futebol() {
  const {dadosUser} = useContext(AuthContext);

  const Tab = createBottomTabNavigator();

 return (
    <NavigationContainer
    independent={true}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Brasileirão') {
            iconName = focused
              ? 'football'
              : 'football-outline';
          }
          else if (route.name === 'Copa do Brasil') {
            iconName = focused ? 'football' : 'football-outline';
          }
          else if (route.name === 'Todos') {
            iconName = focused ? 'football' : 'football-outline';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} type='ionicon' size={size} color={color} />;
        },
        tabBarInactiveTintColor: '#999',
        tabBarActiveBackgroundColor: '#000',
        tabBarInactiveBackgroundColor: '#000'
      })}
      >
        <Tab.Screen
        options={{headerShown: false}}
         name="Brasileirão" component={Brasileirao} />

        <Tab.Screen 
        options={{headerShown: false}}        
        name="Copa do Brasil" component={CopaBrasil} />


        <Tab.Screen 
        options={{headerShown: false}}
        name="Todos" component={Tudo} />

      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#333'
  }

});