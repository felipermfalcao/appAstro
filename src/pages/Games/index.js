import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, 
         FlatList, Modal } from 'react-native';
import { Icon, Button, Divider } from '@rneui/themed';
import axios from 'axios';


import { AuthContext } from '../../context/auth';
import CanaisFilmes from '../../components/canaisFilmes';
import ModalTV from '../../components/modalTv';

export default function Games() {
  const {dadosUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});


useEffect(() => {

//   async function loadFilme (){

//     const formData = new FormData();
//     formData.append('token', dadosUser.token);
//     formData.append('filme', nomeFilme);

//     await axios.post('https://felipefalcao.com.br/appAstro/tv/', formData, {
//       headers: { 'Content-Type': 'multipart/form-data'}
//     }).then(response => {
//       //console.log(response.data);
//       //console.log(nomeFilme);
//       setData(response.data);
//       setLoadingFilmes(false);

//     setLoading(false);
//     }).catch(error => {
//       console.log(error);
//     });
    
//   }

//   loadFilme();

}, []);

if(loading)
{
  return(
    <View style={{flex: 1, backgroundColor: '#333', justifyContent: 'center'}}>
    <ActivityIndicator size="large" />
    <Text style={{textAlign: 'center'}}>Carregando dados</Text>
    </View>
  );
}
else
{
 return (
  <View style={styles.container}>
    <Text>Teste</Text>    
   </View>
  );
}
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#333',
    paddingTop: 10
  },
  filmes:
  {
    fontSize: 15
  }

});

