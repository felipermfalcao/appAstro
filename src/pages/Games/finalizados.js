import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, 
         FlatList, Modal, Pressable } from 'react-native';
import { Icon, Button, Divider } from '@rneui/themed';
import axios from 'axios';


import { AuthContext } from '../../context/auth';
import ModalGames from './modal';

export default function Finalizados() {
  const {dadosUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(true);
  const [games, setGames] = useState([]);
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

  function loadGames (){

    setLoadingBtn(true);

    axios.get('https://felipefalcao.com.br/appAstro/games/')
      .then(response => {
        setGames(response.data);
        //console.log(games[0].nome);
        setLoading(false);
        setLoadingBtn(false);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  useEffect(() => {
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
    <Text style={{fontSize: 20, textAlign: 'center', paddingTop: 5, paddingBottom:20, color: '#fff'}}>Finalizados</Text>
    <Button
              loading={loadingBtn}
              buttonStyle={{ backgroundColor: '#2089DC', borderRadius: 10}}
              onPress={() => loadGames()}
              icon={{
                name: 'refresh-outline',
                type: 'ionicon',
                size: 22,
                color: 'white',
              }}
              iconLeft
      />

    <FlatList
      data={games}
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
            <Image source={{uri: item.imagem}} style={{width: '100%', height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
            <Text style={{color: '#fff', fontSize: 18, paddingLeft: 10, fontWeight: 'bold', paddingTop:5, paddingBottom: 5, paddingRight: 5}}>{item.nome}</Text>
            <Text style={{fontSize: 13, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, color: '#fff'}}>Lançamento: {formatDate(item.dataLancamento)}</Text>
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

