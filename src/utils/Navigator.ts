/**
 * Navigation 路由跳转工具
 */
import React from 'react';
import { StackActions, NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function goHome() {
  navigationRef.current?.navigate('Main');
}

/**
 * 全局导航跳转工具类
 */
// export default class NavigationUtil {
//   /**
//    * 跳转到指定页面
//    * @param params 要传递的参数
//    * @param page 要跳转的页面名
//    **/
//   static goPage(page: string, params: any) {
//     const navigation = NavigationUtil.navigation;
//     if (!navigation) {
//       console.log('NavigationUtil.navigation can not be null');
//       return;
//     }
//     navigation.navigate(page, {
//       ...params
//     });
//   }

//   /**
//    * 返回上一页
//    * @param navigation
//    */
//   static goBack(navigation: any) {
//     navigation.goBack();
//   }

//   /**
//    * 重置到首页
//    * @param navigation
//    */
//   static resetToHomPage(params: any) {
//     const { navigation } = params;
//     // navigation.navigate("HomePage");

//     navigation.dispatch(StackActions.replace('HomePage', {}));
//   }
// }
