/**
 * NavigationUtil - 导航跳转工具
 */
import { NavigationActions } from 'react-navigation';

export default class NavigationUtil {

  // 跳转页面
  static goPage(routeName: string, params = {}) {
    this.navigation.navigate({ routeName, params })
  }

  // 返回
  static goBack(navigation) {
    navigation.goBack()
  }

  // 去首页
  static goHome(params) {
    const {navigation} = params;
    navigation.navigate({ routeName: 'BottomTabs' })
  }

}