import React from 'react';
import { ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import { Avatar, List } from '@/components/index';
const Item = List.Item;

const mapStateToProps = (state: RootState) => ({
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class SettingProfile extends React.Component<IProps> {
  goPage = (routeName: string) => {
    Navigator.goPage(routeName);
  };

  showAvatarMenu = () => {};

  render() {
    const { currentUser } = this.props;
    return (
      <ScrollView style={{ flex: 1 }}>
        <List>
          <Item
            extra={<Avatar url={currentUser.avatar_url} />}
            arrow="horizontal"
            onPress={this.showAvatarMenu}>
            头像
          </Item>
          <Item
            extra={currentUser.nickname}
            onPress={() => this.goPage('editNickname')}
            arrow="horizontal">
            昵称
          </Item>
          <Item
            extra={currentUser.address}
            onPress={() => this.goPage('editAddress')}
            arrow="horizontal">
            居住地
          </Item>
          <Item
            extra={currentUser.mobile}
            onPress={() => this.goPage('editMobile')}
            arrow="horizontal">
            手机号
          </Item>
          <Item onPress={() => this.goPage('editPassword')} arrow="horizontal">
            密码
          </Item>
        </List>

        <List renderHeader={'社交账号绑定'}>
          <Item arrow="horizontal">微信</Item>
          <Item arrow="horizontal">微博</Item>
          <Item arrow="horizontal">QQ</Item>
        </List>
      </ScrollView>
    );
  }
}

export default connector(SettingProfile);
