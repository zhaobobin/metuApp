/**
 * RootStack -> AppStock -> MainStack -> BottomTabs -> HomeTabs
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/utils/Navigator';
import RootScreen from './RootNavigation';

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <RootScreen />
      </NavigationContainer>
    );
  }
}

export default Navigator;
