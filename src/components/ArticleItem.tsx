import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { IArticle } from '@/types/CommonTypes';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont';

interface IProps {
  item: IArticle;
  onPress: (item: IArticle) => void;
}

class ArticleItem extends React.PureComponent<IProps> {
  onPressImage = () => {
    const { item, onPress } = this.props;
    onPress(item);
  };

  render() {
    const { item } = this.props;
    return (
      <Touchable style={styles.item} onPress={this.onPressImage}>
        {item.thumb ? (
          <Image
            source={{ uri: item.thumb }}
            style={styles.image}
          />
        ) : null}
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.user}>{item.author?.nickname}</Text>
          <View style={styles.info}>
            <View style={styles.view}>
              <Icon name="icon-browse" style={styles.icon} />
              <Text style={styles.text}>{item.view_number}</Text>
            </View>
            <View style={styles.favor}>
              <Icon name="icon-favorites" style={styles.icon} color="#888" />
              <Text style={styles.text}>{item.favor_number}</Text>
            </View>
            <View style={styles.comment}>
              <Icon name="icon-comments" style={styles.icon} />
              <Text style={styles.text}>{item.comment_number}</Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ddd',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5 // android 投影
  },
  image: {
    width: 140,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#ddd'
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },
  title: {
    marginBottom: 20,
    fontSize: 16,
    color: '#333'
  },
  user: {
    marginBottom: 15,
    fontSize: 12,
    color: '#888'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  favor: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 5,
    color: '#888'
  },
  text: {
    color: '#888'
  }
});

export default ArticleItem;
