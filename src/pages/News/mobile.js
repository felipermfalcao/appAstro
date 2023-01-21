import React, {useContext, useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking  } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { WebView } from 'react-native-webview';

import Loading from '../../components/loadingGeral';

export default function Mobile (){
  const [loading, setLoading] = useState(true);
  const webViewRef2 = useRef(null);


    return(
        <View style={styles.container}>

        {loading && <Loading />}

        <WebView
        ref={webViewRef2}
          source={{ uri: 'https://felipefalcao.com.br/astro20/news?site=pocket'}}
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
          onPress={() => webViewRef2.current.goBack()}
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
          onPress={() => webViewRef2.current.reload()}
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