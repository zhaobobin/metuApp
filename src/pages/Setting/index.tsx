import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { MainStackNavigation } from '@/navigator/MainNavigation';
import { RootState } from '@/models/index';
import Touchable from '@/components/Touchable';
import { navigationRef } from '@/utils/Navigator';

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: MainStackNavigation;
}

class Setting extends React.Component<IProps> {
  logout = () => {
    this.props.dispatch({
      type: 'account/logout'
    });
    this.props.navigation.navigate('BottomTabs', { screen: 'HomePage' });
  };

  render() {
    return (
      <View>
        <Text>Setting</Text>
        <Touchable onPress={this.logout}>
          <Text>退出登录</Text>
        </Touchable>
      </View>
    );
  }
}

export default connector(Setting);
