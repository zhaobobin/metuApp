/**
 * Loading
 */
import React from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import Icon from '@/assets/iconfont';

interface IProps {
  theme?: 'black' | 'white';
}

const Loading: React.FC<IProps> = React.memo(props => {
  const { theme } = props;
  const Style = {
    bgColor: theme === 'black' ? '#000' : '#fff',
    textColor: theme === 'black' ? '#666' : '#333'
  }
  return (
    <View style={[styles.container, { backgroundColor: Style.bgColor }]}>
      {/* <Icon name="icon-loading" size={30} color={Style.textColor} /> */}
      <ActivityIndicator size="large" color={Style.textColor} />
      <Text style={{ color: Style.textColor, marginTop: 5 }}>Loading</Text>
    </View>
  );
});

Loading.defaultProps = {
  theme: 'white'
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
})

export default Loading;
