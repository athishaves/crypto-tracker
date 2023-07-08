import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {globalStyle} from '../utils/constants';
import {useRoot} from '../core/RootProvider';
import {decimalFormat, getPriceChange} from '../utils/helper';

export default function CryptoCard(props) {
  const {
    state: {currencyDisplay},
    reducer,
  } = useRoot();
  const {item} = props;
  const imageSize = 72;
  const horizontalPadding = 10;

  const prices = item.prices.day;
  const lastPrice = prices[prices.length - 1];
  const firstPrice = prices[0];

  return (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 22,
      }}>
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
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          marginHorizontal: 12,
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
            fontSize: 20,
            color: '#9DA3B7',
          }}>
          {item.coinName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: '#17171A',
          }}>{`${currencyDisplay}${lastPrice}`}</Text>
        <Text
          style={{
            marginTop: 4,
            fontWeight: 400,
            fontSize: 20,
            color: '#9DA3B7',
          }}>{`1.00 ${item.coinShortName}`}</Text>
      </View>
    </View>
  );
}
