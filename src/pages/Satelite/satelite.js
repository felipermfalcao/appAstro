import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking  } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../../context/auth';
import NordesteInfra from './nordesteInfra';
import NordesteTopo from './nordesteTopo';
import BrasilInfra from './brasilInfra';
import BrasilTopo from './brasilTopo';
import AmericaInfra from './americaInfra';
import AmericaTopo from './americaTopo';

export default function Satelite() {
  const {dadosUser} = useContext(AuthContext);

  const Tab = createBottomTabNavigator();

 return (
    <NavigationContainer
    independent={true}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Nordeste Infra') {
            iconName = focused
              ? 'earth'
              : 'earth-outline';
          }
          else if (route.name === 'Nordeste Topo') {
            iconName = focused ? 'earth' : 'earth-outline';
          }
          else if (route.name === 'Brasil Infra') {
            iconName = focused ? 'earth' : 'earth-outline';
          }
          else if (route.name === 'Brasil Topo') {
            iconName = focused ? 'earth' : 'earth-outline';
          }
          else if (route.name === 'América Infra') {
            iconName = focused ? 'earth' : 'earth-outline';
          }
          else if (route.name === 'América Topo') {
            iconName = focused ? 'earth' : 'earth-outline';
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
         name="Nordeste Infra" component={NordesteInfra} />

        <Tab.Screen 
        options={{headerShown: false}}        
        name="Nordeste Topo" component={NordesteTopo} />

        <Tab.Screen
        options={{headerShown: false}}
         name="Brasil Infra" component={BrasilInfra} />

        <Tab.Screen 
        options={{headerShown: false}}        
        name="Brasil Topo" component={BrasilTopo} />

        <Tab.Screen
        options={{headerShown: false}}
         name="América Infra" component={AmericaInfra} />

        <Tab.Screen 
        options={{headerShown: false}}        
        name="América Topo" component={AmericaTopo} />

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