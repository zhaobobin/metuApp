/**
 * LoginNavigation - 登录导航
 */
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators
} from '@react-navigation/stack';
import Icon from '@/assets/iconfont';

import Login from '@/pages/Account/Login'
import Register from '@/pages/Account/Register'
import ResetPassword from '@/pages/Account/ResetPassword'

export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
};

export type LoginStackNavigation = StackNavigationProp<LoginStackParamList>;

const LoginStack = createStackNavigator<LoginStackParamList>();

// LoginScreen
export default function LoginScreen() {
  return (
    <LoginStack.Navigator
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#666',
        headerBackTitleVisible: false,
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerStyle: {
          ...Platform.select({
            android: {
              elevation: 0
            }
          })
        }
      }}>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={getLoginOptions}
      />
      <LoginStack.Screen
        name="Register"
        component={Register}
        options={getRegisterOptions}
      />
      <LoginStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={getResetOptions}
      />
    </LoginStack.Navigator>
  );
}

function getLoginOptions() {
  return {
    headerTitle: '',
    headerTintColor: '#333',
    headerTransparent: true,
    cardStyle: {
      backgroundColor: '#fff'
    },
    headerBackImage: ({ tintColor }: { tintColor: string }) => (
      <Icon
        name="icon-arrow-down"
        size={36}
        color={tintColor}
        style={styles.headerBackImage}
      />
    )
  };
}

function getRegisterOptions() {
  return {
    headerTitle: '',
    headerTintColor: '#333',
    headerTransparent: true,
    cardStyle: {
      backgroundColor: '#fff'
    },
    headerBackImage: ({ tintColor }: { tintColor: string }) => (
      <Icon
        name="icon-arrow-lift"
        size={36}
        color={tintColor}
        style={styles.headerBackImage}
      />
    )
  };
}

function getResetOptions() {
  return {
    headerTitle: '',
    headerTintColor: '#333',
    headerTransparent: true,
    cardStyle: {
      backgroundColor: '#fff'
    },
    headerBackImage: ({ tintColor }: { tintColor: string }) => (
      <Icon
        name="icon-arrow-lift"
        size={36}
        color={tintColor}
        style={styles.headerBackImage}
      />
    )
  };
}

const styles = StyleSheet.create({
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8
  }
});
