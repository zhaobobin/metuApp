/**
 * HomePage - 首页
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp
} from '@react-navigation/material-top-tabs';
import { RootState } from '@/models/index';

import TopTabBarWrapper from '@/pages/Home/TopTabBarWrapper';
import Following from '@/pages/Home/Following';
import Editor from '@/pages/Home/Editor';
import Popular from '@/pages/Home/Popular';

export type HomeTabParamList = {
  [key: string]: undefined;
};

export type HomeTabNavigation = MaterialTopTabNavigationProp<HomeTabParamList>;

const Tab = createMaterialTopTabNavigator<HomeTabParamList>();

const mapStateToProps = (state: RootState) => ({
  myCategory: state.category.myCategory
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class HomeTabs extends React.Component<IProps> {
  renderTabs = () => {
    const { myCategory } = this.props;
    for (const i in myCategory) {
      switch (myCategory[i].id) {
        case 'following':
          myCategory[i].component = Following;
          break;
        case 'editor':
          myCategory[i].component = Editor;
          break;
        case 'popular':
          myCategory[i].component = Popular;
          break;
        default:
          myCategory[i].component = Following;
          break;
      }
    }
    return myCategory;
  };

  render() {
    const Tabs = this.renderTabs();
    return (
      <Tab.Navigator
        lazy
        initialRouteName="推荐"
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
          inactiveTintColor: '#fff'
        }}>
        {Tabs.map((item, index) => (
          <Tab.Screen key={index} name={item.name} component={item.component} />
        ))}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: 'transparent'
  }
});

export default connector(HomeTabs);
