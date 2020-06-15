/**
 * BottomTabs - 底部导航器
 */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, TabNavigationState } from '@react-navigation/native';
import { MainStackNavigation, MainStackParamList } from './MainNavigation';
import { RootState } from '@/models/index';
import { Navigator, Storage } from '@/utils/index';
import Icon from '@/assets/iconfont';
// tab page
import HomePage from '@/pages/Home/index';
import Found from '@/pages/Found/index';
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
    this.renderHeader();
  }

  componentDidUpdate() {
    this.renderHeader();
  }

  authLogin = async () => {
    const isAuth = await Storage.get('isAuth');
    console.log(isAuth);
  };

  renderHeader = () => {
    const { navigation, route } = this.props;
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'HomePage';
    if (routeName === 'HomePage') {
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

  // Account Auth Check
  AccountScreen = ({ navigation }: { navigation: any }) => {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', (e: any) => {
        e.preventDefault();
        const { isAuth } = this.props;
        if (!isAuth) {
          Navigator.goPage('LoginScreen');
        }
      });
      return unsubscribe;
    }, [navigation]);
    return <Account />;
  };

  render() {
    return (
      <Tab.Navigator
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
          name="PublishButton"
          component={PublishButton}
          options={({ navigation }) => ({
            tabBarButton: () => {
              return <PublishButton navigation={navigation} />;
            }
          })}
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
          component={this.AccountScreen}
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
