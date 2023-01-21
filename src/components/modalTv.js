import React, {useState, memo} from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator  } from 'react-native';
import { Icon, Button, Divider, Card } from '@rneui/themed';

function ModalTv ({data, loadingFilmes}){

    let date = new Date(data.release_date);
    let novaData = date.toLocaleDateString("pt-BR",
    {year: 'numeric',
    month: '2-digit',
    day: '2-digit'
    });

    if(loadingFilmes == true){
        return(
            <View style={{flex: 1, backgroundColor: '#333', justifyContent: 'center', paddingTop: 100}}>
            <ActivityIndicator size="large" />
            <Text style={{textAlign: 'center'}}>Carregando dados</Text>
            </View>
          );
    }
    else
    {
    return(

        <View>
            <View style={{flexDirection: 'row'}}>

            <Image style={{width: '30%', height: 185, resizeMode: 'contain'}}
            source={{
                uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`
            }}
            />

            <Image style={{width: '70%', height: 185, resizeMode: 'contain'}}
            source={{
                uri: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
              }}
            />
            
            </View>
            
            <View style={{paddingLeft: 20}}>
                <Text style={{fontSize: 22, fontWeight: 'bold', paddingTop: 10}}>
                    {data.title}
                </Text>
                <Text style={{fontSize: 15}}>
                    {data.original_title}
                </Text>
                <Text style={{fontSize: 15}}>
                    {novaData}
                </Text>
                <Text style={{fontSize: 16, marginTop: 10, paddingRight: 20, textAlign: 'justify'}}>
                    {data.overview}
                </Text>
            </View>

            <Divider width={1} color={'#666'} insetType="middle" inset={true} style={{paddingTop: 20, paddingBottom: 20}} />

        </View>
        
        
    );
}
}

export default memo(ModalTv);