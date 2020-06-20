import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur';
import { Tabbar, TabView, TabbarInfo } from 'react-native-head-tab-view';
import { RootState } from '@/models/index';
import { Navigator } from '@/utils/index';

import UserPhotos from '@/pages/User/UserPhotos';
import UserArticles from '@/pages/User/UserArticles';
import UserFollowing from '@/pages/User/UserFollowing';
import UserFavoring from '@/pages/User/UserFavoring';
import UserCollecting from '@/pages/User/UserCollecting';
import UserIntroduction from '@/pages/User/UserIntroduction';

const HEADER_HEIGHT = 300;

const Routes = [
  { key: 'photos', title: '图片' },
  { key: 'articles', title: '文章' },
  { key: 'following', title: '关注' },
  { key: 'favoring', title: '点赞' },
  { key: 'collecting', title: '收藏' },
  { key: 'introduction', title: '简介' }
];

let Tabs: string[] = [];
for (const i in Routes) {
  Tabs.push(Routes[i].key);
}

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['user/queryUserDetail'],
  isAuth: state.account.isAuth,
  userDetail: state.user.userDetail,
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  headerTopHeight: number;
}

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  tabs: string[];
  index: number;
}

class AccountDetail extends React.Component<IProps, IState> {
  state = {
    routes: Routes,
    tabs: Tabs,
    index: 0
  };

  componentDidMount() {
    this.getUserDetail();
  }

  getUserDetail = () => {
    const { currentUser } = this.props;
    this.props.dispatch({
      type: 'user/queryUserDetail',
      payload: {
        id: currentUser._id
      }
    });
  };

  // Header
  _renderHeader = () => {
    const { loading, userDetail, headerTopHeight } = this.props;
    return (
      <View style={[styles.header, { paddingTop: headerTopHeight }]}>
        {loading ? null : (
          <Image
            source={{
              uri: userDetail.cover_url + '?x-oss-process=style/thumb'
            }}
            style={styles.coverView}
          />
        )}
        <BlurView
          blurType="light"
          blurAmount={2}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.leftView}>
          <Image
            source={{ uri: userDetail.avatar_url }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.rightView}>
          <View style={styles.nickname}>
            <Text style={styles.nicknameText}>{userDetail.nickname}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text style={styles.text}>
                关注 {userDetail.following_number}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.text}>
                粉丝 {userDetail.followers_number}
              </Text>
            </View>
          </View>
          <View style={styles.headline}>
            <Text style={styles.text} numberOfLines={2}>
              {userDetail.headline || ''}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  _tabNameConvert = (key: string) => {
    const { routes } = this.state;
    let title = '';
    for (const i in routes) {
      if (key === routes[i].key) {
        title = routes[i].title;
      }
    }
    return title;
  };

  _renderTabBar = (props: TabbarInfo<IRoute>) => {
    return (
      <Tabbar
        {...props}
        tabs={Tabs}
        tabNameConvert={this._tabNameConvert}
        tabItemStyle={styles.tabItemStyle}
        lineStyle={styles.lineStyle}
      />
    );
  };

  // Scene
  _renderScene = (sceneProps: { item: string; index: number }) => {
    const { userDetail } = this.props;
    const userId = userDetail._id;
    switch (sceneProps.item) {
      case 'photos':
        return <UserPhotos {...sceneProps} userId={userId} />;
      case 'articles':
        return <UserArticles {...sceneProps} userId={userId} />;
      case 'following':
        return <UserFollowing {...sceneProps} userId={userId} />;
      case 'favoring':
        return <UserFavoring {...sceneProps} userId={userId} />;
      case 'collecting':
        return <UserCollecting {...sceneProps} userId={userId} />;
      case 'introduction':
        return <UserIntroduction {...sceneProps} userId={userId} />;
      default:
        break;
    }
  };

  goSettingPage = () => {
    Navigator.goPage('SettingScreen');
  };

  render() {
    const { headerTopHeight } = this.props;
    return (
      <View style={styles.container}>
        <TabView
          tabs={Tabs}
          averageTab={false}
          renderScrollHeader={this._renderHeader}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          frozeTop={headerTopHeight}
          makeHeaderHeight={() => {
            return HEADER_HEIGHT;
          }}
        />
      </View>
    );
  }
}

function Wrapper(props: IProps) {
  const headerTopHeight = useHeaderHeight();
  return <AccountDetail {...props} headerTopHeight={headerTopHeight} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  coverView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ddd'
  },
  leftView: {
    justifyContent: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff'
  },
  rightView: {
    flex: 1,
    paddingLeft: 26,
    justifyContent: 'space-around'
  },
  nickname: {},
  info: {
    flexDirection: 'row'
  },
  infoItem: {
    marginRight: 20
  },
  headline: {
    padding: 10,
    borderRadius: 8
  },
  nicknameText: {
    color: '#fff',
    fontSize: 18
  },
  text: {
    color: '#fff'
  },
  // TabBar
  tabItemStyle: {
    width: 90
  },
  lineStyle: {
    width: 20,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#1890ff'
  }
});

export default connector(Wrapper);
