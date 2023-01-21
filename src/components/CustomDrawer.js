import React, {useContext} from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon, Button } from '@rneui/themed';

import { AuthContext } from '../context/auth';

export default function CustomDrawer(props) {
  const {Logout} = useContext(AuthContext);

 return (
    <DrawerContentScrollView {...props}>
        <View style={{width: '100%', height: 77, justifyContent: 'center', 
                      alignItems: 'center', marginTop: 70}}>

            <Image style={{width: 150, resizeMode: 'contain', marginBottom: 70}} 
            source={require('../img/logo-branca.png')}
            />

        </View>
        <DrawerItemList {...props}/>

        <View style={{marginTop: 25}}>
        <Button
          radius={'sm'}
          color="error"
          //loading={loadingAuth}
          title="Sair"
          onPress={() => Logout()}
          icon={{
            name: 'exit',
            type: 'ionicon',
            size: 18,
            color: 'white',
          }}
          iconLeft
         />
        </View>
    </DrawerContentScrollView>
  );
}