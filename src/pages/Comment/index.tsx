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
import { Storage, ENV, Navigator } from '@/utils/index';
import { Empty } from '@/components/index';

import CommentListHead from './CommentListHead';
import CommentListItem from './CommentListItem';
import CommentListFoot from './CommentListFoot';
import CommentModal, { CommentModalComponent } from './CommentModal';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['comment/queryCommentList'],
  list: state.comment.commentList.list,
  count: state.comment.commentList.pageInfo.count,
  hasMore: state.comment.commentList.pageInfo.has_more,
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'CommentScreen'>;
}

interface IState {
  isAuth: boolean;
  refreshing: boolean;
}

class Commont extends React.Component<IProps, IState> {
  private commentModalRef: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isAuth: props.isAuth,
      refreshing: false
    };
  }

  componentDidMount() {
    this.queryCommentList();
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.isAuth !== prevState.isAuth) {
      return {
        isAuth: nextProps.isAuth
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.state.isAuth !== prevState.isAuth) {
      this.queryCommentList();
    }
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
        handleReply={this.handleReplyComment}
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

  handleCreateComment = (item: IComment) => {
    if (this.state.isAuth) {
      this.commentModalRef.show(item);
    } else {
      this.goLoginScreen();
    }
  };

  submitCreateComment = (item: IComment) => {
    const { route } = this.props;
    this.props.dispatch({
      type: 'comment/create',
      payload: {
        category: route.params.type,
        detail_id: route.params.id,
        content: ''
      },
      callback: () => {
        this.onRefresh();
      }
    });
  };

  handleReplyComment = (item: IComment) => {
    if (this.state.isAuth) {
      this.commentModalRef.show(item);
    } else {
      this.goLoginScreen();
    }
  };

  submitReplyComment = (item: IComment) => {
    const { route } = this.props;
    this.props.dispatch({
      type: 'comment/reply',
      payload: {
        category: route.params.type,
        detail_id: route.params.id,
        comment_id: item._id,
        reply_to: '',
        content: ''
      },
      callback: () => {
        this.onRefresh();
      }
    });
  };

  showCommentModal = (item: IComment) => {
    const { route } = this.props;
  }

  handleFavor = (item: IComment) => {
    if (this.state.isAuth) {
      const { route } = this.props;
      this.props.dispatch({
        type: 'comment/favor',
        payload: {
          category: route.params.type,
          detail_id: route.params.id,
          comment_id: item._id,
          favoring_state: item.favoring_state
        }
      });
    } else {
      this.goLoginScreen();
    }
  };

  goLoginScreen = async () => {
    const { route } = this.props;
    const redirectRoute = {
      routeName: 'CommentScreen',
      routeParam: {
        id: route.params.id,
        type: route.params.type
      }
    };
    await Storage.set(ENV.storage.loginRedirect, JSON.stringify(redirectRoute));
    Navigator.goPage('LoginScreen');
  };

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
        <CommentModal onRef={ref => this.commentModalRef = ref} />
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
