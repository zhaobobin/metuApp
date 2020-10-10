import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { HPageViewHoc } from 'react-native-head-tab-view';
import { RootState } from '@/models/index';
import { Empty, UserinfoBar } from '@/components/index';
import { IUserInfo, IResponse } from '@/types/CommonTypes';
import { userApi } from '@/api/index';
import { Storage, ENV, Navigator } from '@/utils/index';

const HFlatList = HPageViewHoc(FlatList);

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  user_id: string;
}

interface IState {
  list: IUserInfo[];
  count: number;
  hasMore: boolean;
  page: number;
  per_page: number;
  loading: boolean;
  refreshing: boolean;
}

class UserFollowers extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      list: [],
      count: 0,
      hasMore: true,
      page: 1,
      per_page: 10,
      loading: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.queryUserFollowers();
  }

  queryUserFollowers = async (loadMore?: boolean) => {
    const { user_id } = this.props;
    const { list, per_page } = this.state;
    let page = 1;
    if (loadMore) {
      page += 1;
    }
    const res = await userApi.getUserFollowers({
      user_id,
      page,
      per_page
    });
    if (res.code === 0) {
      console.log(res.data);
      let newList = res.data.list;
      if (loadMore) {
        newList = list.concat(newList);
      }
      this.setState({
        list: newList,
        count: res.data.count,
        hasMore: res.data.hasMore,
        loading: false,
        refreshing: false
      });
    }
  };

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.queryUserFollowers();
  };

  loadMore = async () => {
    let { hasMore, loading } = this.state;
    if (loading || !hasMore) return;
    this.setState({
      loading: true
    });
    this.queryUserFollowers(true);
  };

  renderItem = ({ item }: ListRenderItemInfo<IUserInfo>) => {
    return <UserinfoBar userInfo={item} handleFollow={this.handleFollowUser} />;
  };

  handleFollowUser = () => {
    if (this.props.isAuth) {
      const { user_id } = this.props;
      this.props.dispatch({
        type: 'user/followUser',
        payload: {
          user_id
        },
        callback: (res: IResponse) => {}
      });
    } else {
      this.goLoginScreen();
    }
  };

  goLoginScreen = async () => {
    const route = {
      routeName: 'UserDetail',
      routeParam: { user_id: this.props.user_id, modal: true }
    };
    await Storage.set(ENV.storage.loginRedirect, JSON.stringify(route));
    Navigator.goPage('LoginScreen');
  };

  _keyExtractor = (item: IUserInfo) => item._id;

  renderFooter = () => {
    const { list, hasMore, loading } = this.state;
    if (!hasMore && list.length > 0) {
      return (
        <View style={styles.end}>
          <Text>已经没有了</Text>
        </View>
      );
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

  renderEmpty = () => {
    return <Empty />;
  };

  render() {
    const { list, refreshing } = this.state;
    return (
      <HFlatList
        {...this.props}
        data={list}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.2}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {},
  image: {},
  end: {
    alignItems: 'center',
    paddingVertical: 10
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10
  }
});

export default connector(UserFollowers);
