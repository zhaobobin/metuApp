/**
 * CommentListItem
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IComment } from '@/types/CommentTypes';
import { Avatar, Touchable, IconView } from '@/components/index';
import moment from 'moment';

interface IProps {
  item: IComment;
  goUserProfile: (item: IComment) => void;
  handleReply: (item: IComment) => void;
  handleFavor: (item: IComment) => void;
}

const CommentListItem = (props: IProps) => {
  const { item, goUserProfile, handleReply, handleFavor } = props;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Touchable onPress={() => goUserProfile(item)} activeOpacity={1}>
          <Avatar url={item.author.avatar_url} size={40} />
        </Touchable>
      </View>
      <View style={styles.right}>
        <View style={styles.head}>
          <Text style={styles.nicknameText}>{item.author.nickname}:</Text>
          {
            item.reply_to &&
            <>
              <Text style={styles.reply}>回复</Text>
              <Text style={styles.nicknameText}>{item.reply_to.nickname}</Text>
            </>
          }
        </View>
        <Touchable onPress={() => handleReply(item)}>
          <Text style={styles.contentText}>{item.content}</Text>
        </Touchable>
        <View style={styles.foot}>
          <Text style={styles.dateText}>
            {moment(item.create_at).format('YYYY-MM-DD')}
          </Text>
          <View style={styles.iconGroup}>
            <IconView
              iconName="icon-comments"
              style={styles.iconView}
              onPress={() => handleReply(item)}
            />
            <IconView
              iconName={item.favoring_state ? 'icon-favorites-fill' : 'icon-favorites'}
              text={item.favor_number}
              style={styles.iconView}
              onPress={() => handleFavor(item)}
            />
          </View>
        </View>
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
  right: {
    flex: 1,
    paddingRight: 10
  },
  reply: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#999'
  },
  nicknameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333'
  },
  contentText: {
    marginBottom: 20,
    fontSize: 14,
    color: '#666'
  },
  head: {
    marginBottom: 10,
    flexDirection: 'row'
  },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateText: {
    fontSize: 12,
    color: '#999'
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconView: {
    marginLeft: 20
  }
});

export default CommentListItem;
