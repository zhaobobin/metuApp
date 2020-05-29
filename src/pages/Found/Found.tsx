import React from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackNavigation } from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}

export default class Found extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>Account</Text>
        <Button
          title="跳转到详情页"
          onPress={() => {
            this.props.navigation.navigate('Detail', { id: '123' });
          }}
        />
      </View>
    );
  }
}
