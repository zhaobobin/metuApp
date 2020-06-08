import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, TabNavigationState } from '@react-navigation/native';
import { RootStackNavigation, RootStackParamList } from './index';
// tab page
import HomeTabs from './HomeTabs';
import Found from '@/pages/Found/index';
import Publish from '@/pages/Publish/index';
import Message from '@/pages/Message/index';
import Account from '@/pages/Account/Account';
// icon svg
import Icon from '@/assets/iconfont';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Found: undefined;
  Publish: undefined;
  Message: undefined;
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
  componentDidMount() {
    this.renderHeader();
  }

  componentDidUpdate() {
    this.renderHeader();
  }

  renderHeader = () => {
    const { navigation, route } = this.props;
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'HomeTabs';
    if (routeName === 'HomeTabs') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: ''
      });
    } else {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: this.getHeaderTitle(routeName)
      });
    }
  };

  getHeaderTitle = (routeName: string) => {
    switch (routeName) {
      case 'HomeTabs':
        return '首页';
      case 'Found':
        return '发现';
      case 'Publish':
        return '发布';
      case 'Message':
        return '消息';
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
          name="HomeTabs"
          component={HomeTabs}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-home" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Found"
          component={Found}
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-hot" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Publish"
          component={Publish}
          options={{
            tabBarLabel: '发布',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-hot" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Message"
          component={Message}
          options={{
            tabBarLabel: '消息',
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
