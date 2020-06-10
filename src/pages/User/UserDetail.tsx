import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  LayoutChangeEvent
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur';
import { RootStackNavigation, RootStackParamList } from '@/navigator/index';
import { RootState } from '@/models/index';
import StickyHeader from '@/components/StickyHeader';
import UserDetailTabs from './UserDetailTabs';

const HEADER_HEIGHT = 260;

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['user/queryUserDetail'],
  userDetail: state.user.userDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<RootStackParamList, 'UserDetail'>;
  navigation: RootStackNavigation;
  headerTopHeight: number;
}

interface IState {
  scrollY: Animated.Value;
  headHeight: number;
}

class UserDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      headHeight: HEADER_HEIGHT
    };
  }

  componentDidMount() {
    this.getUserDetail();
  }

  getUserDetail = () => {
    const { route } = this.props;
    this.props.dispatch({
      type: 'user/queryUserDetail',
      payload: {
        id: route.params.id
      }
    });
  };

  onScroll = () => {
    const { scrollY } = this.state;
    Animated.event(
      [
        {
          nativeEvent: { contentOffset: { y: scrollY } } // 记录滑动距离
        }
      ],
      { useNativeDriver: true } // 使用原生动画驱动
    )
  }

  // Header
  renderHeader = () => {
    const { headerTopHeight, userDetail } = this.props;
    return (
      <View style={[styles.header, { paddingTop: headerTopHeight }]}>
        <Image
          source={{ uri: userDetail.cover_url }}
          style={styles.coverView}
        />
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
              {userDetail.headline}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { headHeight, scrollY } = this.state;
    console.log(headHeight)
    return (
      <Animated.ScrollView
        style={styles.container}
        onScroll={this.onScroll}
        scrollEventThrottle={1}>
        {/* 头部 banner */}
        {this.renderHeader()}
        {/* 顶部 tabBar 含FlatList */}
        <StickyHeader
          stickyHeaderY={headHeight} // 把头部高度传入
          stickyScrollY={scrollY} // 把滑动距离传入
        >
          <UserDetailTabs />
        </StickyHeader>
      </Animated.ScrollView>
    );
  }
}

function Wrapper(props: IProps) {
  const headerTopHeight = useHeaderHeight();
  return <UserDetail headerTopHeight={headerTopHeight} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerView: {},
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
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  nicknameText: {
    color: '#fff',
    fontSize: 18
  },
  text: {
    color: '#fff'
  }
});

export default connector(Wrapper);
