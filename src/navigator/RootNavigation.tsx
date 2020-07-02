/**
 * RootNavigation
 */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets
} from '@react-navigation/stack';

import WelcomePage from '@/pages/Welcome';
import AppScreen from './AppNavigation';
import LoginScreen from './LoginNavigation';

// App页面参数声明
export type RootStackParamList = {
  Welcome: undefined;
  LoginScreen: undefined;
  AppScreen: undefined; // AppStackScreen
};

const RootStack = createStackNavigator<RootStackParamList>();

export type AppStackNavigation = StackNavigationProp<RootStackParamList>;

export default function RootScreen() {
  return (
    <RootStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#666',
        headerBackTitleVisible: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS
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
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
