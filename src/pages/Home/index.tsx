import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import { IPhoto } from '@/types/CommonTypes';
import Carousel from './Carsouel';
import Popular from './Popular';
import ChannelItem from './ChannelItem';

const mapStateToProps = (state: RootState) => ({
  list: state.home.channel.list,
  hasMore: state.home.channel.pageInfo.has_more,
  loading: state.loading.effects['home/queryChannel']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  refreshing: boolean;
}

class Home extends React.Component<IProps, IState> {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.getChannel();
  }

  getChannel = (loadMore?: boolean) => {
    this.props.dispatch({
      type: 'home/queryChannel',
      payload: {
        loadMore
      },
      callback: () => {
        setTimeout(() => {
          this.setState({
            refreshing: false
          });
        }, 1000);
      }
    });
  };

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.getChannel();
  };

  loadMore = () => {
    const { hasMore, loading } = this.props;
    if (loading || !hasMore) return;
    this.getChannel(true);
  };

  renderItem = ({ item }: ListRenderItemInfo<IPhoto>) => {
    return <ChannelItem item={item} onPress={this.goPhotoDetail} />;
  };

  goPhotoDetail = (item: IPhoto) => {
    this.props.navigation.navigate('Detail', { id: item._id });
  };

  _keyExtractor = (item: IPhoto) => item._id;

  renderHeader = () => {
    return (
      <View>
        <Carousel />
        <Popular onPress={this.goPhotoDetail} />
      </View>
    );
  };

  renderFooter = () => {
    const { list, hasMore, loading } = this.props;
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
    const { loading } = this.props;
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
    const { list } = this.props;
    const { refreshing } = this.state;
    return (
      <FlatList
        data={list}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this.renderHeader}
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
  end: {
    alignItems: 'center',
    paddingVertical: 10
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10
  }
});

export default connector(Home);
