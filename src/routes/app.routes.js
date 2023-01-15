import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';

import Home from '../pages/Home'
import Tempo from '../pages/Tempo'
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

function AppRoutes() {
 return (
   <Drawer.Navigator
   initialRouteName="Tempo"
   drawerContent={CustomDrawer}

   screenOptions={{
    drawerStyle: {
      backgroundColor: '#171717',
    },
    drawerInactiveTintColor: '#fff',
    //drawerActiveBackgroundColor: '#fff',
    drawerType: 'front',
    drawerLabelStyle:{
      //fontWeight: '500'
    },
    headerStyle: {
      backgroundColor: '#171717',
    },
    headerTintColor: '#999',
  }}
   >
    <Drawer.Screen name='APOD' component={Home}
    options={{ 
      headerShown: true,
      drawerIcon: ({focused, size}) => (
        <Icon
        name='planet-outline'
        type='ionicon'
        size={size}
        color={focused ? '#2670DE' : '#fff'}
      />
     ),
     }}    
    />

    <Drawer.Screen name='Tempo' component={Tempo}
    options={{ 
      headerShown: true,
      drawerIcon: ({focused, size}) => (
        <Icon
        name='rainy-outline'
        type='ionicon'
        size={size}
        color={focused ? '#2670DE' : '#fff'}
      />
     ),
     }}    
    />
    
    <Drawer.Screen name='Home 3' component={Home} options={{ headerShown: true }} />
   </Drawer.Navigator>
  );
}

export default AppRoutes;