import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { RootSiblingParent } from 'react-native-root-siblings';
import Navigator from '@/navigator/index';
import store from '@/config/dva';

enableScreens();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <Navigator />
        </RootSiblingParent>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
