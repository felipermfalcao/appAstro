import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Pressable, Linking, ScrollView, FlatList } from 'react-native';
import { Icon, Button, Divider } from '@rneui/themed';
import axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';

export default function ModalGames(props) {
    const [loading, setLoading] = useState(true);
    const [idGame, setIdGame] = useState(props.data);
    const [games, setGames] = useState({});
    const [picGames, setPicGames] = useState({});

useEffect(() => {

    async function loadGames (){
    
        axios.get(`https://api.rawg.io/api/games/${idGame.id}?key=7e1f5fc3a28545aab63e6bf18f5ac40e`)
        .then(response => {
            setGames(response.data);
            //console.log(games.results[7].name);
        })
        .catch(error => {
            console.log(error);
        });

        axios.get(`https://api.rawg.io/api/games/${idGame.id}/screenshots?key=7e1f5fc3a28545aab63e6bf18f5ac40e`)
        .then(response2 => {
            setPicGames(response2.data);
            //console.log(picGames.results[1].image);
            setLoading(false);
        })
        .catch(error2 => {
            console.log(error2);
        });
        
    }      
    loadGames();

    
    }, []);

const platformImages = {
    "pc": require('../../img/pc.png'),
    "nintendo-switch": require('../../img/switch.png'),
    "macos": require('../../img/mac.png'),
    "linux": require('../../img/linux.png'),
    "playstation5": require('../../img/play5.png'),
    "playstation4": require('../../img/play4.png'),
    "playstation1": require('../../img/play1.png'),
    "playstation2": require('../../img/play2.png'),
    "playstation3": require('../../img/play3.png'),
    "xbox-series-x": require('../../img/xboxseries.png'),
    "xbox-one": require('../../img/xbox.png'),
    "xbox360": require('../../img/xbox360.png'),
    "xbox-series-s": require('../../img/xboxseries.png'),
    "android": require('../../img/android.png'),
    "ios": require('../../img/ios.png'),
    };

const copyToClipboard = () => {
    Clipboard.setString(`${games.description}`);
    alert('Texto copiado!');
    }; 
    
const formatDate = (date) => {
    const parts = date.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

if(loading)
{
return(
    <View style={{flex: 1, backgroundColor: '#333', justifyContent: 'center'}}>
    <ActivityIndicator size="large" />
    <Text style={{textAlign: 'center'}}>Carregando dados</Text>
    </View>
);
}
else{
    return (
            <ScrollView style={{flex:1, backgroundColor: '#202020'}}>
                <Button onPress={props.setModalVisible} title="Fechar" />
                <View>
                    <Image source={{uri: games.background_image}} style={{width: '100%', height: 200}} />
                </View>
                <Text style={{fontSize: 13, paddingLeft: 10, paddingTop:10}}>{formatDate(games.released)}</Text>
                
                <View style={{flexDirection: 'row'}}> 
                    <View style={{flex: 2, flexDirection: 'row', paddingLeft: 10, paddingBottom: 5, paddingTop: 7}}>
                        {games.platforms.map(platform => (
                        <Image key={platform.platform.slug} source={platformImages[platform.platform.slug]} style={{width: 30, height: 30, marginRight: 12}} />
                        ))}
                    </View>
                    <View style={{paddingRight: 7, padding: 0}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#6DC849',  borderColor: '#6DC849', borderStyle: 'solid', borderWidth: 1, padding: 2}}>{games.metacritic}</Text>
                    </View>
                </View>

                <Text style={{fontSize: 12, paddingHorizontal: 10}}>Tempo de jogo: {games.playtime} horas</Text>

                <Text style={{fontSize: 25, fontWeight: 'bold', padding: 10}}>{games.name_original}</Text>              
                <Pressable onPress={copyToClipboard}>
                    <Text style={{fontSize: 15, paddingHorizontal: 10}}>{games.description}</Text>
                </Pressable> 

                <Text onPress={() => {
                    Linking.openURL(games.metacritic_url);
                    }} style={{padding: 10, fontWeight: 'bold'}}>Metacritic: {games.metacritic_url}
                </Text> 

                <Text onPress={() => {
                    Linking.openURL(games.website);
                    }} style={{padding: 10, fontWeight: 'bold'}}>Website: {games.website}
                </Text> 

                <Text onPress={() => {
                    Linking.openURL(`https://www.youtube.com/results?search_query=${games.name_original}`);
                    }} style={{padding: 10, fontWeight: 'bold'}}>Youtube: {games.website}
                </Text> 

                <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}>Gênero:</Text>
                    {games.genres.map(developer => (
                    <View key={developer.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{developer.name}</Text>
                    </View>
                    ))}
                </View>

                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}>Desenvolvedores:</Text>
                    {games.developers.map(developer => (
                    <View key={developer.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: developer.image_background }} style={{ width: 50, height: 50, marginRight: 5, marginBottom: 5 }} />
                        <Text>{developer.name}</Text>
                    </View>
                    ))}
                </View>

                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}>Publishers:</Text>
                    {games.publishers.map(developer => (
                    <View key={developer.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: developer.image_background }} style={{ width: 50, height: 50, marginRight: 5, marginBottom: 5 }} />
                        <Text>{developer.name}</Text>
                    </View>
                    ))}
                </View>
                
                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5, paddingTop: 10 }}>Imagens:</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {picGames.results.map((item) => (
                        <View key={item.id} style={{ width: '100%', padding: 5 }}>
                        <Image source={{ uri: item.image }} style={{ width: '100%', height: 200 }} />
                        </View>
                    ))}
                </View>

   
            </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
container:{
flex:1,
justifyContent: 'center',
alignItems: 'center'
}
});

