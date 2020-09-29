import React from 'react';
import { ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { ENV, Storage, Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import {
  Avatar,
  List,
  ListItem,
  pickAvatarImage,
  CityPicker
} from '@/components/index';
import { IImageFile } from '@/types/CommonTypes';

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
    pickAvatarImage((image: IImageFile) => {
      this.uploadOss(image);
    });
  };

  uploadOss = async (image: IImageFile) => {
    const option = {
      uid: this.props.currentUser._id,
      category: 'avatar',
      unix: new Date().getTime(),
      type: image.mime.split('/')[1]
    };
    const key = `${option.uid}/${option.category}.${option.type}`;
    let ossToken = await Storage.get(ENV.storage.ossToken, 7200);
    if (!ossToken) {
      ossToken = await this.props.dispatch({
        type: 'oss/token'
      });
    }
    const url = await this.props.dispatch({
      type: 'oss/upload',
      payload: {
        key,
        file: image.path,
        ossToken
      }
    });
    this.updateAvatar(url);
  };

  updateAvatar = (url: any) => {
    this.props.dispatch({
      type: 'account/updateAvatar',
      payload: {
        url
      }
    });
  };

  cityPickerCallback = (value: string) => {
    this.props.dispatch({
      type: 'account/changeProfile',
      payload: {
        location: value
      },
      callback: () => {}
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
            onPress={() => this.goPage('SettingProfileNickname')}
            arrow="horizontal">
            昵称
          </ListItem>
          <ListItem
            extra={currentUser.headline}
            onPress={() => this.goPage('SettingProfileHeadline')}
            arrow="horizontal">
            简介
          </ListItem>
          <CityPicker
            value={
              currentUser.location ? currentUser.location.split(',') : undefined
            }
            callback={this.cityPickerCallback}>
            <ListItem arrow="horizontal">居住地</ListItem>
          </CityPicker>
          <ListItem
            extra={currentUser.mobile}
            onPress={() => this.goPage('SettingProfileMobile')}
            arrow="horizontal">
            手机号
          </ListItem>
          <ListItem
            onPress={() => this.goPage('SettingProfilePassword')}
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
