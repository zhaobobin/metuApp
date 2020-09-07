/**
 * Commont
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '@/models/index';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { IComment } from '@/types/comment/CommentState';
import { Navigator, getStatusBarHeight } from '@/utils/index';
import { Empty } from '@/components/index';

import CommentListHead from './CommentListHead';
import CommentListItem from './CommentListItem';
import CommentListFoot from './CommentListFoot';

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
  constructor(props: IProps) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

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
    return (
      <CommentListItem
        item={item}
        goUserProfile={this.goUserProfile}
        handleRelpy={this.handleRelpy}
        handleFavor={this.handleFavor}
      />
    );
  };

  renderEmpty = () => {
    const { loading } = this.props;
    return <Empty loading={loading} text="暂无评论" />;
  };

  goUserProfile = (item: IComment) => {
    Navigator.goPage('UserDetail', { id: item.author._id });
  };

  handleRelpy = (item: IComment) => {
    console.log(item)
  };

  handleFavor = (item: IComment) => {};

  goBack = () => {
    Navigator.goBack();
  };

  render() {
    const { loading, list, count } = this.props;
    if (loading) {
      return null;
    }
    return (
      <View style={styles.container}>
        <CommentListHead count={count} goBack={this.goBack} />
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
        />
        <CommentListFoot />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
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
  }
});

export default connector(Commont);
