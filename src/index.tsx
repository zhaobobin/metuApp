import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Navigator from '@/navigator/index';
import store from '@/config/dva';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}