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

import Login from '@/pages/Account/Login';
import Register from '@/pages/Account/Register';
import ResetPasswordStep1 from '@/pages/Account/ResetPasswordStep1';
import ResetPasswordStep2 from '@/pages/Account/ResetPasswordStep2';
import ResetPasswordStep3 from '@/pages/Account/ResetPasswordStep3';
import RegisterXieyi from '@/pages/Account/RegisterXieyi';

export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  ResetPasswordStep2: { mobile: string };
  ResetPasswordStep3: { mobile: string, smscode: string };
  RegisterXieyi: undefined;
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
        component={ResetPasswordStep1}
        options={getResetOptions}
      />
      <LoginStack.Screen
        name="ResetPasswordStep2"
        component={ResetPasswordStep2}
        options={getResetOptions}
      />
      <LoginStack.Screen
        name="ResetPasswordStep3"
        component={ResetPasswordStep3}
        options={getResetOptions}
      />
      <LoginStack.Screen
        name="RegisterXieyi"
        component={RegisterXieyi}
        options={{ headerTitle: '注册协议' }}
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

function getXieyiOptions() {
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
