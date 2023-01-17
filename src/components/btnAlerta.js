import React from 'react';
import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, ScrollView, Image, Modal, FlatList  } from 'react-native';

function BotaoAlerta (props){
    return(
        <View>
        <Button
            title="ALERTA!"
            buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
            containerStyle={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                marginTop: -30
            }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            icon={{
                name: 'alert-triangle',
                type: 'feather',
                size: 18,
                color: 'white',
            }}
            iconLeft
        />
        <View>
            <Text style={{fontSize: 20, color:'#fff', paddingLeft: 30, paddingRight: 30, paddingBottom: 10}}>{props.data[0].sender_name}</Text>
            <Text style={{fontSize: 20, color:'#fff', paddingLeft: 30, paddingRight: 30, fontWeight: 'bold'}}>{props.data[0].event}</Text>
            <Text style={{fontSize: 15, color:'#fff', paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 20}}>{props.data[0].description}</Text>
        </View>
        </View>
);
}

export default BotaoAlerta;