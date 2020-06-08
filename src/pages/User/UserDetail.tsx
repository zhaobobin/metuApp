import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { RootStackNavigation, RootStackParamList } from '@/navigator/index';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['user/queryUserDetail'],
  userDetail: state.user.userDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<RootStackParamList, 'UserDetail'>;
  navigation: RootStackNavigation;
}

class UserDetail extends React.Component<IProps> {
  componentDidMount() {
    this.getUserDetail();
  }

  getUserDetail = () => {
    const { route } = this.props;
    this.props.dispatch({
      type: 'user/queryUserDetail',
      payload: {
        id: route.params.id
      }
    });
  };

  goUserPage = (id: string) => {
    this.props.navigation.navigate('UserDetail', { id });
  };

  render() {
    return (
      <View>
        <Text>userDetail</Text>
      </View>
    );
  }
}

export default connector(UserDetail);
