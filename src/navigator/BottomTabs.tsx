import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, TabNavigationState } from '@react-navigation/native';
import { RootStackNavigation, RootStackParamList } from './index';
// tab page
import Home from '@/pages/Home/Home';
import Listen from '@/pages/Listen/Listen';
import Found from '@/pages/Found/Found';
import Account from '@/pages/Account/Account';
// icon svg
import Icon from '@/assets/iconfont';

export type BottomTabParamList = {
  Home: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default class BottomTabs extends React.Component<IProps> {
  componentDidUpdate() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      headerTitle: this.getHeaderTitle(route)
    });
  }

  getHeaderTitle = (route: Route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Home';
    switch (routeName) {
      case 'Home':
        return '首页';
      case 'Listen':
        return '我听';
      case 'Found':
        return '发现';
      case 'Account':
        return '我的';
      default:
        return '首页';
    }
  };

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#1890ff'
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-home"  size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{
            tabBarLabel: '我听',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-hot" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Found"
          component={Found}
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-search" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-account" size={size} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    );
  }
}
