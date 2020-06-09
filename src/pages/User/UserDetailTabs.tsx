import React from 'react';
import { TabView } from 'react-native-tab-view';

import UserPhotos from './UserPhotos';
import UserArticles from './UserArticles';
import UserFollowing from './UserFollowing';
import UserFavoring from './UserFavoring';
import UserCollecting from './UserCollecting';
import UserIntroduction from './UserIntroduction';

interface IRoute {
  key: string;
  title: string;
}

class UserDetailTabs extends React.Component {
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

  render() {
    const { routes, index } = this.state;
    return (
      <TabView
        navigationState={{ routes, index }}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScene}
      />
    );
  }
}

export default UserDetailTabs;
