import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home/index';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        lazy
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

export default HomeTabs;
