import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { Avatar, Button, Touchable } from '@/components/index';
import { Navigator } from '@/utils/index';
import { IArticleDetail } from '@/types/CommonTypes';

interface IProps {
  articleDetail: IArticleDetail;
  modal?: boolean;
  goBack: () => void;
  handleFollow: () => void;
}

const ArticleDetailHead = (props: IProps) => {
  const { articleDetail, handleFollow } = props;
  const goUserProfile = () => {
    Navigator.goPage('UserDetail', { id: articleDetail.author._id });
  };
  return (
    <View style={styles.container}>
      <Touchable onPress={goUserProfile} style={styles.avatar}>
        <Avatar url={articleDetail.author.avatar_url} size={40} />
        <View style={styles.nickname}>
          <Text style={styles.nicknameText}>
            {articleDetail.author.nickname}
          </Text>
          <Text style={styles.dateText}>
            {moment(articleDetail.create_at).format('YYYY-MM-DD')}
          </Text>
        </View>
      </Touchable>
      <View style={styles.follow}>
        <Button
          type={articleDetail.following_state ? 'default' : 'primary'}
          title={articleDetail.following_state ? '已关注' : '关注'}
          height={30}
          fontSize={14}
          onPress={handleFollow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nickname: {
    marginHorizontal: 10
  },
  nicknameText: {
    color: '#333'
  },
  dateText: {
    marginTop: 5,
    color: '#999',
    fontSize: 12
  },
  follow: {},
  followBtn: {}
});

export default ArticleDetailHead;
