import React from 'react';
import { ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import { Avatar, List, ListItem, ImagePicker, Toast } from '@/components/index';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['oss/upload'],
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class SettingProfile extends React.Component<IProps> {
  goPage = (routeName: string) => {
    Navigator.goPage(routeName);
  };

  showAvatarMenu = () => {
    ImagePicker()
      .then((response: any) => {
        // const base64 = 'data:image/jpeg;base64,' + response.data;
        const option = {
          uid: this.props.currentUser._id,
          category: 'avatar',
          unix: new Date().getTime(),
          type: response.type.split('/')[1],
        };
        const key = `${option.uid}/${option.category}.${option.type}`;
        this.props.dispatch({
          type: 'oss/upload',
          payload: {
            key,
            file: response.uri
          },
          callback: (url: string) => {
            console.log(url)
          }
        });
      })
      .catch(err => {
        Toast.show(err);
      });
  };

  render() {
    const { currentUser } = this.props;
    return (
      <ScrollView style={{ flex: 1 }}>
        <List>
          <ListItem
            extra={<Avatar url={currentUser.avatar_url} />}
            arrow="horizontal"
            onPress={this.showAvatarMenu}>
            头像
          </ListItem>
          <ListItem
            extra={currentUser.nickname}
            onPress={() => this.goPage('editNickname')}
            arrow="horizontal">
            昵称
          </ListItem>
          <ListItem
            extra={currentUser.address}
            onPress={() => this.goPage('editAddress')}
            arrow="horizontal">
            居住地
          </ListItem>
          <ListItem
            extra={currentUser.mobile}
            onPress={() => this.goPage('editMobile')}
            arrow="horizontal">
            手机号
          </ListItem>
          <ListItem
            onPress={() => this.goPage('editPassword')}
            arrow="horizontal">
            密码
          </ListItem>
        </List>

        <List renderHeader={'社交账号绑定'}>
          <ListItem arrow="horizontal">微信</ListItem>
          <ListItem arrow="horizontal">微博</ListItem>
          <ListItem arrow="horizontal">QQ</ListItem>
        </List>
      </ScrollView>
    );
  }
}

export default connector(SettingProfile);
