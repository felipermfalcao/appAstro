import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, FlatList, Dimensions, ActivityIndicator  } from 'react-native';
import { Icon, Button, Divider, Card, Input } from '@rneui/themed';
import axios from 'axios';
import moment from 'moment';
import { WebView } from 'react-native-webview';
import {
  LineChart,
} from "react-native-chart-kit";

import { AuthContext } from '../../context/auth';

import CardHora from '../../components/cardHora';
import CardDia from '../../components/cardDia';
import BotaoAlerta from '../../components/btnAlerta';

//import { TabItem } from '@rneui/base/dist/Tab/Tab.Item';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [uviModal, setUviModal] = useState(false);
  const [humidadeModal, setHumidadeModal] = useState(false);
  const {dadosUser} = useContext(AuthContext);
  const [tempo, setTempo] = useState({});
  const [atualiza, setAtualiza] = useState(1);
  const [atualizaLoading, setAtualizaLoading] = useState(false);
  const [tempHora, setTempHora] = useState([]);
  const [tempDia, setTempDia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState('Fortaleza,CE,Brasil');
  //const [labelTempHora, setLabelTempHora] = useState(['1', '2', '3']);

  const screenWidth = Dimensions.get('window').width;
  
  useEffect(() => {

    async function loadTempo (){

      const formData = new FormData();
      formData.append('token', dadosUser.token);
      formData.append('local', local);

      await axios.post('https://felipefalcao.com.br/appAstro/tempo/', formData, {
        headers: { 'Content-Type': 'multipart/form-data'}
      }).then(response => {
        //console.log(response.data);
        setTempo(response.data);
        setAtualizaLoading(false);

        const tempArray = response.data.hourly.map(hour => hour.temp.toFixed(0));
        const tempArray2 = response.data.daily.map(day => day.temp.day.toFixed(0));
        //console.log(tempArray);
        setTempHora(tempArray);
        setTempDia(tempArray2);

      //   const labelTempArray = response.data.hourly.map(hour => {
      //     const horarioDiaGraf = new Date(hour.dt);
      //     const formatted = moment.unix(horarioDiaGraf).utcOffset(-3).format('HH');
      //     return formatted
      // });
      //   const tempString = '' + labelTempArray.map(temp => `${temp}`).join(', ') + ''
      //   console.log(tempString);
      //   setLabelTempHora(tempString);
      setLoading(false);
      }).catch(error => {
        console.log(error);
      });
      
    }

    loadTempo();

  }, [atualiza]);


if (loading == true){
  return(
    <View style={{flex: 1, backgroundColor: '#333', justifyContent: 'center'}}>
    <ActivityIndicator size="large" />
    <Text style={{textAlign: 'center'}}>Carregando dados</Text>
    </View>
  );
}
else{
  function atualizar (){
    setAtualiza(atualiza + 1);
    setAtualizaLoading(true);
    console.log('teste');
  }

  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'],
    datasets: [
      {
        data: tempHora,
        strokeWidth: 2, // optional
        bezierCurve : true
      }
    ]
  }
  
  const chartConfig = {
    backgroundColor: '#333',
    backgroundGradientFrom: '#003265',
    backgroundGradientTo: '#082f37',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726'
    }
  }

  const dataDia = {
    labels: ['+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8'],
    datasets: [
      {
        data: tempDia,
        strokeWidth: 2, // optional
        bezierCurve : true
      }
    ]
  }
  
  const chartConfigDia = {
    backgroundColor: '#333',
    backgroundGradientFrom: '#003265',
    backgroundGradientTo: '#082f37',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726'
    }
  }

  moment.locale('pt-br');

  //console.log(tempHora);

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

<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
    <Input
      containerStyle={{width: '80%'}}
      inputStyle={{color: '#fff'}}
      placeholder='Cidade, Estado, País'
      onChangeText={(text) => setLocal(text)}
      leftIcon={
        <Icon
          name='map-outline'
          size={24}
          type='ionicon'
          color='white'
        />
      }
    />
    <Button
          loading={atualizaLoading}
          buttonStyle={{ backgroundColor: '#2089DC', borderRadius: 10}}
          onPress={() => atualizar()}
          icon={{
            name: 'search-outline',
            type: 'ionicon',
            size: 22,
            color: 'white',
          }}
          iconLeft
    />
</View>

<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <Text style={styles.topoEsquerdaEspaco}></Text>
    <Text style={styles.cidade}>{tempo.timezone}</Text>

    <Text style={styles.iconUpdate}>
    <Button
          loading={atualizaLoading}
          buttonStyle={{ backgroundColor: '#333'}}
          onPress={() => atualizar()}
          icon={{
            name: 'reload-outline',
            type: 'ionicon',
            size: 22,
            color: 'white',
          }}
          iconLeft
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

    <View style={{flex: 1, backgroundColor: '#666'}}>
      {tempo.alerts ? <BotaoAlerta data={tempo.alerts}/> : ''}    
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
        <Text style={styles.infos}>{tempo.current.wind_speed.toFixed(0)}m/s</Text>
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

    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 30, paddingRight: 30, paddingTop: 30,
                  justifyContent: 'space-around'}}>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='cloud-rain'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{tempo.current.rain ? tempo.current.rain['1h'] : '0'}mm</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='cloud-snow'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{tempo.current.snow ? tempo.current.snow['1h'] : '0'}mm</Text>
      </View> 

    </View>

    <Divider width={1} color={'#666'} insetType="middle" inset={true} style={{paddingTop: 25}} />

    <View>      
      <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingTop: 20}}>Próximas horas</Text>
      <FlatList 
      showsHorizontalScrollIndicator={false}
      data={tempo.hourly}
      horizontal={true}
      renderItem={({item}) => <CardHora data={item}/>}
      />

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <LineChart
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
      data={data}
      width={1500}
      height={200}
      chartConfig={chartConfig}
      bezier
    />
    </ScrollView>
    </View>

    <View>      
      <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingTop: 20}}>Próximos dias</Text>
      <FlatList 
      showsHorizontalScrollIndicator={false}
      data={tempo.daily}
      horizontal={true}
      renderItem={({item}) => <CardDia data={item}/>}
      />

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <LineChart
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
      data={dataDia}
      width={screenWidth}
      height={200}
      chartConfig={chartConfigDia}
      bezier
    />
    </ScrollView>

      
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
  cidade:{
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue'
  },
  iconUpdate:{
    width: 50,
    marginRight: 15,
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