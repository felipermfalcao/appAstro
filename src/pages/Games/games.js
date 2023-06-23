import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking  } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../../context/auth';
import Games1 from './games1';
import Calendario from './calendario';

export default function Games() {
  const {dadosUser} = useContext(AuthContext);

  const Tab = createBottomTabNavigator();

 return (
    <NavigationContainer
    independent={true}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Melhores Ano') {
            iconName = focused
              ? 'game-controller'
              : 'game-controller-outline';
          }
          else if (route.name === 'Calendário') {
            iconName = focused ? 'calendar' : 'calendar-outline';
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
         name="Melhores Ano" component={Games1} />

        <Tab.Screen
        options={{headerShown: false}}
         name="Calendário" component={Calendario} />

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