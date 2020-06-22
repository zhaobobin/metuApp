import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IMessageItem } from '@/types/message/MessageState'

interface IProps {
  item: IMessageItem;
  onPress: (item: IMessageItem) => void;
}

const MessageItem = ({ item, onPress }: IProps) => {
  return (
    <View>
      <Text>MessageItem</Text>
    </View>
  );
};

export default MessageItem;
