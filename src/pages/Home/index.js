import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, ActivityIndicator,
        TouchableOpacity} from 'react-native';
import { Icon, Button } from '@rneui/themed';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import { WebView } from 'react-native-webview';
import Clipboard from '@react-native-clipboard/clipboard';


import { AuthContext } from '../../context/auth';
import Loading from '../../components/loadingGeral';

export default function Home() {
  const {dadosUser} = useContext(AuthContext);
  const [apod, setApod] = useState([]);
  const [dateApod, setDateApod] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [apodType, setApodType] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(true);
  

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
        setLoading(false);
      }).catch(error => {
        console.log(error);
      });
      
    }

    loadApod();
  }, [dateApod])

  if(loading == true)
  {
    return(
    <Loading />
    );
  }
  else
  {

  if (apod.media_type == 'video')
  {
    
    const copyToClipboard = () => {
      Clipboard.setString(`${apod.explanation}`);
      alert('Texto copiado!');
    };

    let date = new Date(apod.date);
    let formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

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
    <TouchableOpacity onPress={copyToClipboard}>
    <Text style={styles.titleExplicacao}>{apod.explanation}</Text>
    </TouchableOpacity>


   </View>
   </ScrollView>
  );
  }

  const copyToClipboard = () => {
    Clipboard.setString(`${apod.explanation}`);
    alert('Texto copiado!');
  };

  let date = new Date(apod.date);
  let formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

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
    <TouchableOpacity onPress={copyToClipboard}>
    <Text style={styles.titleExplicacao}>{apod.explanation}</Text>
    </TouchableOpacity>


   </View>
   </ScrollView>
  );
}
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
    paddingLeft: 20,
    paddingRight: 20,
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

