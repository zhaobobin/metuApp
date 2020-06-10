import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { HPageViewHoc } from 'react-native-head-tab-view';
import { IPhoto } from '@/types/CommonTypes';
import PhotoItem from '@/components/PhotoItem';
import { photoApi } from '@/api/index';

const HFlatList = HPageViewHoc(FlatList);

const connector = connect();

interface IProps {
  userId: string;
}

interface IState {
  list: IPhoto[];
  count: number;
  hasMore: boolean;
  page: number;
  per_page: number;
  loading: boolean;
  refreshing: boolean;
}

class UserPhotos extends React.Component<IProps, IState> {
  state = {
    list: [],
    count: 0,
    hasMore: true,
    page: 1,
    per_page: 10,
    loading: false,
    refreshing: false
  };

  componentDidMount() {
    this.queryUserPhotos();
  }

  queryUserPhotos = async (loadMore?: boolean) => {
    const { userId } = this.props;
    const { list, per_page } = this.state;
    let page = 1;
    if (loadMore) {
      page += 1;
    }
    const res = await photoApi.getUserPhotos({
      user_id: userId,
      page,
      per_page
    });
    console.log(res);
    if (res.code === 0) {
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
    this.queryUserPhotos();
  };

  loadMore = async () => {
    let { hasMore, loading } = this.state;
    if (loading || !hasMore) return;
    this.setState({
      loading: true
    });
    this.queryUserPhotos(true);
  };

  renderItem = ({ item }: ListRenderItemInfo<IPhoto>) => {
    return <PhotoItem item={item} onPress={this.goPhotoDetail} />;
  };

  goPhotoDetail = (item: IPhoto) => {
    // this.props.navigation.navigate('PhotoDetail', { item });
  };

  _keyExtractor = (item: IPhoto) => item._id;

  renderFooter = () => {
    const { list, hasMore, loading } = this.state;
    if (!hasMore) {
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
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <View style={styles.end}>
        <Text>暂无数据</Text>
      </View>
    );
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

export default connector(UserPhotos);
