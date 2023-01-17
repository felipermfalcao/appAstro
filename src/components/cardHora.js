import React, {useState} from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import { Icon, Button, Divider, Card } from '@rneui/themed';
import moment from 'moment/min/moment-with-locales';

function CardHora ({data}){

    const unixHora = data.dt;
    const hora = moment.unix(unixHora).utcOffset(-3).format('HH:mm');
    const dia = moment.unix(unixHora).locale('pt-br').format('L');

    return(
        <Card containerStyle={{width: 110, borderRadius: 10, marginBottom: 0, backgroundColor: '#171717', borderColor: '#333', marginLeft: 2, marginRight: 2}}>
            <Card.Title style={{color: '#fff'}}>{hora}</Card.Title>
            <Text style={{color: '#fff', fontSize: 12, textAlign: 'center', marginTop: -15}}>{dia}</Text>
            <Card.Divider style={{paddingTop: 5, marginBottom: -2}}/>
            
            <View style={{flexDirection: 'row'}}>
            <Image style={{height: 40, width: 40, marginTop: 2}}
                source={{uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'center', fontSize: 22, fontWeight: 'bold', paddingTop: 4}}>{data.temp.toFixed(0)}º</Text>
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
            <Text style={{flex: 2, color: '#fff', textAlign: 'right', fontSize: 22, fontWeight: 'bold', marginTop: -5}}>{data.feels_like.toFixed(0)}º</Text>
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

export default CardHora;