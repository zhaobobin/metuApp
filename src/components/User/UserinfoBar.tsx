import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { Avatar, Button, Touchable } from '@/components/index';
import { Navigator } from '@/utils/index';
import { IAuthor } from '@/types/CommonTypes';
import { color } from '@/theme/index';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  userInfo: IAuthor;
  height?: number;
}

class UserinfoBar extends React.Component<IProps> {
  static defaultProps = {
    height: 50
  };

  goUserProfile = () => {
    const { userInfo } = this.props;
    Navigator.goPage('UserDetail', { id: userInfo._id });
  }

  onPressFollow = () => {};

  render() {
    const { userInfo } = this.props;
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
            title={'关注'}
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
  followBtn: {
    
  }
});

export default connector(UserinfoBar);
