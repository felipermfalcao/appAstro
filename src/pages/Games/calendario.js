import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, 
         FlatList, Modal, TextInput } from 'react-native';
import { Icon, Button, Divider } from '@rneui/themed';
import axios from 'axios';


import { AuthContext } from '../../context/auth';

export default function Calendario() {
  const {dadosUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState({});
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [fetchData, setFetchData] = useState(false);

  const platformImages = {
    "pc": require('../../img/pc.png'),
    "nintendo-switch": require('../../img/switch.png'),
    "macos": require('../../img/mac.png'),
    "linux": require('../../img/linux.png'),
    "playstation5": require('../../img/play5.png'),
    "playstation4": require('../../img/play4.png'),
    "xbox-series-x": require('../../img/xboxseries.png'),
    "xbox-one": require('../../img/xbox.png'),
    "xbox-series-s": require('../../img/xboxseries.png'),
    "android": require('../../img/android.png'),
    "ios": require('../../img/ios.png'),
    "xbox360": require('../../img/xbox360.png'),
    "playstation1": require('../../img/play1.png'),
    "playstation2": require('../../img/play2.png'),
    "playstation3": require('../../img/play3.png'),
  };

  const handleYearChange = (value) => {
    setYear(value);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
  };

  const handleSearch = () => {
    setFetchData(true);
    setLoading(true);
  };

  useEffect(() => {
    loadGames();
    setFetchData(false);
  }, [fetchData]);

  useEffect(() => {
    const currentDate = new Date();
    const anoAtual = currentDate.getFullYear();
    const mesAtual = currentDate.getMonth() + 1;
  
    setYear(anoAtual.toString());
    setMonth('0' + mesAtual);
  }, []);

  const loadGames = () => {
    const url = `https://api.rawg.io/api/games?key=7e1f5fc3a28545aab63e6bf18f5ac40e&dates=${year}-${month}-01,${year}-${month}-30`;

    axios
      .get(url)
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function somaMes() {
    const mesAtual = parseInt(month) + 1;
    setMonth('0' + mesAtual);
    setFetchData(true);
    setLoading(true);
  }

  function subtraiMes() {
    const mesAtual = parseInt(month) - 1;
    setMonth('0' + mesAtual);
    setFetchData(true);
    setLoading(true);
  }

  function somaAno() {
    const anoAtual = parseInt(year) + 1;
    setYear(anoAtual);
    setFetchData(true);
    setLoading(true);
  }

  function subtraiAno() {
    const anoAtual = parseInt(year) - 1;
    setYear(anoAtual);
    setFetchData(true);
    setLoading(true);
  }

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
    <Text style={{fontSize: 20, textAlign: 'center', paddingTop: 5, paddingBottom:5, color: '#fff'}}>Calendário de {month} de {year}</Text>

    <View style={{flexDirection: 'row', alignSelf: 'center', paddingBottom: 10}}>
        <View style={{marginLeft: 10, marginRight: 20}}>
            <View>
                <Text style={{color: '#fff'}}>Ano:</Text>
                <TextInput
                style={{borderWidth: 1,
                    borderColor: '#ccc',
                    paddingVertical: 0,
                    paddingHorizontal: 5, color: '#fff'}}
                value={year}
                onChangeText={handleYearChange}
                keyboardType="numeric"
                />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 5}}><Button onPress={subtraiAno} title="-" /></View>
              <View><Button onPress={somaAno} title="+" /></View>              
            </View>
          </View>
          <View style={{marginLeft: 10, marginRight: 20}}>
            <View>
                <Text style={{color: '#fff'}}>Mês:</Text>
                <TextInput
                style={{borderWidth: 1,
                    borderColor: '#ccc',
                    paddingVertical: 0,
                    paddingHorizontal: 5, color: '#fff'}}
                value={month}
                onChangeText={handleMonthChange}
                keyboardType="numeric"
                />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 5}}><Button onPress={subtraiMes} title="-" /></View>
              <View><Button onPress={somaMes} title="+" /></View>              
            </View>
          </View>
        <View style={{marginTop: 20}}>
            <Button onPress={handleSearch} title="Buscar" />
        </View>
    </View>

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
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 5}}>
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
        )
    }}    
    >
    </FlatList>
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

