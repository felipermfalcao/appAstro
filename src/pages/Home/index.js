import React, {useContext} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../context/auth';

export default function Home() {
  const {dadosUser} = useContext(AuthContext);

 return (
  <ScrollView style={styles.container}>
   <View>
    <Text style={{color:'#000'}}>{dadosUser.token}</Text>
   </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#333',
    padding: 10
  }

});