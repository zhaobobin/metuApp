import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppStackNavigation } from '@/navigator/AppNavigation';
import Touchable from '@/components/Touchable';
import { navigate } from '@/utils/Navigator';

interface IProps {
  navigation: AppStackNavigation;
}

class PublishButton extends React.Component<IProps> {
  goPublish = () => {
    navigate('Publish');
  };

  render() {
    return (
      <Touchable style={styles.container} onPress={this.goPublish}>
        <Text style={styles.text}>发布</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: -8,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  text: {
    color: '#fff'
  }
});

export default PublishButton;
