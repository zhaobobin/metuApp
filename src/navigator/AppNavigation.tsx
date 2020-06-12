/**
 * AppNavigation - modal全屏模式：登录、发布、图片详情等页面
 */
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets
} from '@react-navigation/stack';
import { IPhoto } from '@/types/CommonTypes';

import WelcomePage from '@/pages/Welcome';
import PhotoDetail from '@/pages/Photo/PhotoDetail';
import Publish from '@/pages/Publish/index';
import Icon from '@/assets/iconfont';
import MainScreen from './MainNavigation';

// App页面参数声明
export type AppStackParamList = {
  Welcome: undefined;
  Main: undefined; // MainStackScreen
  Publish: undefined;
  PhotoDetailModal: {
    item: IPhoto;
  };
};

const AppStack = createStackNavigator<AppStackParamList>();

export type AppStackNavigation = StackNavigationProp<AppStackParamList>;

export default function AppScreen() {
  return (
    <AppStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#666',
        headerBackTitleVisible: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS
      }}>
      <AppStack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <AppStack.Screen
        name="Publish"
        component={Publish}
        options={getPublishOptions}
      />
      <AppStack.Screen
        name="PhotoDetailModal"
        component={PhotoDetail}
        options={getPhotoDetailModalOptions}
      />
    </AppStack.Navigator>
  );
}

function getPublishOptions() {
  return {
    headerTitle: '发布',
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

function getPhotoDetailModalOptions({
  route
}: {
  route: RouteProp<AppStackParamList, 'PhotoDetailModal'>;
}) {
  return {
    headerTitle: route.params.item.title,
    headerTintColor: '#fff',
    headerTransparent: true,
    cardStyle: {
      backgroundColor: '#f8f8f8'
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

const styles = StyleSheet.create({
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8
  }
});
