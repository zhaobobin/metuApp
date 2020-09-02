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

import BottomTabs from '@/navigator/BottomTabs';
import PhotoDetail from '@/pages/Photo/PhotoDetail';
import UserDetail from '@/pages/User/UserDetail';
import Category from '@/pages/Category/index';
import Setting from '@/pages/Setting/index';
import SettingProfile from '@/pages/Setting/SettingProfile';
import SettingProfileNickname from '@/pages/Setting/SettingProfileNickname';
import SettingProfileHeadline from '@/pages/Setting/SettingProfileHeadline';
import SettingProfileMobile from '@/pages/Setting/SettingProfileMobile';
import SettingProfilePassword from '@/pages/Setting/SettingProfilePassword';
import { IPhoto } from '@/types/CommonTypes';

export type MainStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  PhotoDetail: {
    item: IPhoto;
    modal?: boolean;
  };
  UserDetail: {
    id: string;
  };
  Category: undefined;
  Setting: undefined;
  SettingProfile: undefined;
  SettingProfileNickname: undefined;
  SettingProfileHeadline: undefined;
  SettingProfileMobile: undefined;
  SettingProfilePassword: undefined;
};

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const MainStack = createStackNavigator<MainStackParamList>();

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
        options={getBottomTabsOptions}
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
      <MainStack.Screen
        name="Category"
        component={Category}
        options={getCategoryOptions}
      />
      <MainStack.Screen
        name="Setting"
        component={Setting}
        options={{ headerTitle: '设置' }}
      />
      <MainStack.Screen
        name="SettingProfile"
        component={SettingProfile}
        options={{ headerTitle: '个人信息' }}
      />
      <MainStack.Screen
        name="SettingProfileNickname"
        component={SettingProfileNickname}
        options={{ headerTitle: '修改昵称' }}
      />
      <MainStack.Screen
        name="SettingProfileHeadline"
        component={SettingProfileHeadline}
        options={{ headerTitle: '修改简介' }}
      />
      <MainStack.Screen
        name="SettingProfileMobile"
        component={SettingProfileMobile}
        options={{ headerTitle: '修改手机号' }}
      />
      <MainStack.Screen
        name="SettingProfilePassword"
        component={SettingProfilePassword}
        options={{ headerTitle: '修改密码' }}
      />
    </MainStack.Navigator>
  );
}

function getBottomTabsOptions() {
  return {
    headerTitle: '底部导航'
    // headerShown: false
  };
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

// 分类
function getCategoryOptions() {
  return {
    headerTitle: '分类管理'
  };
}

const styles = StyleSheet.create({
  userDetailBg: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0
  }
});
