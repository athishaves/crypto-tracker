import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {globalStyle} from '../utils/constants';
import CryptoListItem from '../components/CryptoListItem';
import {
  getCryptoPrice,
  getOHLCVDay,
  getOHLCVHour,
  getTopCryptos,
} from '../services/cryptoService';
import {CustomIcon, getCryptoImage, getProminentColor} from '../utils/helper';
import {useRoot} from '../core/RootProvider';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function HomePage(props) {
  const {
    state: {filteredCryptos, currency},
    reducer,
  } = useRoot();

  return (
    <View style={[globalStyle.container, {alignItems: 'stretch'}]}>
      <FlatList
        data={filteredCryptos}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <CryptoListItem navigation={props.navigation} item={item} />;
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        bounces={false}
      />
    </View>
  );
}
