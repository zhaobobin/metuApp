import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { IPhoto } from '@/types/CommonTypes';
import { Navigator } from '@/utils/index';
import ChannelItem from '@/pages/Home/ChannelItem';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['home/queryChannel'],
  list: state.home.channel.list,
  hasMore: state.home.channel.pageInfo.has_more
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  circleId: string;
}

interface IState {
  refreshing: boolean;
}

class CircleDetailSelect extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    this.queryCircleList();
  }

  queryCircleList = (loadMore?: boolean) => {
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
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.queryCircleList();
  };

  loadMore = () => {
    const { hasMore, loading } = this.props;
    if (loading || !hasMore) return;
    this.queryCircleList(true);
  };

  renderItem = ({ item }: ListRenderItemInfo<IPhoto>) => {
    return <ChannelItem item={item} onPress={this.goPhotoDetail} />;
  };

  goPhotoDetail = (item: IPhoto) => {
    Navigator.goPage('PhotoDetail', { photo_id: item._id, modal: true });
  };

  _keyExtractor = (item: IPhoto) => item._id;

  render() {
    const { list } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connector(CircleDetailSelect);
