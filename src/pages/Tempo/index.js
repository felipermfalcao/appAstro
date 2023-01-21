import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, FlatList, Dimensions, ActivityIndicator  } from 'react-native';
import { Icon, Button, Divider, Card, Input } from '@rneui/themed';
import axios from 'axios';
import {
  LineChart,
} from "react-native-chart-kit";

import { AuthContext } from '../../context/auth';

import CardHora from '../../components/cardHora';
import CardDia from '../../components/cardDia';
import GeralTempo from '../../components/geralTempo';

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
  const [localTemp, setLocalTemp] = useState('Fortaleza,CE,Brasil');
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
        setLocalTemp(local)

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
else if(tempo.error)
{
  function setAtualizaTeste(){
    setAtualiza(atualiza + 1);
    setAtualizaLoading(true);
  }
  return(
    <View style={{flex: 1, backgroundColor: '#333', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
              onPress={() => setAtualizaTeste()}
              icon={{
                name: 'search-outline',
                type: 'ionicon',
                size: 22,
                color: 'white',
              }}
              iconLeft
        />
      </View>

      <Text style={{color: '#fff', padding: 20, fontSize: 15, textAlign: 'center'}}>{tempo.error}</Text>
    </View>
  );
}
else{
  function atualizar (){
    setAtualiza(atualiza + 1);
    setAtualizaLoading(true);
    //console.log('teste');
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


  //console.log(tempHora);

  let timestamp = tempo.current.dt;
  let date = new Date(timestamp * 1000);
  //date.setUTCHours(date.getUTCHours() - 3);
  let horarioBrasil = date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  let timestamp2 = tempo.current.sunrise;
  let date2 = new Date(timestamp2 * 1000);
  //date2.setUTCHours(date2.getUTCHours() - 3);
  let nascerSol = date2.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  let timestamp3 = tempo.current.sunset;
  let date3 = new Date(timestamp3 * 1000);
  //date3.setUTCHours(date3.getUTCHours() - 3);
  let porSol = date3.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  function mostarModal1(){
    setModalVisible(true);
    console.log("modal");
  }

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
      onEndEditing={e => setLocal(e.nativeEvent.text)}
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
    <Text style={styles.cidade}>{localTemp}</Text>

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

    <Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', marginTop: -10, color: '#999', fontSize: 15, marginBottom: 10}}>{tempo.timezone}</Text>
    <GeralTempo horarioBrasil={horarioBrasil} data={tempo}
    nascerSol={nascerSol} porSol={porSol} setModalVisible={() => setModalVisible(true)}
    setHumidadeModal={() => setHumidadeModal(true)} setUviModal={() => setUviModal(true)}/>   
 

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