import React, { useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import _ from 'lodash';
import { color } from '@/theme/index';

export type ButtonSize = 'small' | 'middle' | 'large' | undefined;
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | undefined;

interface ButtonProps {
  style?: ViewStyle;
  //文本
  title: string;
  //按钮
  btnSize?: ButtonSize;
  //字体大小
  fontSize?: number | undefined;
  type?: ButtonType;
  width?: number | string | undefined;
  height?: number | string | undefined;
  ghost?: boolean;
  //按钮事件
  onPress: any;
  disabled?: boolean;
  //用于给残障人士显示的文本
  accessibilityLabel?: string;
}

const Button: React.FC<ButtonProps> = React.memo(props => {
  const {
    title,
    type,
    btnSize,
    fontSize,
    disabled,
    style,
    width,
    height,
    ghost,
    onPress,
    accessibilityLabel
  } = props;

  const renderBtnSize = (btnSize: ButtonSize) => {
    switch (btnSize) {
      case 'small':
        return 32;
      case 'middle':
        return 40;
      case 'large':
        return 50;
      default:
        return 40;
    }
  };

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
          height: height || renderBtnSize(btnSize),
          paddingHorizontal: 12,
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
            fontSize
          }}
          accessibilityLabel={accessibilityLabel}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

Button.defaultProps = {
  fontSize: 16
}

export default Button;
