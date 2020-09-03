import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { Avatar, Button, Touchable } from '@/components/index';
import { Navigator } from '@/utils/index';
import { IAuthor, IArticle, IPhoto, IResponse } from '@/types/CommonTypes';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth,
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  userInfo: IAuthor;
  detail: IArticle | IPhoto;
  height?: number;
  goLoginScreen: () => void;
}

interface IState {
  following_state?: boolean;
}

class UserinfoBar extends React.Component<IProps, IState> {
  static defaultProps = {
    height: 50
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      following_state: props.detail.following_state
    };
  }

  goUserProfile = () => {
    const { userInfo } = this.props;
    Navigator.goPage('UserDetail', { id: userInfo._id });
  };

  onPressFollow = () => {
    if (this.props.isAuth) {
      const { userInfo } = this.props;
      const { following_state } = this.state;
      this.props.dispatch({
        type: 'user/followUser',
        payload: {
          user_id: userInfo._id,
          following_state: following_state
        },
        callback: (res: IResponse) => {
          this.setState({
            following_state: res.data.following_state
          });
        }
      });
    } else {
      this.props.goLoginScreen();
    }
  };

  render() {
    const { userInfo } = this.props;
    const { following_state } = this.state;
    return (
      <View style={styles.container}>
        <Touchable onPress={this.goUserProfile} style={styles.avatar}>
          <Avatar url={userInfo.avatar_url} size={30} />
          <View style={styles.nickname}>
            <Text style={styles.nicknameText}>{userInfo.nickname}</Text>
          </View>
        </Touchable>
        <View style={styles.follow}>
          <Button
            type="primary"
            title={following_state ? '取消' : '关注'}
            height={24}
            fontSize={12}
            onPress={this.onPressFollow}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  avatar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nickname: {
    marginHorizontal: 10
  },
  nicknameText: {
    color: '#fff'
  },
  follow: {},
  followBtn: {}
});

export default connector(UserinfoBar);
