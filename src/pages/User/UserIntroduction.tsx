import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { userApi } from '@/api/index';

const mapStateToProps = (state: RootState) => ({
  userDetail: state.user.userDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  
}

class UserIntroduction extends React.Component<IProps> {
  state = {
    introduction: null
  }

  componentDidMount() {
    const { userDetail } = this.props;
    this.queryUserDetail(userDetail._id);
  }

  queryUserDetail = async (id: string) => {
    const res = await userApi.getUserDetail({ id });
    this.setState({
      introduction: res.data
    })
  }

  render() {
    return (
      <View>
        <Text>UserIntroduction</Text>
      </View>
    );
  }
}

export default connector(UserIntroduction);
