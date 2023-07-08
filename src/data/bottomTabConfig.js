import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomePage from '../screens/HomePage';
import ChartPage from '../screens/ChartPage';

function SampleComp3() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32, fontWeight: 800, color: '#000'}}>
        Sample Comp 3
      </Text>
    </View>
  );
}

export const Tabs = [
  {
    route: 'Dashboard',
    label: 'Dashboard',
    activeColor: '#f00',
    inactiveColor: 'grey',
    component: HomePage,
    activeIcon: 'home',
    type: 'AntDesign',
  },
  {
    route: 'Portfolio',
    label: 'Portfolio',
    activeColor: '#0f0',
    inactiveColor: 'grey',
    component: ChartPage,
    activeIcon: 'chart-timeline-variant',
    type: 'MaterialCommunityIcon',
  },
  {
    route: 'Profile',
    label: 'Profile',
    activeColor: '#00f',
    inactiveColor: 'grey',
    component: SampleComp3,
    activeIcon: 'settings',
    type: 'Feather',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
