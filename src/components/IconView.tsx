/**
 * IconView
 */
import React, { FC } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon, { IconNames } from '@/assets/iconfont';
import { Touchable } from '@/components/index';

interface IconViewProps {
  iconName: IconNames;
  iconSize?: number;
  fontSize?: number;
  color?: string;
  text?: string | number;
  style?: ViewStyle;
  onPress?: (record?: any) => void;
}

export const IconView: FC<IconViewProps> = props => {
  const { iconName, iconSize, fontSize, text, color, style, onPress } = props;
  return (
    <Touchable onPress={onPress} activeOpacity={1}>
      <View style={[styles.iconView, style]}>
        <Icon name={iconName} size={iconSize} color={color} />
        <Text style={[styles.text, { fontSize, color }]}>{text}</Text>
      </View>
    </Touchable>
  );
};

IconView.defaultProps = {
  iconSize: 16,
  fontSize: 12,
  color: '#999'
};

const styles = StyleSheet.create({
  iconView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 5
  }
});

export default IconView;
