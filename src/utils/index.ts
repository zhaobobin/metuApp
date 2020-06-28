import { Dimensions } from 'react-native';
import ENV from '@/config/env';
import { Encrypt, Decrypt } from '@/utils/Crypto';
import Navigator from '@/utils/Navigator';
import Request from '@/utils/Request';
import Storage from '@/utils/Storage';
import Validator from '@/utils/Validator';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 根据百分比获取宽度
function wp(percentage: number) {
  const value = (percentage * screenWidth) / 100;
  return Math.round(value);
}

// 根据百分比获取高度
function hp(percentage: number) {
  const value = (percentage * screenHeight) / 100;
  return Math.round(value);
}

export {
  screenWidth,
  screenHeight,
  wp,
  hp,
  ENV,
  Encrypt,
  Decrypt,
  Navigator,
  Request,
  Storage,
  Validator
};
