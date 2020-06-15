import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Navigator } from '@/utils/index';

class WelcomePage extends React.Component {
  private timer: any;
  private interval: any;

  state = {
    num: 3
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      this.welcome();
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  welcome = () => {
    let { num } = this.state;
    this.interval = setInterval(() => {
      if (num === 1) {
        clearInterval(this.interval);
        this.goHome();
      } else {
        num--;
        this.setState({
          num
        });
      }
    }, 1000);
  };

  goHome = () => {
    Navigator.goPage('MainScreen');
  };

  render() {
    const { num } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.num}>{num} 秒</Text>
        <Button title="立即跳转" onPress={this.goHome} />
      </View>
    );
  }
}

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1'
  },
  title: {
    fontSize: 20
  },
  num: {
    marginVertical: 10
  }
});
