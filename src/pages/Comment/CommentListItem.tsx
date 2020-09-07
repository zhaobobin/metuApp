/**
 * CommentListItem
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IComment } from '@/types/comment/CommentState';
import { Avatar, Touchable, IconView } from '@/components/index';
import moment from 'moment';

interface IProps {
  item: IComment;
  goUserProfile: (item: IComment) => void;
  handleRelpy: (item: IComment) => void;
  handleFavor: (item: IComment) => void;
}

const CommentListItem = (props: IProps) => {
  const { item, goUserProfile, handleRelpy, handleFavor } = props;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Touchable onPress={() => goUserProfile(item)} activeOpacity={1}>
          <Avatar url={item.author.avatar_url} size={40} />
        </Touchable>
      </View>
      <View style={styles.right}>
        <Text style={styles.nicknameText}>{item.author.nickname}:</Text>
        <Touchable onPress={() => handleRelpy(item)}>
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
              onPress={() => handleRelpy(item)}
            />
            <IconView
              iconName="icon-favorites"
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
  nicknameText: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333'
  },
  contentText: {
    marginBottom: 20,
    fontSize: 14,
    color: '#666'
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
