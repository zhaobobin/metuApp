import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { ICircleItem } from '@/types/CircleTypes';
import { Navigator } from '@/utils/index';
import CircleListItemCard from './CircleListItemCard';

const mapStateToProps = (state: RootState) => ({
  circleList: state.circle.circleList
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  circleId: string;
}

interface IState {
  refreshing: boolean;
}

class CircleList extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    this.queryCircleList();
  }

  queryCircleList = () => {
    this.props.dispatch({
      type: 'circle/queryCircleList',
      payload: {},
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

  _keyExtractor = (item: ICircleItem) => item._id;

  renderItem = ({ item }: ListRenderItemInfo<ICircleItem>) => {
    return (
      <CircleListItemCard
        item={item}
        onPress={this.goCircleDetail}
      />
    );
  }

  goCircleDetail = (circle_id: string) => {
    Navigator.goPage('CircleDetail', { circle_id });
  }

  render() {
    const { circleList } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={circleList}
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

export default connector(CircleList);
