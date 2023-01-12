import React, { useContext }from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { AuthContext } from '../context/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
    const {logado, loading } = useContext(AuthContext);

    if(loading == true){
      return(
        <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor: '#333'}}>
          <ActivityIndicator size={50} color='#fff'/>
          <Text>Entrando...</Text>
        </View>
      );
    }

    if (logado == 0)
    {
      return (<AuthRoutes/>);
    }
    else{
      return (<AppRoutes/>);
    }
}

export default Routes;