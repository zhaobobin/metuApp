import React from 'react';
import { View, Text, ScrollView, Modal } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { ListItem } from 'react-native-elements';

import { MainStackNavigation } from '@/navigator/MainNavigation';
import { Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import Touchable from '@/components/Touchable';
import WhiteSpace from '@/components/WhiteSpace';
import Icon from '@/assets/iconfont';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: MainStackNavigation;
}

class Setting extends React.Component<IProps> {
  renderAccount = () => {
    const { currentUser } = this.props;
    return (
      <ListItem
        title={currentUser.nickname}
        leftAvatar={{ source: { uri: currentUser.avatar_url } }}
        rightIcon={<Icon name="icon-arrow-right" size={30} color="#999" />}
        onPress={() => this.goPage('SettingProfile')}
        bottomDivider
      />
    );
  };

  goPage = (routeName: string) => {
    Navigator.goPage(routeName);
  };

  logout = () => {
    this.props.dispatch({
      type: 'account/logout'
    });
    this.props.navigation.navigate('BottomTabs', { screen: 'HomePage' });
  };

  render() {
    return (
      <ScrollView>
        {this.renderAccount()}
        <WhiteSpace size="xl" />
        <Touchable onPress={this.logout}>
          <Text>退出登录</Text>
        </Touchable>
      </ScrollView>
    );
  }
}

export default connector(Setting);
