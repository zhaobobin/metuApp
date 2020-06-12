import React from 'react';
import { View, Text } from 'react-native';
import { MainStackNavigation } from '@/navigator/MainNavigation';

interface IProps {
  navigation: MainStackNavigation;
}

export default class Account extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>Account</Text>
      </View>
    );
  }
}
