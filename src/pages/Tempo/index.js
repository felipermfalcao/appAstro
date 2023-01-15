import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal  } from 'react-native';
import { Icon, Button, Divider } from '@rneui/themed';
import axios from 'axios';
import moment from 'moment';
import { WebView } from 'react-native-webview';

import { AuthContext } from '../../context/auth';

//import { TabItem } from '@rneui/base/dist/Tab/Tab.Item';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [uviModal, setUviModal] = useState(false);
  const [humidadeModal, setHumidadeModal] = useState(false);
  const {dadosUser} = useContext(AuthContext);
  const [tempo, setTempo] = useState([]);


  useEffect(() => {

    async function loadTempo (){

      const formData = new FormData();
      await formData.append('token', dadosUser.token);

      await axios.post('https://felipefalcao.com.br/appAstro/tempo/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        //console.log(response.data);
        setTempo(response.data);
      }).catch(error => {
        console.log(error);
      });
      
    }

    loadTempo();

  }, [])

  const unixTimestamp = tempo.current.dt;
  const horarioBrasil = moment.unix(unixTimestamp).utcOffset(-3).format('HH:mm');

  const unixTimestamp2 = tempo.current.sunrise;
  const nascerSol = moment.unix(unixTimestamp2).utcOffset(-3).format('HH:mm');

  const unixTimestamp3 = tempo.current.sunset;
  const porSol = moment.unix(unixTimestamp3).utcOffset(-3).format('HH:mm');

 return (
        
  <ScrollView style={styles.container}>

    
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
    <View style={{backgroundColor: '#999', width: '100%', height: 100}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <Text style={{flex: 2, fontSize: 20, fontWeight: 'bold', padding: 10}}>Sensação Térmica</Text>
      <Text style={{flex: 2, fontSize: 20, fontWeight: 'bold', padding: 10}}>Rajada de Vento</Text>
      
      <Icon style={{flex: 2, padding: 10}}
        name='close-outline'
        type='ionicon'
        color='#fff'
        onPress={() => {setModalVisible(false)}}
        />

      </View>
    </View>
  </View>
</Modal>

<Modal
  animationType="slide"
  transparent={true}
  visible={humidadeModal}
  onRequestClose={() => {
    setHumidadeModal(false);
  }}
>
  <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
    <View style={{backgroundColor: '#999', width: '100%', height: 50}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <Text style={{flex: 2, fontSize: 20, fontWeight: 'bold', padding: 10}}>Humidade</Text>
      
      <Icon style={{flex: 2, padding: 10}}
        name='close-outline'
        type='ionicon'
        color='#fff'
        onPress={() => {setHumidadeModal(false)}}
        />

      </View>
    </View>
  </View>
</Modal>

<Modal
  animationType="slide"
  transparent={true}
  visible={uviModal}
  onRequestClose={() => {
    setUviModal(false);
  }}
>
  <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
    <View style={{backgroundColor: '#999', width: '100%', height: 250}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

      <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>0.0–2.9: Baixo</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>3.0–5.9: Moderado</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>6.0–7.9: Alto</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>8.0–10.9: Muito Alto</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>11.0+: Extremo</Text>
      </View>
      
      <Icon style={{flex: 2, padding: 10}}
        name='close-outline'
        type='ionicon'
        color='#fff'
        onPress={() => {setUviModal(false)}}
        />

      </View>
    </View>
  </View>
</Modal>

<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <Text style={styles.topoEsquerdaEspaco}></Text>
    <Text style={styles.cidade}>{tempo.timezone}</Text>

    <Text style={styles.iconUpdate}>
      <Icon
        name='reload-outline'
        type='ionicon'
        color='#fff'
        />
    </Text>
    </View>
    

    <Text style={styles.horario}>{horarioBrasil}</Text>

    <Text style={styles.descricaoCond}>{tempo.current.weather[0].description}</Text>

    <View style={styles.topo}>

    <View style={{flex: 2}}>
      <Image style={styles.iconPrincipal}
      source={{uri: `https://openweathermap.org/img/wn/${tempo.current.weather[0].icon}@4x.png`}}
      />
    </View>

    <View style={{flex: 2}}>
      <Text style={styles.graus}>{tempo.current.temp.toFixed(0)}º </Text>
    </View>
    </View>

    <Divider width={1} color={'#666'} insetType="middle" inset={true} />  


    <View style={{flex: 1, flexDirection: 'row', padding: 30, justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          name='sunrise'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{nascerSol}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='sunset'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{porSol}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='thermometer'
          type='feather'
          color='#fff'
          onPress={() => setModalVisible(true)}
        />
        <Text style={styles.infos}>{tempo.current.feels_like}</Text>
      </View>
    </View>

    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 30, paddingRight: 30, justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          name='droplet'
          type='feather'
          color='#fff'
          onPress={() => setHumidadeModal(true)}
        />
        <Text style={styles.infos}>{tempo.current.humidity}%</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='cloud'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{tempo.current.clouds}%</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='sun'
          type='feather'
          color='#fff'
          onPress={() => setUviModal(true)}
        />
        <Text style={styles.infos}>{tempo.current.uvi}</Text>
      </View>
    </View>


    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 30, paddingRight: 30, paddingTop: 30, justifyContent: 'space-between'}}>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='wind'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{tempo.current.wind_speed}m/s</Text>
      </View>      

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='wind'
          type='feather'
          color='#fff'
          onPress={() => {setModalVisible(true)}}
        />
        <Text style={styles.infos}>{tempo.current.wind_gust ? tempo.current.wind_gust : '0'}m/s</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='arrow-up-right'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{tempo.current.wind_deg}º</Text>
      </View> 

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
  cidade:{
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue'
  },
  iconUpdate:{
    width: 50,
    paddingRight: 10,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end'
  },
  topoEsquerdaEspaco:{
    width: 50
  },
  horario:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue'
  },
  topo:{
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },
  containerInfo:{
    flexDirection: 'row',
    padding: 30
  },
  graus:{
    flex: 2,
    fontSize: 100,
    paddingTop: 30,
    alignSelf: 'center',
  },
  iconPrincipal:{
    height: 200,
    width: 200
  },
  descricaoCond:{
    textAlign:'center',
    fontSize: 20,
    paddingTop: 20,
    marginBottom: -40,
    textTransform: 'uppercase'
  },
  infos:{
    paddingLeft: 10,
    fontSize: 18
  }
});