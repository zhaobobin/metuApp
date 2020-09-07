import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Button } from '@/components/index';
import { ENV, Storage, Navigator } from '@/utils/index';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  
}

class WelcomePage extends React.Component<IProps> {
  private timer: any;
  private interval: any;

  state = {
    num: 3
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      this.authToken();
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
    Navigator.goPage('AppScreen');
  };

  authToken = async () => {
    const token = await Storage.get(ENV.storage.token);
    if (token) {
      this.props.dispatch({
        type: 'account/token',
        payload: {
          token
        },
        callback: () => {
          this.welcome();
        }
      });
    } else {
      this.welcome();
    }
  }

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

export default connector(WelcomePage);
