import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Loading = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size='large' />
            <Text style={{textAlign: 'center'}}>Carregando...</Text>
        </View>
    );
};

export default Loading;