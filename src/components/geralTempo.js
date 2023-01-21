import React, {useContext, useEffect, useState, memo} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, FlatList, Dimensions, ActivityIndicator  } from 'react-native';
import { Icon, Button, Divider, Card, Input } from '@rneui/themed';

import BotaoAlerta from './btnAlerta';

function GeralTempo (props){
  
    return(
    <View>
    <Text style={styles.horario}>{props.horarioBrasil}</Text>

    <Text style={styles.descricaoCond}>{props.data.current.weather[0].description}</Text>

    <View style={styles.topo}>

    <View style={{flex: 2}}>
      <Image style={styles.iconPrincipal}
      source={{uri: `https://openweathermap.org/img/wn/${props.data.current.weather[0].icon}@4x.png`}}
      />
    </View>

    <View style={{flex: 2}}>
      <Text style={styles.graus}>{props.data.current.temp.toFixed(0)}º </Text>
    </View>
    </View>

    <View style={{flex: 1, backgroundColor: '#666'}}>
      {props.data.alerts ? <BotaoAlerta data={props.data.alerts}/> : ''}    
    </View>

    <Divider width={1} color={'#666'} insetType="middle" inset={true} />  


    <View style={{flex: 1, flexDirection: 'row', padding: 30, justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          name='sunrise'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{props.nascerSol}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='sunset'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{props.porSol}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='thermometer'
          type='feather'
          color='#fff'
          onPress={props.setModalVisible}
        />
        <Text style={styles.infos}>{props.data.current.feels_like}</Text>
      </View>
    </View>

    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 30, paddingRight: 30, justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          name='droplet'
          type='feather'
          color='#fff'
          onPress={props.setHumidadeModal}
        />
        <Text style={styles.infos}>{props.data.current.humidity}%</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='cloud'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{props.data.current.clouds}%</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='sun'
          type='feather'
          color='#fff'
          onPress={props.setUviModal}
        />
        <Text style={styles.infos}>{props.data.current.uvi}</Text>
      </View>
    </View>


    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 30, paddingRight: 30, paddingTop: 30, justifyContent: 'space-between'}}>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='wind'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{props.data.current.wind_speed.toFixed(0)}m/s</Text>
      </View>      

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='wind'
          type='feather'
          color='#fff'
          onPress={props.setModalVisible}
        />
        <Text style={styles.infos}>{props.data.current.wind_gust ? props.data.current.wind_gust : '0'}m/s</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='arrow-up-right'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{props.data.current.wind_deg}º</Text>
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
        <Text style={styles.infos}>{props.data.current.rain ? props.data.current.rain['1h'] : '0'}mm</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Icon
          name='cloud-snow'
          type='feather'
          color='#fff'
        />
        <Text style={styles.infos}>{props.data.current.snow ? props.data.current.snow['1h'] : '0'}mm</Text>
      </View> 

    </View>
    </View>
        
    );
}

export default memo(GeralTempo);

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