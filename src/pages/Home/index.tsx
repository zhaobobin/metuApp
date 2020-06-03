import React from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import { IPhoto } from '@/types/photo/IPhoto';
import Carousel from './Carsouel';
import Popular from './Popular';
import ChannelItem from './ChannelItem';

const mapStateToProps = (state: RootState) => ({
  channel: state.home.channel,
  loading: state.loading.effects['home/queryChannel']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
  componentDidMount() {
    this.getChannel();
  }

  getChannel = (page?: number, per_page?: number, loadMore?: boolean) => {
    this.props.dispatch({
      type: 'home/queryChannel',
      payload: {
        page,
        per_page,
        loadMore
      }
    });
  };

  refresh = () => {

  };

  loadMore = () => {
    const { channel } = this.props;
    const page = channel.pageInfo.page + 1;
    this.getChannel(page, 10, true);
  };

  renderHeader = () => {
    return (
      <View>
        <Carousel />
        <Popular onPress={this.goPhotoDetail} />
      </View>
    );
  };

  renderItem = ({ item }: ListRenderItemInfo<IPhoto>) => {
    return <ChannelItem item={item} onPress={this.goPhotoDetail} />;
  };

  goPhotoDetail = (item: IPhoto) => {
    this.props.navigation.navigate('Detail', { id: item._id });
  };

  _keyExtractor = (item: IPhoto) => item._id;

  render() {
    const { channel } = this.props;
    return (
      <FlatList
        data={channel.list}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.2}
      />
    );
  }
}

export default connector(Home);
