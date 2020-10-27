import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { IMessageItem } from '@/types/MessageTypes';
import { Avatar, Touchable } from '@/components/index';
import { Navigator } from '@/utils/index';

interface IProps {
  item: IMessageItem;
  onPress: (item: IMessageItem) => void;
}

const MessageItem: React.FC<IProps> = (props) => {

  const { item } = props;

  const goUserDetail = (item: IMessageItem) => {
    Navigator.goPage('UserDetail', { id: item.send_from._id });
  }

  const goArticleDetail = (item: IMessageItem) => {
    Navigator.goPage('ArticleDetail', { article_id: item.article?._id, modal: true });
  }

  const goPhotoDetail = (item: IMessageItem) => {
    Navigator.goPage('PhotoDetail', { photo_id: item.photo?._id, modal: true });
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Touchable onPress={() => goUserDetail(item)}>
          <Avatar url={item.send_from.avatar_url} />
        </Touchable>
      </View>
      <View style={styles.center}>
        <View style={styles.content}>
          <Text style={styles.nameText}>{item.send_from.nickname}</Text>
          <Text style={styles.contentText}>{item.content}</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.dateText}>{moment(item.create_at).format('YYYY-MM-DD hh:mm')}</Text>
        </View>
      </View>
      <View style={styles.right}>
        {
          item.photo &&
          <Touchable onPress={() => goPhotoDetail(item)}>
            <Image source={{ uri: item.photo.thumb.url}} style={styles.image} />
          </Touchable>
        }
        {
          item.article &&
          <Touchable onPress={() => goArticleDetail(item)}>
            <Image source={{ uri: item.article.thumb}} style={styles.image} />
          </Touchable>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  left: {
    width: 50,
    height: 50
  },
  center: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameText: {
    marginRight: 15,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold'
  },
  contentText: {
    fontSize: 14,
    color: '#333',
  },
  date: {
    
  },
  dateText: {
    fontSize: 12,
    color: '#999'
  },
  right: {
    width: 50,
    height: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
    backgroundColor: '#ddd'
  },
});

export default MessageItem;
