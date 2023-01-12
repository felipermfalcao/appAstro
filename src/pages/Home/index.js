import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

import { AuthContext } from '../../context/auth';

import apiApod from '../../services/apiApod';
import { TabItem } from '@rneui/base/dist/Tab/Tab.Item';

export default function Home() {
  const {dadosUser} = useContext(AuthContext);
  const [apod, setApod] = useState([]);

  useEffect(() => {

    async function loadApod (){

      const formData = new FormData();
        formData.append('token', dadosUser.token);

      axios.post('https://felipefalcao.com.br/appAstro/nasa/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        //console.log(response.data);
        setApod(response.data)
      }).catch(error => {
        //console.log(error);
      });
      
    }

    loadApod();
  }, [])

  const date = moment(apod.date);
  const formattedDate = date.format('DD/MM/YYYY');

 return (
  <ScrollView style={styles.container}>
   <View style={styles.apod}>
    <Text style={styles.titleApod}>APOD de {formattedDate}</Text>
    <Image style={styles.apodImg}
     source={{uri: apod.url}}
     />
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
  elevation: 2,
  resizeMode: 'contain'
  },
  titleApod:{
    fontSize: 20,
    color: '#999',
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'Helvetica Neue',
  },
  titleDate:{
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    paddingBottom: 10
  }

});