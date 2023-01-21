import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking  } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../../context/auth';
import NerdBunker from './nerdbunker';
import Mobile from './mobile';
import Flow from './flow';

export default function News() {
  const {dadosUser} = useContext(AuthContext);

  const Tab = createBottomTabNavigator();

 return (
    <NavigationContainer
    independent={true}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'NerdBunker') {
            iconName = focused
              ? 'newspaper'
              : 'newspaper-outline';
          }
          else if (route.name === 'Mobile') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          }
          else if (route.name === 'Flow') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
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
         name="NerdBunker" component={NerdBunker} />

        <Tab.Screen 
        options={{headerShown: false}}        
        name="Mobile" component={Mobile} />


        <Tab.Screen 
        options={{headerShown: false}}
        name="Flow" component={Flow} />

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