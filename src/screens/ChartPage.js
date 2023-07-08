import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRoot} from '../core/RootProvider';
import {CustomIcon, decimalFormat, getPriceChange} from '../utils/helper';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import CryptoCard from '../components/CryptoCard';
import MultilineChart from '../components/MultilineChart';

function CurrencyItem({
  curIndex,
  selectedIndex,
  setSelectedIndex,
  cryptoColor,
  text,
}) {
  const {
    state: {allCryptos},
    reducer,
  } = useRoot();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedIndex(curIndex);
        reducer({
          type: 'setCurrentCrypto',
          item: allCryptos[curIndex],
        });
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: `${cryptoColor}`,
          marginHorizontal: 8,
        }}>
        {text}
      </Text>
      {curIndex === selectedIndex ? (
        <View
          style={{
            height: 1,
            backgroundColor: `${cryptoColor}`,
            marginTop: 6,
            marginHorizontal: 8,
          }}
        />
      ) : null}
    </TouchableWithoutFeedback>
  );
}

const timeIntervals = [
  {displayName: '1D', chartName: 'day'},
  {displayName: '1H', chartName: 'hour'},
  {displayName: '1M', chartName: 'minute'},
];

export default function ChartPage(props) {
  const {
    state: {allCryptos, currentCrypto, currencyDisplay, currency},
    reducer,
  } = useRoot();

  const cryptoId = currentCrypto.id;
  const [selectedIndex, setSelectedIndex] = useState(cryptoId);

  const dayPrice = currentCrypto.prices.day;
  const lastPrice = dayPrice[dayPrice.length - 1];
  const firstPrice = dayPrice[0];

  const [chartInterval, setChartInterval] = useState(0);

  const ref = useRef(null);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setSelectedIndex(cryptoId);
    }
  }, [isFocused]);

  useEffect(() => {
    ref.current?.scrollToIndex({animated: true, index: selectedIndex});
  });

  return (
    <View>
      {/* Header */}
      <FlatList
        data={allCryptos}
        ref={ref}
        keyExtractor={item => item.coinShortName}
        initialScrollIndex={cryptoId}
        renderItem={({item, index}) => (
          <CurrencyItem
            cryptoColor={item.cryptoColor}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            curIndex={index}
            text={`${item.coinShortName}/${currency}`}
          />
        )}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            ref.current?.scrollToIndex({index: selectedIndex, animated: true});
          });
        }}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
        style={{height: 70}}
      />

      <CryptoCard item={currentCrypto} />

      <MultilineChart
        item={currentCrypto}
        style={{backgroundColor: 'black', alignItems: 'center'}}
        chartInterval={timeIntervals[chartInterval].chartName}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        {timeIntervals.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: index === chartInterval ? 'green' : 'red',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (index !== chartInterval) {
                  setChartInterval(index);
                }
              }}>
              <Text
                style={{
                  borderRadius: 20,
                  paddingTop: 12,
                  paddingHorizontal: 16,
                  fontSize: 24,
                  fontWeight: 600,
                }}>
                {item.displayName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
