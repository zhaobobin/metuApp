import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  FlexStyle,
  StyleSheet,
  View
} from 'react-native';
import { color } from '@/theme/index';

export type ButtonSize = 'large' | 'middle' | 'small';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface IProps {
  style?: FlexStyle;
  //文本
  title: string;
  //字体大小
  fontSize?: string;
  //按钮
  btnSize?: ButtonSize;
  type?: ButtonType;
  //按钮事件
  onPress: any;
  disabled?: boolean;
  //用于给残障人士显示的文本
  accessibilityLabel?: string;
}

export default class Button extends Component<IProps> {
  renderBtnTheme = (type: ButtonType) => {
    switch (type) {
      case 'primary':
        return {
          borderColor: color.blue,
          backgroundColor: color.blue,
          color: color.white
        };
      case 'danger':
        return {
          borderColor: color.red,
          backgroundColor: color.red,
          color: color.white
        };
      case 'link':
        return {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: color.blue
        };
      case 'default':
        return {
          borderColor: color.gray,
          backgroundColor: color.white,
          color: color.c333
        };
      default:
        return {
          borderColor: color.gray,
          backgroundColor: color.white,
          color: color.c333
        };
    }
  };

  onPress = () => {
    const { onPress } = this.props;
    onPress();
  };

  render() {
    const { title, type, disabled, style, accessibilityLabel } = this.props;
    let theme = this.renderBtnTheme(type);
    if (disabled) {
      theme = {
        borderColor: color.border,
        backgroundColor: color.background,
        color: color.gray
      };
    }
    return (
      <TouchableOpacity onPress={this.onPress} disabled={disabled}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 15,
            borderRadius: 5,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: theme.borderColor,
            backgroundColor: theme.backgroundColor,
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
  }
}
