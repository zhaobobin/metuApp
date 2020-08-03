/**
 * PhotoScreen
 */
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import { IPhoto } from '@/types/CommonTypes';
import Icon from '@/assets/iconfont';

import PhotoDetail from '@/pages/Photo/PhotoDetail';
import UserDetail from '@/pages/User/UserDetail';

// App页面参数声明
export type PhotoStackParamList = {
  PhotoDetail: { item: IPhoto; modal?: boolean };
  UserDetail: { id: string };
};

const PhotoStack = createStackNavigator<PhotoStackParamList>();

export type AppStackNavigation = StackNavigationProp<PhotoStackParamList>;

export default function PhotoScreen() {
  return (
    <PhotoStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#666',
        headerBackTitleVisible: false,
        gestureEnabled: true
      }}>
      <PhotoStack.Screen
        name="PhotoDetail"
        component={PhotoDetail}
        options={{ headerShown: false }}
      />
      {/* <PhotoStack.Screen
        name="UserDetail"
        component={UserDetail}
        options={getUserDetailOptions}
      /> */}
    </PhotoStack.Navigator>
  );
}

function getPhotoDetailOptions({
  route
}: {
  route: RouteProp<PhotoStackParamList, 'PhotoDetail'>;
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
        name="icon-close"
        size={30}
        color={tintColor}
        style={styles.headerBackImage}
      />
    )
  };
}

// 用户详情 标题配置
function getUserDetailOptions() {
  return {
    headerTitle: '用户详情',
    headerTransparent: true,
    headerTintColor: '#fff',
    headerTitleStyle: {
      opacity: 0
    },
    headerBackground: () => {
      return <Animated.View style={styles.userDetailBg} />;
    }
  };
}

const styles = StyleSheet.create({
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8
  },
  userDetailBg: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0
  }
});
