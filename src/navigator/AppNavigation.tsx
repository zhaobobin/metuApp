/**
 * AppNavigation - modal全屏模式：登录、发布、图片详情等页面
 */
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets
} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import Icon from '@/assets/iconfont';
import { SearchType } from '@/types/search/SearchState';

import MainScreen from './MainNavigation';
import LoginScreen from './LoginNavigation';
import Search from '@/pages/Search/index';
import Publish from '@/pages/Publish/index';
import ArticleDetail from '@/pages/Article/ArticleDetail';
import PhotoDetail from '@/pages/Photo/PhotoDetail';
import UserDetail from '@/pages/User/UserDetail';
import Comment from '@/pages/Comment/index';
import PhotoIndex from '@/pages/Photo/index';
import ArticleIndex from '@/pages/Article/index';
import Circle from '@/pages/Circle/index';
import Topic from '@/pages/Topic/index';
import MessageList from '@/pages/Message/MessageList';

// App页面参数声明
export type AppStackParamList = {
  MainScreen: undefined;
  LoginScreen: undefined;
  SearchScreen: { type?: SearchType };
  PublishScreen: { onPress: (values: any) => void };
  ArticleDetail: { article_id: string; modal?: boolean };
  PhotoDetail: { photo_id: string; modal?: boolean };
  UserDetail: { id: string };
  CommentScreen: { id: string; type: 'photos' | 'articles' };
  PhotoIndex: undefined;
  ArticleIndex: undefined;
  CircleIndex: undefined;
  TopicIndex: undefined;
  MessageList: { name: string, type: string }
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
        headerBackImage: () => <Icon name="icon-arrow-lift" size={30} color="#666" style={{ marginLeft: 5 }} />,
        gestureEnabled: true
      }}>
      <AppStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <AppStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS
        }}
      />
      <AppStack.Screen
        name="SearchScreen"
        component={Search}
        options={getSearchOptions}
      />
      <AppStack.Screen
        name="PublishScreen"
        component={Publish}
        options={getPublishScreenOptions}
      />
      <AppStack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={getArticleDetailOptions}
      />
      <AppStack.Screen
        name="PhotoDetail"
        component={PhotoDetail}
        options={getPhotoDetailOptions}
      />
      <AppStack.Screen
        name="UserDetail"
        component={UserDetail}
        options={getUserDetailOptions}
      />
      <AppStack.Screen
        name="CommentScreen"
        component={Comment}
        options={getCommentScreenOptions}
      />
      <AppStack.Screen
        name="PhotoIndex"
        component={PhotoIndex}
        options={getPhotoIndexOptions}
      />
      <AppStack.Screen
        name="ArticleIndex"
        component={ArticleIndex}
        options={getArticleIndexOptions}
      />
      <AppStack.Screen
        name="CircleIndex"
        component={Circle}
        options={getCircleIndexOptions}
      />
      <AppStack.Screen
        name="TopicIndex"
        component={Topic}
        options={getTopicIndexOptions}
      />
      <AppStack.Screen
        name="MessageList"
        component={MessageList}
        options={getMessageListOptions}
      />
    </AppStack.Navigator>
  );
}

// 搜索
function getSearchOptions() {
  return {
    headerShown: false,
    headerTitle: '搜索',
    headerBackImage: ({ tintColor }: { tintColor: string }) => (
      <Icon
        name="icon-close"
        size={30}
        color={tintColor}
        style={styles.headerBackImage}
      />
    ),
    ...TransitionPresets.ScaleFromCenterAndroid
  };
}

function getPublishScreenOptions() {
  return {
    // headerShown: false,
    headerTitle: '',
    headerBackImage: ({ tintColor }: { tintColor: string }) => (
      <Icon
        name="icon-arrow-down"
        size={30}
        color={tintColor}
        style={styles.headerBackImage}
      />
    ),
    ...TransitionPresets.ScaleFromCenterAndroid
  };
}

function getArticleDetailOptions() {
  return {
    headerTitle: '详情',
    headerBackImage: ({ tintColor }: { tintColor: string }) => (
      <Icon
        name="icon-close"
        size={30}
        color={tintColor}
        style={styles.headerBackImage}
      />
    ),
    ...TransitionPresets.ScaleFromCenterAndroid
  };
}

function getPhotoDetailOptions() {
  return {
    headerShown: false,
    ...TransitionPresets.ScaleFromCenterAndroid
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
    },
    ...TransitionPresets.SlideFromRightIOS
  };
}

function getCommentScreenOptions() {
  return {
    headerShown: false,
    ...TransitionPresets.ModalPresentationIOS
  };
}

function getPhotoIndexOptions() {
  return {
    headerShown: false,
    headerTitle: '影集',
    ...TransitionPresets.SlideFromRightIOS
  };
}

function getArticleIndexOptions() {
  return {
    headerShown: false,
    headerTitle: '文章',
    ...TransitionPresets.SlideFromRightIOS
  };
}

function getCircleIndexOptions() {
  return {
    headerShown: false,
    headerTitle: '圈子',
    ...TransitionPresets.SlideFromRightIOS
  };
}

function getTopicIndexOptions() {
  return {
    headerShown: false,
    headerTitle: '话题',
    ...TransitionPresets.SlideFromRightIOS
  };
}

function getMessageListOptions(props: any) {
  return {
    headerTitle: props.route.params.name,
    ...TransitionPresets.SlideFromRightIOS
  }
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
