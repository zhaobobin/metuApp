/**
 * MainNavigation - 主导航
 */
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators
} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import { IPhoto } from '@/types/CommonTypes';

import BottomTabs from '@/navigator/BottomTabs';
import PhotoDetail from '@/pages/Photo/PhotoDetail';
import UserDetail from '@/pages/User/UserDetail';

/* -------------------- RootStack -------------------- */
export type MainStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  PhotoDetail: {
    item: IPhoto;
  };
  UserDetail: {
    id: string;
  };
};

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const MainStack = createStackNavigator<MainStackParamList>();

// MainScreen
export default function MainScreen() {
  return (
    <MainStack.Navigator
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
      <MainStack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerTitle: '底部导航' }}
      />
      <MainStack.Screen
        name="PhotoDetail"
        component={PhotoDetail}
        options={getPhotoDetailOptions}
      />
      <MainStack.Screen
        name="UserDetail"
        component={UserDetail}
        options={getUserDetailOptions}
      />
    </MainStack.Navigator>
  );
}

// 图片详情 标题配置
function getPhotoDetailOptions({
  route
}: {
  route: RouteProp<MainStackParamList, 'PhotoDetail'>;
}) {
  return {
    headerTitle: route.params.item.title
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
  userDetailBg: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0
  }
});
