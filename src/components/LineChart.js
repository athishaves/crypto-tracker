import React, {useEffect, useRef, useState} from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {Animated} from 'react-native';
import {interpolatePath} from 'd3-interpolate-path';
import {generatePathFromData} from '../utils/helper';
import {createAnimatableComponent} from 'react-native-animatable';
import {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedProps,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function WrappedLineChart(props) {
  const {prices, cryptoColor} = props;
  const height = 70;
  const marginBuffer = 5;

  const chartPath = generatePathFromData(prices, height - marginBuffer);

  const [length, setLength] = useState(0);
  const ref = useRef(null);

  const animatedOffset = new Animated.Value(0);
  useEffect(() => {
    animatedOffset.setValue(length);
    Animated.timing(animatedOffset, {
      toValue: 0,
      duration: 1000,
      easing: Easing.spring,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Svg
      height={height}
      width="100%"
      viewBox={`0 ${marginBuffer / 2} ${prices.length * 10} ${
        height - marginBuffer / 2
      }`}
      {...props}>
      <AnimatedPath
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={chartPath}
        stroke={cryptoColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={6}
        strokeDasharray={length}
        strokeDashoffset={animatedOffset}
        fillOpacity={0}
      />
    </Svg>
  );
}

export const LineChart = React.memo(WrappedLineChart);
