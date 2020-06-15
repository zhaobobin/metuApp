import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { Navigator } from '@/utils/index';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth,
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class Account extends React.Component<IProps> {
  componentDidMount() {
    this.authLogin();
  }

  authLogin = () => {
    const { isAuth } = this.props;
    if (!isAuth) {
      Navigator.goPage('LoginScreen');
    }
  };

  render() {
    return (
      <View>
        <Text>Account</Text>
      </View>
    );
  }
}

export default connector(Account);
