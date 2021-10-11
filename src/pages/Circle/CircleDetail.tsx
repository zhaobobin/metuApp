import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Tabbar, TabView, TabbarInfo } from 'react-native-head-tab-view';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { RootState } from '@/models/index';
import { LeftBackButton, Button } from '@/components/index';
import { GlobalStyles } from '@/theme/index';
import { ENV, Storage, Navigator } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';

import CircleDetailPopular from '@/pages/Circle/CircleDetailPopular';
import CircleDetailNew from '@/pages/Circle/CircleDetailNew';
import CircleDetailSelect from '@/pages/Circle/CircleDetailSelect';
import CircleDetailMember from '@/pages/Circle/CircleDetailMember';

const Routes = [
  { key: 'popular', title: '热门' },
  { key: 'new', title: '最新' },
  { key: 'select', title: '精选' },
  { key: 'member', title: '成员' }
];

let Tabs: string[] = [];
for (const i in Routes) {
  Tabs.push(Routes[i].key);
}

interface IRoute {
  key: string;
  title: string;
}

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['circle/queryCircleDetail'],
  isAuth: state.account.isAuth,
  currentUser: state.account.currentUser,
  circleDetail: state.circle.circleDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'CircleDetail'>;
}

interface IState {
  routes: IRoute[];
  headerIconColor: string;
}

class CircleDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      headerIconColor: '#fff',
      routes: Routes
    };
  }

  componentDidMount() {
    const { route } = this.props;
    this.queryCircleDetail(route.params.circle_id);
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.isAuth && this.props.isAuth !== prevProps.isAuth) {
      this.checkJoinStatus();
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'circle/clearCircleDetail'
    });
  }

  queryCircleDetail = (circle_id: string) => {
    this.props.dispatch({
      type: 'circle/queryCircleDetail',
      payload: {
        circle_id
      }
    });
  };

  checkJoinStatus = () => {
    const { route, currentUser } = this.props;
    this.props.dispatch({
      type: 'circle/checkJoinStatus',
      payload: {
        circle_id: route.params.circle_id,
        user_id: currentUser._id
      }
    });
  };

  // 加入圈子
  handleClickCircleJoinBtn = async () => {
    const { isAuth, route } = this.props;
    const circleId = route.params.circle_id;
    if (isAuth) {
      this.joinCircle(circleId);
    } else {
      await Storage.set(
        ENV.storage.loginRedirect,
        JSON.stringify({
          routeName: 'CircleDetail',
          routeParam: { circle_id: circleId }
        })
      );
      const token = await Storage.get(ENV.storage.token);
      if (token) {
        this.props.dispatch({
          type: 'account/token',
          payload: {
            token
          },
          callback: (res: IResponse) => {
            if (res.code === 0) {
              this.joinCircle(circleId);
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

  joinCircle = (circleId: string) => {
    const { circleDetail } = this.props;
    this.props.dispatch({
      type: circleDetail?.following_state
        ? 'circle/exitCircle'
        : 'circle/joinCircle',
      payload: {
        circle_id: circleId
      }
    });
  };

  getParallaxRenderConfig = () => {
    const { circleDetail } = this.props;
    const { headerIconColor } = this.state;
    const config = {
      renderBackground: () => (
        <View key="background">
          <Image
            source={{
              uri: circleDetail?.avatar_url,
              width: GlobalStyles.screenWidth,
              height: PARALLAX_HEADER_HEIGHT
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: GlobalStyles.screenWidth,
              backgroundColor: 'rgba(0,0,0,.4)',
              height: PARALLAX_HEADER_HEIGHT
            }}
          />
        </View>
      ),
      renderForeground: () => (
        <View key="parallax-header" style={styles.parallaxHeader}>
          <View style={styles.circleName}>
            <Text style={styles.circleNameText}>#{circleDetail?.name}</Text>
          </View>
          <View style={styles.circleDesc}>
            <Text style={styles.whiteText}>{circleDetail?.description}</Text>
          </View>
          <View style={styles.circleInfo}></View>
          <View style={styles.circleJoinBtn}>
            <Button
              title={circleDetail?.following_state ? '已加入' : '立即加入'}
              ghost
              onPress={this.handleClickCircleJoinBtn}
            />
          </View>
        </View>
      ),
      renderStickyHeader: () => (
        <View key="sticky-header" style={styles.stickySection}>
          <Text style={styles.stickySectionText}>{circleDetail?.name}</Text>
        </View>
      ),
      renderFixedHeader: () => (
        <View key="fixed-header" style={styles.fixedSection}>
          <LeftBackButton color={headerIconColor} />
        </View>
      )
    };
    return config;
  };

  onChangeHeaderVisibility = (visible: boolean) => {
    const { headerIconColor } = this.state;
    const iconColor = visible ? '#fff' : '#333';
    if (iconColor !== headerIconColor) {
      this.setState({
        headerIconColor: iconColor
      });
    }
  };

  // 渲染tabs标题
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
    const circleId = this.props.route.params.circle_id;
    switch (sceneProps.item) {
      case 'popular':
        return <CircleDetailPopular {...sceneProps} circleId={circleId} />;
      case 'new':
        return <CircleDetailNew {...sceneProps} circleId={circleId} />;
      case 'select':
        return <CircleDetailSelect {...sceneProps} circleId={circleId} />;
      case 'member':
        return <CircleDetailMember {...sceneProps} circleId={circleId} />;
      default:
        break;
    }
  };

  renderContentView = () => {
    return (
      <TabView
        tabs={Tabs}
        averageTab={false}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        makeHeaderHeight={() => {
          return 0;
        }}
      />
    );
  };

  render() {
    const renderConfig = this.getParallaxRenderConfig();
    return (
      <ParallaxScrollView
        backgroundColor="#fff"
        contentBackgroundColor="#fff"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        onChangeHeaderVisibility={this.onChangeHeaderVisibility}
        {...renderConfig}>
        <View style={styles.contentView}>{this.renderContentView()}</View>
      </ParallaxScrollView>
    );
  }
}

const PARALLAX_HEADER_HEIGHT = 300;
const CONTENT_VIEW_HEIGHT = GlobalStyles.is_IphoneX
  ? GlobalStyles.screenHeight - PARALLAX_HEADER_HEIGHT - 65
  : GlobalStyles.screenHeight - PARALLAX_HEADER_HEIGHT;
const TOP = Platform.OS === 'ios' ? 20 + (GlobalStyles.is_IphoneX ? 24 : 0) : 0;
const STICKY_HEADER_HEIGHT =
  Platform.OS === 'ios'
    ? GlobalStyles.nav_bar_height_ios + TOP
    : GlobalStyles.nav_bar_height_android;
console.log(CONTENT_VIEW_HEIGHT);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  contentView: {
    height: CONTENT_VIEW_HEIGHT
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: GlobalStyles.screenWidth,
    height: PARALLAX_HEADER_HEIGHT
  },
  parallaxHeader: {
    paddingTop: 100,
    paddingBottom: 15,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    paddingTop: TOP + 6,
    alignItems: 'center',
    position: 'relative'
  },
  stickySectionText: {
    color: '#333',
    fontSize: 20
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingTop: TOP - 14,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  circleName: {
    marginBottom: 10
  },
  circleDesc: {
    marginBottom: 10
  },
  circleInfo: {
    marginBottom: 20
  },
  circleJoinBtn: {},
  circleNameText: {
    fontSize: 18,
    color: '#fff'
  },
  whiteText: {
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

export default connector(CircleDetail);
