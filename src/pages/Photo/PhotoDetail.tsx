import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '@/navigator/MainNavigation';
import Icon from '@/assets/iconfont';
import { RootState } from '@/models/index';
import { Touchable } from '@/components/index';
import { Navigator } from '@/utils/index';
import PhotoSwiper from './PhotoSwiper';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['photo/queryPhotoDetail'],
  photoDetail: state.photo.photoDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<MainStackParamList, 'PhotoDetail'>;
}

class PhotoDetail extends React.Component<IProps> {
  componentDidMount() {
    this.getPhotoDetail();
  }

  getPhotoDetail = () => {
    const { route } = this.props;
    this.props.dispatch({
      type: 'photo/queryPhotoDetail',
      payload: {
        id: route.params.item._id
      }
    });
  };

  goUserPage = (id: string) => {
    Navigator.goPage('UserDetail', { id });
  };

  goBack = () => {
    Navigator.goBack();
  };

  render() {
    const { loading, photoDetail, route } = this.props;
    if (loading) {
      return null;
    }
    return (
      <View style={styles.container}>
        {
          route.params.modal &&
          <View style={styles.icon}>
            <Touchable onPress={this.goBack}>
              <Icon name="icon-close" size={30} color="#fff" />
            </Touchable>
          </View>
        }
        <PhotoSwiper images={photoDetail.images} />
        <Text>PhotoDetail</Text>
        <Text>标题: {photoDetail.title}</Text>
        <Text>id: {photoDetail._id}</Text>
        <Text>作者:</Text>
        <Touchable onPress={() => this.goUserPage(photoDetail.author._id)}>
          <Text>{photoDetail.author?.nickname}</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: Platform.OS === 'ios' ? 50 : 30,
    zIndex: 999,
    marginHorizontal: Platform.OS === 'android' ? 0 : 8
  }
});

export default connector(PhotoDetail);
