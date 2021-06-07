import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IUserInfo } from '@/types/CommonTypes';
import { Avatar, Touchable, Button } from '@/components/index';

interface IProps {
  item: IUserInfo;
  goUserProfile: (item: IUserInfo) => void;
  followUser: (item: IUserInfo) => void;
}

const CircleDetailMemberItem = (props: IProps) => {
  const { item, goUserProfile, followUser } = props;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Touchable onPress={() => goUserProfile(item)} activeOpacity={1}>
          <Avatar url={item.avatar_url} size={40} />
        </Touchable>
      </View>
      <View style={styles.center}>
        <View style={styles.nickname}>
          <Text style={styles.nicknameText}>{item.nickname}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Button
          type="primary"
          btnSize="small"
          title={'关注'}
          onPress={() => followUser(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row'
  },
  left: {
    width: 40,
    marginRight: 15
  },
  center: {
    flex: 1
  },
  nickname: {
    marginBottom: 10,
    flexDirection: 'row'
  },
  nicknameText: {
    fontSize: 14,
    color: '#333'
  },
  right: {
    width: 100,
    paddingRight: 10,
    justifyContent: 'center'
  }
});

export default CircleDetailMemberItem;
