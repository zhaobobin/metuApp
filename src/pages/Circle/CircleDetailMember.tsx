import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { IUserInfo } from '@/types/CommonTypes';
import { Navigator } from '@/utils/index';
import CircleDetailMemberItem from './CircleDetailMemberItem';

const mapStateToProps = (state: RootState) => ({
  circleMembersList: state.circle.circleMembers.list
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  circleId: string;
}

interface IState {
  refreshing: boolean;
}

class CircleDetailMember extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    const { circleId } = this.props;
    this.queryCircleMembers(circleId);
  }

  queryCircleMembers = (circle_id: string, loadMore?: boolean) => {
    this.props.dispatch({
      type: 'circle/queryCircleMembers',
      payload: {
        circle_id,
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
    const { circleId } = this.props;
    this.queryCircleMembers(circleId);
  };

  _keyExtractor = (item: IUserInfo) => item._id;

  renderItem = ({ item }: ListRenderItemInfo<IUserInfo>) => {
    return (
      <CircleDetailMemberItem
        item={item} 
        goUserProfile={this.goUserProfile}
        followUser={this.followUser}
      />
    );
  }

  goUserProfile = (item: IUserInfo) => {
    Navigator.goPage('UserDetail', { id: item._id });
  }

  followUser = (item: IUserInfo) => {

  }

  render() {
    const { circleMembersList } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={circleMembersList}
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

export default connector(CircleDetailMember);
