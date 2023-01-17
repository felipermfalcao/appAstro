import React, {useContext, useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, Acti  } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import moment from 'moment';
import { WebView } from 'react-native-webview';

import Loading from '../../components/loadingGeral';

export default function Brasileirao (){
    const [loading, setLoading] = useState(true);
    const webViewRef = useRef(null);

    return(
        <View style={styles.container}>

        {loading && <Loading />}

        <WebView
           ref={webViewRef}
          source={{ uri: 'https://felipefalcao.com.br/astro/futebol.php' }}
          onLoadEnd={() => setLoading(false)}
        />
        <View style={{flexDirection: 'row'}}>
        <Button
          radius={'sm'}
          containerStyle={{
            flex: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10
          }}
          title="Voltar"
          onPress={() => webViewRef.current.goBack()}
          icon={{
            name: 'arrow-back-circle-outline',
            type: 'ionicon',
            size: 18,
            color: 'white',
          }}
          iconLeft
          />

        <Button
          radius={'sm'}
          containerStyle={{
            flex: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10
          }}
          title="Recarregar"
          onPress={() => webViewRef.current.reload()}
          icon={{
            name: 'reload-outline',
            type: 'ionicon',
            size: 18,
            color: 'white',
          }}
          iconLeft
          />
          </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#333'
    }  
});