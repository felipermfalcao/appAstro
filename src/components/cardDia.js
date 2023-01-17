import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import { Icon, Button, Divider, Card } from '@rneui/themed';
import moment from 'moment/min/moment-with-locales';

function CardDia ({data}){
    const [lua, setLua] = useState('');
    const [luaImg, setLuaImg] = useState('');

    const unixHora = data.dt;
    const dia = moment.unix(unixHora).locale('pt-br').format('L');

    useEffect (()=>{

        const faseLua = data.moon_phase;
    
    if(faseLua == 0 || faseLua == 1)
    {
        setLua('Lua nova');
        setLuaImg(require('../../src/img/lua/luaNova.png'));
    }
    else if (faseLua > 0 && faseLua < 0.25)
    {
        setLua('Lua crescente');
        setLuaImg(require('../../src/img/lua/luaCrescente.png'));
    }
    else if (faseLua == 0.25)
    {
        setLua('Lua quarto crescente');
        setLuaImg(require('../../src/img/lua/luaQuatoCrescente.png'));
    }
    else if (faseLua > 0.25 && faseLua < 0.50)
    {
        setLua('Lua crescente gibosa');
        setLuaImg(require('../../src/img/lua/luaCrescenteGibosa.png'));
    }
    else if (faseLua == 0.50)
    {
        setLua('Lua cheia');
        setLuaImg(require('../../src/img/lua/luaCheia.png'));
    }
    else if (faseLua > 0.50 && faseLua < 0.75)
    {
        setLua('Lua minguante gibosa');
        setLuaImg(require('../../src/img/lua/luaMinguanteGibosa.png'));
    }
    else if (faseLua == 0.75)
    {
        setLua('Lua quarto minguante');
        setLuaImg(require('../../src/img/lua/luaQuartoMinguante.png'));
    }
    else if (faseLua > 0.75 && faseLua < 1)
    {
        setLua('Lua minguante');
        setLuaImg(require('../../src/img/lua/luaMinguante.png'));
    }


    },[]);
    
    return(
        <Card containerStyle={{width: 200, borderRadius: 10, marginBottom: 20,
                               backgroundColor: '#171717', borderColor: '#333',
                               marginLeft: 2, marginRight: 2}}>
            <Card.Title style={{color: '#fff'}}>{dia}</Card.Title>
            <Card.Divider style={{paddingTop: 0, marginBottom: -2}}/>
            
            <View style={{flexDirection: 'row'}}>
            <Image style={{height: 80, width: 80, marginTop: 2}}
                source={{uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'center', fontSize: 50, fontWeight: 'bold', paddingTop: 4}}>{data.temp.day.toFixed(0)}º</Text>
            </View>

            <Text style={{textTransform: 'uppercase', fontSize: 15, textAlign: 'center',
                          paddingBottom: 15, fontWeight: 'bold', marginTop: -10}}>
                {data.weather[0].description}
            </Text>

            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{flex: 2, flexDirection: 'row'}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='arrow-up'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'left', fontSize: 22, fontWeight: 'bold', marginTop: -5, marginLeft: -5}}>{data.temp.max.toFixed(0)}º</Text>
            </View>

            <View style={{flex: 2, flexDirection: 'row'}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='arrow-down'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'left', fontSize: 22, fontWeight: 'bold', marginTop: -5, marginLeft: -5}}>{data.temp.min.toFixed(0)}º</Text>
            </View>
            </View>

            


            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', paddingTop: 10}}>
            <View style={{flex: 2, flexDirection: 'row'}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='cloud'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginTop: -5, marginLeft: -5}}>{data.clouds}<Text style={{fontSize: 10}}>%</Text></Text>
            </View>

            <View style={{flex: 2, flexDirection: 'row'}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='cloud-rain'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginTop: -5, marginLeft: -5}}>{((data.pop) * 100).toFixed(0)}<Text style={{fontSize: 10}}>%</Text></Text>
            </View>
            </View>




            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', paddingTop: 10}}>
            <View style={{flex: 2, flexDirection: 'row'}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='cloud-rain'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginTop: -5, marginLeft: -5}}>{data.rain ? data.rain.toFixed(0) : '0'}<Text style={{fontSize: 10}}>mm</Text></Text>
            </View>

            <View style={{flex: 2, flexDirection: 'row'}}>
            <Icon
                containerStyle={{flex: 2, alignItems: 'center'}}
                name='cloud-snow'
                type='feather'
                color='#fff'
                size={20}
            />
            <Text style={{flex: 2, color: '#fff', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginTop: -5, marginLeft: -5}}>{data.snow ? data.snow.toFixed(0) : '0'}<Text style={{fontSize: 10}}>mm</Text></Text>
            </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>

            <Image
                style={{width: 50, height: 50, marginTop: 10}}
                source={luaImg}
            />

            <Text style={{fontWeight: 'bold', fontSize: 15, alignSelf: 'center',
                        paddingLeft: 5, width: 150}}>{lua}</Text>
            </View>
        </Card>
    );
}

export default CardDia;