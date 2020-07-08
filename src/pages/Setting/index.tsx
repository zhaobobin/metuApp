import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { ListItem } from 'react-native-elements';

import { MainStackNavigation } from '@/navigator/MainNavigation';
import { Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import Button from '@/components/Button';
import WhiteSpace from '@/components/WhiteSpace';
//import Modal from '@/components/modal';
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
    // Modal.alert('确定退出吗？', '', [
    //   {
    //     text: '取消',
    //     onPress: () => console.log('cancel'),
    //     style: 'cancel'
    //   },
    //   {
    //     text: '确定',
    //     onPress: () => {
    //       this.submitLogout();
    //     }
    //   }
    // ]);
  };

  submitLogout = () => {
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
  logout: {
    paddingVertical: 10,
    alignItems: 'center'
  }
});

export default connector(Setting);
