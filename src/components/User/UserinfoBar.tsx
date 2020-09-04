/**
 * UserinfoBar
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Touchable } from '@/components/index';
import { Navigator } from '@/utils/index';
import { IAuthor } from '@/types/CommonTypes';

interface IProps {
  userInfo: IAuthor;
  following_state?: boolean;
  height?: number;
  handleFollow: () => void;
}

const UserinfoBar = (props: IProps) => {
  const { userInfo, following_state, handleFollow } = props;
  const goUserProfile = () => {
    Navigator.goPage('UserDetail', { id: userInfo._id });
  };
  return (
    <View style={styles.container}>
      <Touchable onPress={goUserProfile} style={styles.avatar}>
        <Avatar url={userInfo.avatar_url} size={30} />
        <View style={styles.nickname}>
          <Text style={styles.nicknameText}>{userInfo.nickname}</Text>
        </View>
      </Touchable>
      <View style={styles.follow}>
        <Button
          type={following_state ? 'default' : 'primary'}
          title={following_state ? '已关注' : '关注'}
          height={24}
          fontSize={12}
          onPress={handleFollow}
        />
      </View>
    </View>
  );
};

UserinfoBar.defaultProps = {
  height: 50
};

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

export default UserinfoBar;
