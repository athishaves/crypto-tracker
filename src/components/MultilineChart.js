import React, {useEffect, useRef, useState} from 'react';
import {ScreenWidth} from '../utils/constants';
import {generatePathFromData} from '../utils/helper';
import {Animated, View} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {Path, Svg} from 'react-native-svg';

const data = [
  {x: 1453075200, y: 1.47},
  {x: 1453161600, y: 1.37},
  {x: 1453248000, y: 1.53},
  {x: 1453334400, y: 1.54},
  {x: 1453420800, y: 1.52},
  {x: 1453507200, y: 2.03},
  {x: 1453593600, y: 2.1},
  {x: 1453680000, y: 2.5},
  {x: 1453766400, y: 2.3},
  {x: 1453852800, y: 2.42},
  {x: 1453939200, y: 2.55},
  {x: 1454025600, y: 2.41},
  {x: 1454112000, y: 2.43},
  {x: 1454198400, y: 2.2},
];

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function MultilineChart(props) {
  const {item} = props;
  const width = ScreenWidth - 50;
  const height = width;
  const marginBuffer = 5;

  const chartInterval = props.chartInterval;

  const chartPath = generatePathFromData(
    item.prices[chartInterval],
    height - marginBuffer,
    width,
  );

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
    <View {...props}>
      <Svg
        height={height}
        width={width}
        viewBox={`0 ${marginBuffer / 2} ${width} ${height - marginBuffer / 2}`}>
        <AnimatedPath
          onLayout={() => setLength(ref.current.getTotalLength())}
          ref={ref}
          d={chartPath}
          stroke={item.cryptoColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={6}
          strokeDasharray={length}
          // strokeDashoffset={animatedOffset}
          fillOpacity={0}
        />
      </Svg>
    </View>
  );
}
