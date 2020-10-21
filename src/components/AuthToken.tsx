/**
 * AuthToken
 */
import React from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { ENV, Navigator, Storage } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth,
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  routeName: string;
}

class AuthToken extends React.Component<IProps> {

  auth = async (routeName: string) => {
    const { isAuth } = this.props;
    if (isAuth) {
      Navigator.goPage(routeName);
    } else {
      const token = await Storage.get(ENV.storage.token);
      await Storage.set(
        ENV.storage.loginRedirect,
        JSON.stringify({ routeName })
      );
      if (token) {
        this.props.dispatch({
          type: 'account/token',
          payload: {
            token
          },
          callback: (res: IResponse) => {
            if (res.code === 0) {
              Navigator.goPage(routeName);
            } else {
              Navigator.goPage('LoginScreen');
            }
          }
        });
      } else {
        Navigator.goPage('LoginScreen');
      }
    }
  };

  render() {
    return (
      <View>{this.props.children}</View>
    );
  }
}

export default connector(AuthToken);
