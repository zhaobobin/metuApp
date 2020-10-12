/**
 * BottomTabs - 底部导航器
 */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, TabNavigationState } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MainStackNavigation, MainStackParamList } from './MainNavigation';
import { ENV, Storage, Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import { IResponse } from '@/types/CommonTypes';
import Icon from '@/assets/iconfont';
// tab page
import HomePage from '@/pages/Home/index';
import Found from '@/pages/Found/index';
import Circle from '@/pages/Circle/index';
import PublishButton from '@/pages/Publish/PublishButton';
import Message from '@/pages/Message/index';
import Account from '@/pages/Account/Account';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

export type BottomTabParamList = {
  HomePage: undefined;
  Found: undefined;
  Circle: undefined;
  PublishButton: undefined;
  Message: undefined;
  Account: undefined;
};

type Route = RouteProp<MainStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};

interface IProps extends ModelState {
  navigation: MainStackNavigation;
  route: Route;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

class BottomTabs extends React.Component<IProps> {
  componentDidMount() {
    this.setOptions();
  }

  componentDidUpdate() {
    this.setOptions();
  }

  setOptions = () => {
    const { navigation, route } = this.props;
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'HomePage';
    if (routeName === 'HomePage') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
        headerRight: undefined
      });
    } 
    else if (routeName === 'Found') {
      navigation.setOptions({
        headerShown: false
      });
    }
    else if (routeName === 'Account') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
        headerRight: () => (
          <HeaderButtons>
            <Item
              title="setting"
              IconComponent={Icon}
              iconName="icon-set"
              iconSize={30}
              color="#fff"
              onPress={() => {
                navigation.navigate('Setting');
              }}
            />
          </HeaderButtons>
        )
      });
    } else {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: this.getHeaderTitle(routeName),
        headerRight: undefined
      });
    }
  };

  getHeaderTitle = (routeName: string) => {
    switch (routeName) {
      case 'HomePage':
        return '首页';
      case 'Circle':
        return '圈子';
      case 'Found':
        return '发现';
      case 'Message':
        return '消息';
      case 'Account':
        return '账户';
      default:
        return '首页';
    }
  };

  // 验证token
  authToken = async (routeName: string) => {
    const { isAuth } = this.props;
    if (isAuth) {
      Navigator.goPage(routeName);
    } else {
      const token = await Storage.get(ENV.storage.token);
      await Storage.set(
        ENV.storage.loginRedirect,
        JSON.stringify({ routeName })
      );
      if (token) {
        this.props.dispatch({
          type: 'account/token',
          payload: {
            token
          },
          callback: (res: IResponse) => {
            if (res.code === 0) {
              Navigator.goPage(routeName);
            } else {
              Navigator.goPage('LoginScreen');
            }
          }
        });
      } else {
        Navigator.goPage('LoginScreen');
      }
    }
  };

  listenTabPress = ({ route }: { route: any }) => ({
    tabPress: (e: any) => {
      e.preventDefault();
      if (route.name === 'Account' || route.name === 'Message') {
        this.authToken(route.name);
      }
    }
  });

  render() {
    return (
      <Tab.Navigator
        lazy
        tabBarOptions={{
          activeTintColor: '#1890ff'
        }}>
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-home" size={size} color={color} />
            )
          }}
        />
        {/* <Tab.Screen
          name="Circle"
          component={Circle}
          options={{
            tabBarLabel: '圈子',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-search" size={size} color={color} />
            )
          }}
        /> */}
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
          name="PublishButton"
          component={PublishButton}
          options={() => ({
            tabBarButton: () => {
              return <PublishButton />;
            }
          })}
        />
        <Tab.Screen
          name="Message"
          component={Message}
          listeners={this.listenTabPress}
          options={{
            tabBarLabel: '消息',
            tabBarIcon: ({ color, size }) => (
              <Icon name="icon-remind" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          listeners={this.listenTabPress}
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

export default connector(BottomTabs);
