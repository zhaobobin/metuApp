/**
 * 首页 - 关注
 */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { MainStackNavigation } from '@/navigator/MainNavigation';
import { RootState } from '@/models/index';
import { IPhoto } from '@/types/CommonTypes';
import { Empty } from '@/components/index';
import { Navigator } from '@/utils/index';
import Carousel from './Carsouel';
import ChannelItem from './ChannelItem';
import { sliderHeight } from './Carsouel';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['home/queryChannel'],
  list: state.home.channel.list,
  gradientVisible: state.home.gradientVisible,
  hasMore: state.home.channel.pageInfo.has_more
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: MainStackNavigation;
}

interface IState {
  refreshing: boolean;
}

class Following extends React.Component<IProps, IState> {
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
    Navigator.goPage('PhotoScreen', {
      screen: 'PhotoDetail',
      params: { photo_id: item._id, modal: true }
    });
  };

  _keyExtractor = (item: IPhoto) => item._id;

  renderHeader = () => {
    return (
      <View>
        <Carousel />
      </View>
    );
  };

  renderFooter = () => {
    const { list, hasMore, loading } = this.props;
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
    const { loading } = this.props;
    return <Empty loading={loading} />;
  };

  onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < sliderHeight;
    const { gradientVisible } = this.props;
    if (gradientVisible !== newGradientVisible) {
      this.props.dispatch({
        type: 'home/setState',
        payload: {
          gradientVisible: newGradientVisible
        }
      });
    }
  };

  render() {
    const { list } = this.props;
    const { refreshing } = this.state;
    return (
      <FlatList
        data={list}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.2}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
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

export default connector(Following);
