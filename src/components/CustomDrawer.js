import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

export default function CustomDrawer(props) {
 return (
    <DrawerContentScrollView {...props}>
        <View style={{width: '100%', height: 77, justifyContent: 'center', 
                      alignItems: 'center', marginTop: 70}}>

            <Image style={{width: 150, resizeMode: 'contain', marginBottom: 70}} 
            source={require('../img/logo-branca.png')}
            />

        </View>


        <DrawerItemList {...props}
        />
    </DrawerContentScrollView>
  );
}