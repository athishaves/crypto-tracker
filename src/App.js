import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootProvider} from './core/RootProvider';
import NavigationScreens from './navigation';

export default function App() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   getTopCryptos().then(response => {
  //     setData(response.Data.map(item => getCryptoImage(item)));
  //   });
  // }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <RootProvider>
        <NavigationContainer>
          <NavigationScreens />
        </NavigationContainer>
      </RootProvider>
    </SafeAreaView>
  );
}
