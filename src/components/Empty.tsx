import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyProps {
  loading?: boolean;
  text?: string;
}

export const Empty: FC<EmptyProps> = props => {
  if (props.loading) {
    return null;
  }
  return (
    <View style={styles.empty}>
      <Text>{props.text || '暂无数据'}</Text>
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
