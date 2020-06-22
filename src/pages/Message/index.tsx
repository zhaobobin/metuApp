import React from 'react';
import { StyleSheet } from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp
} from '@react-navigation/material-top-tabs';
import MessageList from './MessageList';

export type MessageTabParamList = {
  [key: string]: {
    type: string;
  };
};

export type MessageTabNavigation = MaterialTopTabNavigationProp<
  MessageTabParamList
>;

const Tab = createMaterialTopTabNavigator<MessageTabParamList>();

const tabs = [
  { name: '点赞', type: 'favor' },
  { name: '评论', type: 'comment' },
  { name: '关注', type: 'follow' },
  { name: '收藏', type: 'collect' },
  { name: '私信', type: 'mail' },
  { name: '通知', type: 'notify' }
];

class HomeTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        lazy
        sceneContainerStyle={styles.sceneContainerStyle}
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
        {tabs.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.name}
            component={MessageList}
            initialParams={{ type: item.type }}
          />
        ))}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: '#fff'
  }
});

export default HomeTabs;
