/**
 * Navigator 路由跳转工具
 */
import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export default class Navigator {
  // 跳转页面
  static goPage(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
  }

  // 返回
  static goBack() {
    navigationRef.current?.goBack();
  }

  // 去首页
  static goHome() {
    navigationRef.current?.navigate('MainScreen');
  }
}
