import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyProps {
  loading?: boolean;
}

export const Empty: FC<EmptyProps> = props => {
  if (props.loading) {
    return null;
  }
  return (
    <View style={styles.empty}>
      <Text>暂无数据</Text>
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
