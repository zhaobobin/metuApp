import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home/index';
import TopTabBarWrapper from '@/pages/Home/TopTabBarWrapper';
import { StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends React.Component {
  renderTabBar = (props: MaterialTopTabBarOptions) => {
    return <TopTabBarWrapper {...props} />;
  };

  render() {
    return (
      <Tab.Navigator
        lazy
        sceneContainerStyle={styles.sceneContainerStyle}
        tabBar={this.renderTabBar}
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
        <Tab.Screen name="推荐" component={Home} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: 'transparent'
  }
})

export default HomeTabs;
