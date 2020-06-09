import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur';
import { RootStackNavigation, RootStackParamList } from '@/navigator/index';
import { RootState } from '@/models/index';
import UserDetailTabs from './UserDetailTabs';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['user/queryUserDetail'],
  userDetail: state.user.userDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<RootStackParamList, 'UserDetail'>;
  navigation: RootStackNavigation;
  headerHeight: number;
}

class UserDetail extends React.Component<IProps> {
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

  renderHeader = () => {
    const { headerHeight, userDetail } = this.props;
    return (
      <View style={[styles.header, { paddingTop: headerHeight }]}>
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
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <UserDetailTabs />
      </View>
    );
  }
}

function Wrapper(props: IProps) {
  const headerHeight = useHeaderHeight();
  return <UserDetail headerHeight={headerHeight} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 260,
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
