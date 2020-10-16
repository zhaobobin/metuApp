/**
 * 全局样式
 */
import { Dimensions, Platform } from "react-native";
import { isIphoneX, getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

const BACKGROUND_COLOR = '#f3f3f4';

const { height: screenWidth, width: screenHeight } = Dimensions.get('window');

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
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  root_container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  nav_bar_height_ios: 44,
  nav_bar_height_android: 50,
  backgroundColor: BACKGROUND_COLOR,
  screenWidth: screenWidth,
  screenHeight: screenHeight,
  widthPercent: widthPercent,
  heightPercent: heightPercent,
  is_IphoneX: is_IphoneX,
  statusBarHeight: Platform.OS === 'ios' ? statusBarHeight + 5 : statusBarHeight,
  bottomSpace: bottomSpace
}