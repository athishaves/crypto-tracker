import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  getCryptoPrice,
  getOHLCVDay,
  getOHLCVHour,
  getOHLCVMinute,
  getTopCryptos,
} from '../services/cryptoService';
import {useRoot} from '../core/RootProvider';
import {CustomIcon, getCryptoImage, getProminentColor} from '../utils/helper';

import SS from 'react-native-splash-screen';
import {useNavigation} from '@react-navigation/native';

export default function SplashScreen() {
  const {
    state: {filteredCryptos, currency},
    reducer,
  } = useRoot();

  const [gotData, setGotData] = useState(false);
  const [timeOver, setTimeOver] = useState(false);

  const navigation = useNavigation();

  const cryptoLimit = 10;
  const cryptoDataLimit = 25;

  function getPricesFromResponse(response) {
    return response.Data.Data.map(d => d.close);
  }

  console.log('Rendering splash screen....');

  useEffect(() => {
    getTopCryptos((limit = cryptoLimit)).then(topCryptos => {
      let data = topCryptos.Data.map((item, index) => {
        item = item.CoinInfo;
        return {
          id: index,
          coinName: item.FullName,
          coinNameLower: item.FullName.toLowerCase(),
          coinShortName: item.Name,
          coinShortNameLower: item.Name.toLowerCase(),
          coinImageUrl: getCryptoImage(item.ImageUrl),
          isVisible: true,
        };
      });

      let respCount = 0;

      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        Promise.all([
          getOHLCVDay(item.coinShortName, currency, cryptoDataLimit),
          getOHLCVHour(item.coinShortName, currency, cryptoDataLimit),
          getOHLCVMinute(item.coinShortName, currency, cryptoDataLimit),
          getProminentColor(item.coinImageUrl),
        ])
          .then(response => {
            data[index].prices = {};
            data[index].prices.day = getPricesFromResponse(response[0]);
            data[index].prices.hour = getPricesFromResponse(response[1]);
            data[index].prices.minute = getPricesFromResponse(response[2]);
            data[index].cryptoColor = response[3];

            respCount++;
            if (respCount === cryptoLimit) {
              reducer({
                type: 'setAllCryptos',
                item: data,
              });

              setGotData(true);
            }
          })
          .catch(error => console.log(error));
      }
    });

    const interval = setTimeout(() => {
      setTimeOver(true);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gotData === true && timeOver === true) {
      navigation.navigate('BottomTabNavigator');
    }
  }, [gotData, timeOver, navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 32, fontWeight: 800}}>Splash Screen</Text>
    </View>
  );
}
