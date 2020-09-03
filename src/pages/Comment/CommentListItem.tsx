/**
 * CommentListItem
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { IComment } from '@/types/comment/CommentState';
import { Avatar, Touchable } from '@/components/index';
import Icon from '@/assets/iconfont';
import moment from 'moment';

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  item: IComment;
  onPress: () => void;
}

class CommentListItem extends React.Component<IProps> {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Avatar url={item.author.avatar_url} size={40} />
        </View>
        <View style={styles.right}>
          <Text style={styles.nicknameText}>{item.author.nickname}:</Text>
          <Text style={styles.contentText}>{item.content}</Text>
          <View style={styles.foot}>
            <Text style={styles.dateText}>{moment(item.create_at).format('YYYY-MM-DD')}</Text>
            <Text style={styles.favorText}>
              <Icon name="icon-favorites" size={14} color="#999" />
              {item.favor_number}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

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
    fontSize: 14,
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
  favorText: {
    fontSize: 12,
    color: '#999'
  }
});

export default connector(CommentListItem);
