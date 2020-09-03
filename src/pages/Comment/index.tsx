/**
 * Commont
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '@/models/index';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { IComment } from '@/types/comment/CommentState';
import { Navigator, getBottomSpace } from '@/utils/index';
import Icon from '@/assets/iconfont';
import { Empty, Touchable } from '@/components/index';
import CommentListItem from './CommentListItem';

const bottomSpace = getBottomSpace();

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['comment/queryCommentList'],
  list: state.comment.commentList.list,
  count: state.comment.commentList.pageInfo.count,
  hasMore: state.comment.commentList.pageInfo.has_more
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'CommentScreen'>;
}

interface IState {
  refreshing: boolean;
}

class Commont extends React.Component<IProps, IState> {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.queryCommentList();
  }

  queryCommentList = (loadMore?: boolean) => {
    const { route } = this.props;
    this.props.dispatch({
      type: 'comment/queryCommentList',
      payload: {
        id: route.params.id,
        type: route.params.type,
        loadMore
      }
    });
  };

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.queryCommentList();
  };

  loadMore = () => {
    const { hasMore, loading } = this.props;
    if (loading || !hasMore) return;
    this.queryCommentList(true);
  };

  renderHeader = () => {
    return (
      <View style={styles.head}>
        <View style={styles.back}>
          <Touchable onPress={this.goBack} activeOpacity={1}>
            <Icon
              name="icon-arrow-down"
              size={30}
              color="#666"
              style={styles.headerBackImage}
            />
          </Touchable>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>评论</Text>
        </View>
      </View>
    );
  };

  renderFooter = () => {
    const { list, hasMore, loading } = this.props;
    if (!hasMore && list.length > 0) {
      return null;
    }
    if (loading && hasMore && list.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中...</Text>
        </View>
      );
    }
    return null;
  };

  _keyExtractor = (item: IComment) => item._id;

  renderItem = ({ item }: ListRenderItemInfo<IComment>) => {
    return <CommentListItem item={item} onPress={this.showCommentInput} />;
  };

  renderEmpty = () => {
    const { loading } = this.props;
    return <Empty loading={loading} text="暂无评论" />;
  };

  showCommentInput = () => {};

  goBack = () => {
    Navigator.goBack();
  };

  render() {
    const { list, count } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.back}>
            <Touchable onPress={this.goBack} activeOpacity={1}>
              <Icon
                name="icon-arrow-down"
                size={30}
                color="#666"
                style={styles.headerBackImage}
              />
            </Touchable>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{count} 条评论</Text>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            data={list}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.2}
          />
        </View>
        <View style={styles.foot}>
          <View style={styles.footView}>
            <Text>foot</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff'
  },
  head: {
    height: 50,
    flexDirection: 'row',
    position: 'relative',
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  back: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 9
  },
  title: {
    flex: 1,
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    color: '#333'
  },
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8
  },
  body: {
    flex: 1
  },
  end: {
    alignItems: 'center',
    paddingVertical: 10
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10
  },
  foot: {
    height: bottomSpace + 50,
    flexDirection: 'row',
    borderTopColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  footView: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connector(Commont);
