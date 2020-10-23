/**
 * RootNavigation
 */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack';

import WelcomePage from '@/pages/Welcome';
import AppScreen from './AppNavigation';

// App页面参数声明
export type RootStackParamList = {
  Welcome: undefined;
  LoginScreen: undefined;
  AppScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

export default function RootScreen() {
  return (
    <RootStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#666',
        headerBackTitleVisible: false,
        gestureEnabled: true
      }}>
      <RootStack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AppScreen"
        component={AppScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      
    </RootStack.Navigator>
  );
}
