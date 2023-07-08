import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {globalStyle} from '../utils/constants';
import {Image} from 'react-native-animatable';
import {useRoot} from '../core/RootProvider';
import {LineChart} from './LineChart';
import {decimalFormat, getPriceChange} from '../utils/helper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function CryptoListItem(props) {
  const {
    state: {currencyDisplay},
    reducer,
  } = useRoot();
  const {item} = props;
  const imageSize = 56;
  const horizontalPadding = 10;

  const dayPrice = item.prices.day;
  const lastPrice = dayPrice[dayPrice.length - 1];
  const firstPrice = dayPrice[0];

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        reducer({
          type: 'setCurrentCrypto',
          item: item,
        });
        props.navigation.navigate('Portfolio');
      }}
      style={[
        globalStyle.container,
        {
          flexDirection: 'row',
          marginHorizontal: 16,
          marginVertical: 12,
          justifyContent: 'space-between',
        },
      ]}>
      <View
        style={{
          shadowColor: '#9DA3B7',
          shadowOpacity: 0.75,
          shadowOffset: {width: 0, height: 6},
        }}>
        <Image
          source={{uri: item.coinImageUrl}}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 3,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          width: '20%',
          marginHorizontal: horizontalPadding,
        }}>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: '#17171A',
          }}>
          {item.coinShortName}
        </Text>
        <Text
          style={{
            marginTop: 4,
            fontWeight: 400,
            fontSize: 16,
            color: '#9DA3B7',
          }}>
          {`${getPriceChange(lastPrice, firstPrice)}%`}
        </Text>
      </View>
      <View
        style={{
          width: 120,
          marginRight: horizontalPadding,
        }}>
        <LineChart prices={item.prices.day} cryptoColor={item.cryptoColor} />
      </View>
      <View
        style={{
          flexDirection: 'column',
          width: '28%',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: '#17171A',
          }}>
          {`${currencyDisplay}${lastPrice}`}
        </Text>
        <Text
          style={{
            marginTop: 4,
            fontWeight: 400,
            fontSize: 16,
            color: '#9DA3B7',
          }}>
          {`${decimalFormat(firstPrice - lastPrice, 2, true)} ${
            item.coinShortName
          }`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
