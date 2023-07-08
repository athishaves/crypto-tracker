import React from 'react';
import CONFIG from './config';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function getCryptoImage(url) {
  if (url) return CONFIG.IMAGE_URL + url.substring(1);
  return '';
}

export function CustomIcon(props) {
  const {icon, iconType, iconSize, iconColor, isAnimated} = props;
  switch (iconType) {
    case 'AntDesign':
      if (isAnimated) {
        const AnimatedAntIcon = Animated.createAnimatedComponent(AntIcon);
        return (
          <AnimatedAntIcon
            {...props}
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        );
      }
      return (
        <AntIcon {...props} name={icon} size={iconSize} color={iconColor} />
      );

    case 'Ionicons':
      if (isAnimated) {
        const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
        return (
          <AnimatedIonicons
            {...props}
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        );
      }
      return (
        <Ionicons {...props} name={icon} size={iconSize} color={iconColor} />
      );

    case 'MaterialCommunityIcon':
      if (isAnimated) {
        const AnimatedMaterialCommunityIcons = Animated.createAnimatedComponent(
          MaterialCommunityIcons,
        );
        return (
          <AnimatedMaterialCommunityIcons
            {...props}
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        );
      }
      return (
        <MaterialCommunityIcons
          {...props}
          name={icon}
          size={iconSize}
          color={iconColor}
        />
      );

    case 'Feather':
      if (isAnimated) {
        const AnimatedFeather = Animated.createAnimatedComponent(Feather);
        return (
          <AnimatedFeather
            {...props}
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        );
      }
      return (
        <Feather {...props} name={icon} size={iconSize} color={iconColor} />
      );

    case 'MaterialIcons':
      if (isAnimated) {
        const AnimatedMaterialIcons =
          Animated.createAnimatedComponent(MaterialIcons);
        return (
          <AnimatedMaterialIcons
            {...props}
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        );
      }
      return (
        <MaterialIcons
          {...props}
          name={icon}
          size={iconSize}
          color={iconColor}
        />
      );

    default:
      if (isAnimated) {
        const AnimatedIcon = Animated.createAnimatedComponent(Icon);
        return (
          <AnimatedIcon
            {...props}
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        );
      }
      return <Icon {...props} />;
  }
}

export function generatePathFromData(prices, height, width = undefined) {
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice;

  prices = prices.map(item => item - minPrice);

  const scaleY = range / height;
  const scaleX = width === undefined ? 10 : width / prices.length;
  console.log(scaleX);

  let firstFlag = true;
  function getPointFromPrice(index, value) {
    let res = 'L';
    if (firstFlag) {
      res = 'M';
      firstFlag = false;
    }
    return `${res}${index * scaleX},${value / scaleY}`;
  }

  return prices.map((item, index) => getPointFromPrice(index, item)).join(' ');
}

export function getPriceChange(oldPrice, newPrice, decimalLength = 2) {
  return decimalFormat(((newPrice - oldPrice) / oldPrice) * 100, 2, true);
}

const decimalCheckRegex = /\.0+$/;
export function decimalFormat(
  input,
  decimalLength = 2,
  removeDecimalIfNotRequired = false,
) {
  let result = (Math.round(input * 100) / 100).toFixed(decimalLength);
  result = result.toString();
  if (removeDecimalIfNotRequired === true && decimalCheckRegex.test(result)) {
    return result.substring(0, result.indexOf('.'));
  }
  return result;
}

import ImageColors from 'react-native-image-colors';
import Animated from 'react-native-reanimated';
export async function getProminentColor(imageUri) {
  const result = await ImageColors.getColors(imageUri, {
    fallback: '#F24E1E',
    cache: false,
  });
  switch (result.platform) {
    case 'android':
      return result.vibrant;
    case 'web':
      return result.lightVibrant;
    case 'ios':
      return result.primary;
    default:
      throw new Error('Unexpected platform key');
  }
}
