import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, 
         FlatList, Modal, Pressable } from 'react-native';
import { Icon, Button, Divider } from '@rneui/themed';
import axios from 'axios';


import { AuthContext } from '../../context/auth';
import ModalGames from './modal';

export default function Games1() {
  const {dadosUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

useEffect(() => {

  async function loadGames (){

    axios.get('https://api.rawg.io/api/games?dates=2023-01-01,2023-12-31&ordering=-metacritic&key=7e1f5fc3a28545aab63e6bf18f5ac40e')
      .then(response => {
        setGames(response.data);
        //console.log(games.results[7].name);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
    
  }

  loadGames();

}, []);

const openModal = (game) => {
  setSelectedGame(game);
  setModalVisible(true);
};

const closeModal = () => {
  setSelectedGame(null);
  setModalVisible(false);
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
else
{
 return (
  <View style={styles.container}>
    <Text style={{fontSize: 20, textAlign: 'center', paddingTop: 5, paddingBottom:20, color: '#fff'}}>Melhores do ano</Text>

    <FlatList
      data={games.results}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      renderItem={({item}) => {
        const formatDate = (date) => {
          const parts = date.split('-');
          return `${parts[2]}/${parts[1]}/${parts[0]}`;
        };

        return(
        <Pressable style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 5}} onPress={() => openModal(item)}>
        <View style={{flex: 1}}>
          <View style={{flex: 2, backgroundColor: '#202020', borderRadius: 10}}>
            <Image source={{uri: item.background_image}} style={{width: '100%', height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
            <Text style={{color: '#fff', fontSize: 18, paddingLeft: 10, fontWeight: 'bold', paddingTop:5, paddingBottom: 5, paddingRight: 5}}>{item.name}</Text>
            <View style={{flex: 1, flexDirection: 'row'}}> 
              <View style={{flex: 2, flexDirection: 'row', paddingLeft: 10, paddingBottom: 5}}>
                {item.platforms.map(platform => (
                  <Image key={platform.platform.slug} source={platformImages[platform.platform.slug]} style={{width: 20, height: 20, marginRight: 5}} />
                ))}
              </View>
              <View style={{paddingRight: 7, padding: 0}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#6DC849',  borderColor: '#6DC849', borderStyle: 'solid', borderWidth: 1, padding: 2}}>{item.metacritic}</Text>
              </View>
            </View>
            <Text style={{fontSize: 13, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, color: '#fff'}}>Lançamento: {formatDate(item.released)}</Text>
          </View>
        </View>
        </Pressable>
        )
    }}    
    >
    </FlatList>

    {selectedGame && (
          <Modal visible={modalVisible} animationType="slide" hardwareAccelerated={true}>
            <ModalGames data={selectedGame} setModalVisible={() => setModalVisible(false)}/>
          </Modal>
    )}
  </View>

  );
}

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#333',
    paddingTop: 10
  },
  filmes:
  {
    fontSize: 15
  }

});

