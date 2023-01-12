import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Button, Input, Icon } from '@rneui/themed';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../../context/auth';

export default function TelaLogin() {
  const {Login, loadingAuth} = useContext(AuthContext);

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  function FazerLogin(){
    Login(nomeUsuario, senha);
  }
  
 return (
  <View style={styles.container}>

    <Animatable.Image
      animation='zoomInDown'
      easing="ease-in-out"
      style={styles.logo} source={require('../../img/logo-branca.png')}
    />

    <Animatable.View
      animation='bounceInLeft'
      delay={500}
      easing="ease-in-out"
      duration={1500}
      style={{width: '100%'}}
      >        
    <Input
      style={styles.input}
      placeholder='Usuário'
      value={nomeUsuario}
      onChangeText={setNomeUsuario}
      leftIcon={{ type: 'ionicon', name: 'person-outline', color: '#fff' }}
    />
    </Animatable.View>

    <Animatable.View
      animation='bounceInRight'
      delay={500}
      easing="ease-in-out"
      duration={1500}
      style={{width: '100%'}}
      >
      <Input
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color: '#fff' }}
      />
    </Animatable.View>

     <Animatable.View
      animation='fadeIn'
      delay={1500}
      easing="ease-in-out"
    >
      <Button
        loading={loadingAuth}
        title="Entrar"
        onPress={() => FazerLogin()}
        icon={{
          name: 'arrow-forward-circle-outline',
          type: 'ionicon',
          size: 18,
          color: 'white',
        }}
        iconRight
      />
    </Animatable.View>

    <View style={styles.copy}>
      <Text>© Falcão Design {}</Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingTop: 50
  },
  input:{
    color:'#fff'
  },
  copy:{
      width: '100%',
      height: 50,
      //backgroundColor: '#EE5407',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
  },
  logo:{
    width: 150,
    resizeMode: 'contain'
  }
})
