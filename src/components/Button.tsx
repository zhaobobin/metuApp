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
  type: ButtonType;
  //按钮事件
  onPress: () => void;
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

  render() {
    const { title, type, fontSize, style, accessibilityLabel } = this.props;
    const theme = this.renderBtnTheme(type);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: theme.borderColor,
              backgroundColor: theme.backgroundColor,
              color: theme.color,
              fontSize: 16,
              ...style
            }}
            accessibilityLabel={accessibilityLabel}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  }
});
