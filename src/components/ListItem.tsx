import React, { useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  FlexStyle,
  StyleSheet,
  View,
  StyleProp
} from 'react-native';

interface leftIconProps {
  type: string;
  name: string;
  size: number,
  color: string;
  containerStyle: StyleProp<any>
}

interface ListItemProps {
  key: string | number;
  title: string;
  leftIcon: leftIconProps;
  onPress: () => void;
  chevron: boolean;
  bottomDivider: boolean;
}

const ListItem: React.FC<ListItemProps> = React.memo(props => {
  return (
    <View></View>
  )
});

export default ListItem;
