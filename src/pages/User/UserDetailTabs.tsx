import React from 'react';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';

import UserPhotos from './UserPhotos';
import UserArticles from './UserArticles';
import UserFollowing from './UserFollowing';
import UserFavoring from './UserFavoring';
import UserCollecting from './UserCollecting';
import UserIntroduction from './UserIntroduction';
import { StyleSheet, Platform } from 'react-native';

interface IRoute {
  key: string;
  title: string;
}

export interface IProps {}

interface IState {
  routes: IRoute[];
  index: number;
}

class UserDetailTabs extends React.Component<IProps, IState> {
  state = {
    routes: [
      { key: 'photos', title: '图片' },
      { key: 'articles', title: '文章' },
      { key: 'following', title: '关注' },
      { key: 'favoring', title: '点赞' },
      { key: 'collecting', title: '收藏' },
      { key: 'introduction', title: '简介' }
    ],
    index: 0
  };

  onIndexChange = (index: number) => {
    this.setState({
      index
    });
  };

  renderScene = ({ route }: { route: IRoute }) => {
    switch (route.key) {
      case 'photos':
        return <UserPhotos />;
      case 'articles':
        return <UserArticles />;
      case 'following':
        return <UserFollowing />;
      case 'favoring':
        return <UserFavoring />;
      case 'collecting':
        return <UserCollecting />;
      case 'introduction':
        return <UserIntroduction />;
      default:
        break;
    }
  };

  renderTabBar = (props: SceneRendererProps & { navigationState: IState }) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        tabStyle={styles.tabStyle}
        labelStyle={styles.label}
        indicatorStyle={styles.indicatorStyle}
        // activeTintColor={styles.activeColor}
        style={styles.tabBar}
      />
    );
  };

  render() {
    const { routes, index } = this.state;
    return (
      <TabView
        lazy
        navigationState={{ routes, index }}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    width: 90
  },
  label: {
    color: '#333'
  },
  tabBar: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottonWidth: StyleSheet.hairlineWidth
      }
    })
  },
  indicatorStyle: {
    width: 20,
    height: 4,
    borderRadius: 4,
    marginLeft: 35,
    backgroundColor: '#1890ff'
  },
  activeColor: {
    
  }
});

export default UserDetailTabs;
