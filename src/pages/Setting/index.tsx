import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Modal } from '@ant-design/react-native';

import { MainStackNavigation } from '@/navigator/MainNavigation';
import { Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import { Avatar, List, Button, WhiteSpace } from '@/components/index';
const Item = List.Item;

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
      <List>
        <Item
          thumb={<Avatar url={currentUser.avatar_url} />}
          arrow="horizontal"
          onPress={() => this.goPage('SettingProfile')}>
          {currentUser.nickname}
        </Item>
      </List>
    );
  };

  goPage = (routeName: string) => {
    Navigator.goPage(routeName);
  };

  logout = () => {
    Modal.alert('确定退出吗？', '', [
      {
        text: '取消',
        style: 'cancel'
      },
      {
        text: '确定',
        onPress: () => {
          this.submitLogout();
        }
      }
    ]);
  };

  submitLogout = () => {
    this.props.dispatch({
      type: 'account/logout'
    });
    this.props.navigation.navigate('BottomTabs', { screen: 'HomePage' });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderAccount()}
        <WhiteSpace size="xl" />
        <View style={styles.logout}>
          <Button
            title="退出登录"
            type="danger"
            width={120}
            ghost
            onPress={this.logout}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logout: {
    paddingVertical: 10,
    alignItems: 'center'
  }
});

export default connector(Setting);
