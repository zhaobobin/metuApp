import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyProps {
  data?: any;
  text?: string;
}

export const Empty: FC<EmptyProps> = props => {
  const { text } = props;
  return (
    <View style={styles.empty}>
      <Text>{text || '暂无数据'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    paddingVertical: 100
  }
});

export default Empty;
