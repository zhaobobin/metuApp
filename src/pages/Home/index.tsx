/**
 * HomePage - 首页
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp
} from '@react-navigation/material-top-tabs';
import TopTabBarWrapper from '@/pages/Home/TopTabBarWrapper';
import Following from '@/pages/Home/Following';

export type HomeTabParamList = {
  [key: string]: {
    modelNamespace: string;
    category: string;
  };
};

export type HomeTabNavigation = MaterialTopTabNavigationProp<HomeTabParamList>;

const Tab = createMaterialTopTabNavigator<HomeTabParamList>();

class HomeTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        lazy
        sceneContainerStyle={styles.sceneContainerStyle}
        tabBar={props => <TopTabBarWrapper {...props} />}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 80
          },
          indicatorStyle: {
            width: 20,
            height: 4,
            borderRadius: 4,
            marginLeft: 30,
            backgroundColor: '#1890ff'
          },
          activeTintColor: '#1890ff',
          inactiveTintColor: '#999'
        }}>
        <Tab.Screen name="关注" component={Following} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: 'transparent'
  }
});

export default HomeTabs;
