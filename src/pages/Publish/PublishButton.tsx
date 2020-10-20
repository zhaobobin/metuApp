import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { Touchable } from '@/components/index';
import { ENV, Navigator, Storage } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { GlobalStyles } from '@/theme/index';
import Icon from '@/assets/iconfont';

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
      Navigator.goPage('PublishScreen');
    } else {
      const token = await Storage.get(ENV.storage.token);
      await Storage.set(
        ENV.storage.loginRedirect,
        JSON.stringify({
          routeName: 'PublishScreen'
        })
      );
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
        <Icon name="icon-add-select" size={40} color="#fff" />
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: -5,
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.color.blue
  },
  text: {
    color: '#666'
  }
});

export default connector(PublishButton);
