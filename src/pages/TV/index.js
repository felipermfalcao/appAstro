import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, 
         FlatList, Modal } from 'react-native';
import { Icon, Button, Divider } from '@rneui/themed';
import axios from 'axios';


import { AuthContext } from '../../context/auth';
import CanaisFilmes from '../../components/canaisFilmes';
import ModalTV from '../../components/modalTv';

export default function TV() {
  const {dadosUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loadingFilmes, setLoadingFilmes] = useState(false);
  const [programming, setProgramming] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({});
  const [nomeFilme, setNomeFilme] = useState('Avatar');

  useEffect(() => {
    const fetchData = async () => {
        const data = await CanaisFilmes();
        setProgramming(data);
        setLoading(false);
    }
    fetchData();
}, []);

useEffect(() => {

  async function loadFilme (){

    const formData = new FormData();
    formData.append('token', dadosUser.token);
    formData.append('filme', nomeFilme);

    await axios.post('https://felipefalcao.com.br/appAstro/tv/', formData, {
      headers: { 'Content-Type': 'multipart/form-data'}
    }).then(response => {
      //console.log(response.data);
      //console.log(nomeFilme);
      setData(response.data);
      setLoadingFilmes(false);

    setLoading(false);
    }).catch(error => {
      console.log(error);
    });
    
  }

  loadFilme();

}, [nomeFilme]);

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

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <View style={{backgroundColor: '#333', width: '100%', height: '100%'}}>

        <Icon style={{backgroundColor: '#E52246'}}
            name='chevron-down-outline'
            type='ionicon'
            color='#fff'
            size={50}
            onPress={() => {setModalVisible(false); setLoadingFilmes(true)}}
          />

        <FlatList 
          showsHorizontalScrollIndicator={false}
          data={data.results}
          renderItem={({item}) => <ModalTV data={item} loadingFilmes={loadingFilmes} />}
          />
        </View>

      </View>
    </Modal>

    <FlatList
        data={programming}
        renderItem={({ item }) => (
            <View style={{flex: 1, paddingLeft: 35, paddingRight: 20}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.h2}</Text>

                <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.h3[0]}</Text>
                <Button
                  buttonStyle={{ backgroundColor: '#171717', borderRadius: 3, padding: 0, marginLeft: 10}}
                  icon={{
                    name: 'videocam-outline',
                    type: 'ionicon',
                    size: 18,
                    color: 'white',
                  }}
                  onPress={() => {setModalVisible(true); setNomeFilme(item.h3[0])}}
                  iconLeft
                  />
                </View>

                <View style={{flexDirection: 'row'}}>
                <Text style={styles.filmes}>{item.h3[1]}</Text>
                <Button
                  buttonStyle={{ backgroundColor: '#171717', borderRadius: 3, padding: 0, marginLeft: 10}}
                  icon={{
                    name: 'videocam-outline',
                    type: 'ionicon',
                    size: 18,
                    color: 'white',
                  }}
                  onPress={() => {setModalVisible(true); setNomeFilme(item.h3[1])}}
                  iconLeft
                  />
                </View>

                <View style={{flexDirection: 'row'}}>
                <Text style={styles.filmes}>{item.h3[2]}</Text>
                <Button
                  buttonStyle={{ backgroundColor: '#171717', borderRadius: 3, padding: 0, marginLeft: 10}}
                  icon={{
                    name: 'videocam-outline',
                    type: 'ionicon',
                    size: 18,
                    color: 'white',
                  }}
                  onPress={() => {setModalVisible(true); setNomeFilme(item.h3[2])}}
                  iconLeft
                  />
                </View>


                <Divider width={1} color={'#666'} insetType="middle" inset={true} style={{marginTop: 10, marginBottom: 10}} />
            </View>
        )}
    />
    
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

