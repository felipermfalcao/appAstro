import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking  } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { WebView } from 'react-native-webview';


import { AuthContext } from '../../context/auth';

import apiApod from '../../services/apiApod';
import { TabItem } from '@rneui/base/dist/Tab/Tab.Item';

export default function Home() {
  const {dadosUser} = useContext(AuthContext);
  const [apod, setApod] = useState([]);
  const [dateApod, setDateApod] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [apodType, setApodType] = useState('');
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {

    async function loadApod (){
      setLoadingData(true);

      const dataParaEnvio = (dateApod.getFullYear() + '-' + (dateApod.getMonth()+1) + '-' + dateApod.getDate());
      //console.log(dataParaEnvio);

      const formData = new FormData();
        formData.append('token', dadosUser.token);
        formData.append('dataEscolhida', dataParaEnvio);      

      await axios.post('https://felipefalcao.com.br/appAstro/nasa/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        //console.log(response.data);
        setApod(response.data);
        setLoadingData(false);
      }).catch(error => {
        console.log(error);
      });
      
    }

    loadApod();
  }, [dateApod])

  if (apod.media_type == 'video')
  {
    const date = moment(apod.date);
  const formattedDate = date.format('DD/MM/YYYY');

  const abrirNavaegador = () => {
    Linking.openURL(apod.url);
  }

 return (
  <ScrollView style={styles.container}>
    
   <View style={styles.apod}>
    <Text style={styles.titleApod}>APOD de {formattedDate}</Text>
    <Text style={styles.titleApod}>{apod.title}</Text>

    <Button
    radius={'sm'}
    containerStyle={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    }}
    loading={loadingData}
    title="Escolher Data"
    onPress={() => setOpen(true)}
    icon={{
      name: 'calendar',
      type: 'ionicon',
      size: 18,
      color: 'white',
    }}
    iconLeft
    />
    <DatePicker
        modal
        mode='date'
        locale='pt-BR'
        open={open}
        date={dateApod}
        onConfirm={(dateApod) => {
          setOpen(false)
          setDateApod(dateApod)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

    <WebView
      source={{ uri: apod.url }}
      style={{ alignSelf: 'stretch', height: 300 }}
    />

  <Button
    radius={'sm'}
    type="solid"
    containerStyle={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    }}
    //loading={loadingAuth}
    title="Abrir vídeo"
    onPress={abrirNavaegador}
    icon={{
      name: 'logo-youtube',
      type: 'ionicon',
      size: 18,
      color: 'white',
    }}
    iconRight
    />

    <Text style={styles.comentarios}>Comentários</Text>
    <Text style={styles.titleExplicacao}>{apod.explanation}</Text>


   </View>
   </ScrollView>
  );
  }

  const date = moment(apod.date);
  const formattedDate = date.format('DD/MM/YYYY');

  const abrirNavaegador = () => {
    Linking.openURL(apod.hdurl);
  }

 return (
  <ScrollView style={styles.container}>
    
   <View style={styles.apod}>
    <Text style={styles.titleApod}>APOD de {formattedDate}</Text>
    <Text style={styles.titleApod}>{apod.title}</Text>

    <Button
    radius={'sm'}
    containerStyle={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    }}
    loading={loadingData}
    title="Escolher Data"
    onPress={() => setOpen(true)}
    icon={{
      name: 'calendar',
      type: 'ionicon',
      size: 18,
      color: 'white',
    }}
    iconLeft
    />
    <DatePicker
        modal
        mode='date'
        locale='pt-BR'
        open={open}
        date={dateApod}
        onConfirm={(dateApod) => {
          setOpen(false)
          setDateApod(dateApod)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

    <Image style={styles.apodImg}
     source={{uri: apod.url}}
     />

  <Button
    radius={'sm'}
    type="solid"
    containerStyle={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    }}
    //loading={loadingData}
    title="Imagem HD"
    onPress={abrirNavaegador}
    icon={{
      name: 'arrow-forward-circle-outline',
      type: 'ionicon',
      size: 18,
      color: 'white',
    }}
    iconRight
    />

    <Text style={styles.comentarios}>Comentários</Text>
    <Text style={styles.titleExplicacao}>{apod.explanation}</Text>


   </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#333',
    paddingTop: 10
  },
  apodImg:{
    height: 300,
    flex: 1,
    width: null,
    resizeMode: 'contain'
  },
  titleApod:{
    fontSize: 20,
    color: '#999',
    textAlign: 'center',
    paddingBottom: 5,
    fontFamily: 'Helvetica Neue',
  },
  titleDate:{
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    paddingBottom: 10
  },
  titleExplicacao:{
    paddingLeft:20,
    paddingRight: 20,
    paddingBottom: 20,
    fontSize: 18
  },
  comentarios:{
    fontSize: 30,
    fontStyle: 'italic',
    paddingLeft:20,
    paddingTop: 20,
    fontWeight: 'bold'
    }

});