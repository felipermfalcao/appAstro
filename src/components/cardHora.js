import React, {useState, memo} from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import { Icon, Button, Divider, Card } from '@rneui/themed';

function CardHora ({data}){

    let timestamp = data.dt;
    let date = new Date(timestamp * 1000);
    //date.setUTCHours(date.getUTCHours() - 3);
    let hora = date.toLocaleString("pt-BR", {
      hour: "2-digit"
    });

    let date2 = new Date(timestamp * 1000);
    //date2.setUTCHours(date2.getUTCHours() - 3);
    let dia = date2.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return(
        <Card containerStyle={{width: 110, borderRadius: 10, marginBottom: 0, backgroundColor: '#171717', borderColor: '#333', marginLeft: 2, marginRight: 2}}>
            <Card.Title style={{color: '#fff'}}>{hora}:00</Card.Title>
            <Text style={{color: '#fff', fontSize: 12, textAlign: 'center', marginTop: -15}}>{dia}</Text>
            <Card.Divider style={{paddingTop: 5, marginBottom: -2}}/>
            
            <View style={{flexDirection: 'row'}}>
            <Image style={{height: 30, width: 30, marginTop: 2}}
                source={{uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingTop: 4}}>{data.temp.toFixed(0)}<Text style={{fontSize: 10}}>º</Text></Text>
            </View>

            <Text style={{textTransform: 'uppercase', fontSize: 12, textAlign: 'center',
                          paddingBottom: 15, fontWeight: 'bold'}}>
                {data.weather[0].description}
            </Text>

            <View style={{flexDirection: 'row'}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='thermometer'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginTop: -5}}>{data.feels_like.toFixed(0)}<Text style={{fontSize: 10}}>º</Text></Text>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 6}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='cloud-rain'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: -5}}>{((data.pop) * 100).toFixed(0)}<Text style={{fontSize: 15}}>%</Text></Text>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 6}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='cloud'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 0}}>{data.clouds}<Text style={{fontSize: 10}}>%</Text></Text>
            </View>
        </Card>
    );
}

export default memo(CardHora);