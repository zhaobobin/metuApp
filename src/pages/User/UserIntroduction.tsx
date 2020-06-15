import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { HPageViewHoc } from 'react-native-head-tab-view';
import { RootState } from '@/models/index';
import { userApi } from '@/api/index';

const HScrollView = HPageViewHoc(ScrollView);

const mapStateToProps = (state: RootState) => ({
  userDetail: state.user.userDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  userId: string;
}

class UserIntroduction extends React.Component<IProps> {
  state = {
    introduction: null
  };

  componentDidMount() {
    const { userDetail } = this.props;
    this.queryUserDetail(userDetail._id);
  }

  queryUserDetail = async (id: string) => {
    const res = await userApi.getUserDetail({ id });
    this.setState({
      introduction: res.data
    });
  };

  render() {
    return (
      <HScrollView {...this.props}>
        <Text>UserIntroduction</Text>
      </HScrollView>
    );
  }
}

export default connector(UserIntroduction);
