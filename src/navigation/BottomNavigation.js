import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {CustomIcon} from '../utils/helper';
import {Tabs} from '../data/bottomTabConfig';

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const isFocused = accessibilityState.selected === true;
  const viewRef = useRef(null);

  const iconSize = 32;
  const iconColor = isFocused ? item.activeColor : 'grey';

  useEffect(() => {
    if (isFocused) {
      viewRef.current.animate({
        0: {scale: 0.25, opacity: 0.75},
        1: {scale: 1.25, opacity: 1},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.25, opacity: 1},
        1: {scale: 1, opacity: 0.75},
      });
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View style={styles.container} ref={viewRef} duration={500}>
        <CustomIcon
          icon={item.activeIcon}
          iconType={item.type}
          iconSize={iconSize}
          iconColor={iconColor}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const BottomNavigation = () => (
  <Tab.Navigator
    animation="fade"
    screenOptions={{
      gestureEnabled: false,
      gestureDirection: 'horizontal',
      headerShown: false,
      tabBarStyle: {
        height: 72,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 4,
      },
    }}>
    {Tabs.map((item, index) => {
      return (
        <Tab.Screen
          name={item.route}
          component={item.component}
          key={item.route}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      );
    })}
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {BottomNavigation};
