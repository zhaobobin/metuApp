/**
 * 全局样式
 */
import { Dimensions, Platform } from "react-native";
import { isIphoneX, getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { color } from './color';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const is_IphoneX = isIphoneX();

const statusBarHeight = getStatusBarHeight();

const bottomSpace = getBottomSpace();

function widthPercent(percentage: number) {
  const value = (percentage * screenWidth) / 100;
  return Math.round(value);
}

// 根据百分比获取高度
function heightPercent(percentage: number) {
  const value = (percentage * screenHeight) / 100;
  return Math.round(value);
}

export const GlobalStyles = {
  color,
  nav_bar_height_ios: 44,
  nav_bar_height_android: 50,
  screenWidth,
  screenHeight,
  widthPercent,
  heightPercent,
  is_IphoneX,
  statusBarHeight: Platform.OS === 'ios' ? statusBarHeight + 5 : statusBarHeight,
  bottomSpace
}