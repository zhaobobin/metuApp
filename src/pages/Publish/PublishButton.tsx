import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import Touchable from '@/components/Touchable';
import ENV from '@/config/env';
import { Navigator, Storage } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth,
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class PublishButton extends React.Component<IProps> {
  goPublish = async () => {
    const { isAuth } = this.props;
    if (isAuth) {
      Navigator.goPage('Publish');
    } else {
      const token = await Storage.get(ENV.storage.token);
      if (token) {
        this.props.dispatch({
          type: 'account/token',
          payload: {
            token
          },
          callback: (res: IResponse) => {
            if (res.code === 0) {
              Navigator.goPage('Publish');
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
      <Touchable style={styles.container} onPress={this.goPublish}>
        <Text style={styles.text}>发布</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: -8,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  text: {
    color: '#fff'
  }
});

export default connector(PublishButton);
