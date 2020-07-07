import React, { useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  FlexStyle,
  StyleSheet,
  View
} from 'react-native';
import _ from 'lodash';
import { color } from '@/theme/index';

export type ButtonSize = 'large' | 'middle' | 'small';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | undefined;

interface ButtonProps {
  style?: FlexStyle;
  //文本
  title: string;
  //字体大小
  fontSize?: string;
  //按钮
  btnSize?: ButtonSize;
  type?: ButtonType;
  width?: number | string;
  ghost?: boolean;
  //按钮事件
  onPress: any;
  disabled?: boolean;
  //用于给残障人士显示的文本
  accessibilityLabel?: string;
}

const Button: React.FC<ButtonProps> = React.memo(props => {
  const { title, type, disabled, style, width, ghost, onPress, accessibilityLabel } = props;

  const renderBtnTheme = (type: ButtonType) => {
    switch (type) {
      case 'primary':
        return {
          borderColor: ghost ? 'transparent' : color.blue,
          backgroundColor: ghost ? 'transparent' : color.blue,
          color: ghost ? color.blue : color.white
        };
      case 'danger':
        return {
          borderColor: ghost ? 'transparent' : color.red,
          backgroundColor: ghost ? 'transparent' : color.red,
          color: ghost ? color.red : color.white
        };
      case 'link':
        return {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: color.blue
        };
      case 'default':
        return {
          borderColor: ghost ? 'transparent' : color.gray,
          backgroundColor: ghost ? 'transparent' : color.white,
          color: color.c333
        };
      default:
        return {
          borderColor: ghost ? 'transparent' : color.gray,
          backgroundColor: ghost ? 'transparent' : color.white,
          color: color.c333
        };
    }
  };

  let theme = renderBtnTheme(type);
  if (disabled) {
    theme = {
      borderColor: color.border,
      backgroundColor: color.background,
      color: color.gray
    };
  }
  // 防双击
  let throttleOnPress = undefined;
    if (typeof onPress === 'function') {
      throttleOnPress = useCallback(
        _.throttle(onPress, 1000, { leading: true, trailing: false }),
        [onPress]
      );
    }
  return (
    <TouchableOpacity onPress={throttleOnPress} disabled={disabled}>
      <View
        style={{
          width,
          paddingHorizontal: 12,
          paddingVertical: 15,
          borderRadius: 5,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.borderColor,
          backgroundColor: theme.backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          ...style
        }}>
        <Text
          style={{
            color: theme.color,
            fontSize: 16
          }}
          accessibilityLabel={accessibilityLabel}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default Button;
