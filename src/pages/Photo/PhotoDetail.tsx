import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { RootStackNavigation, RootStackParamList } from '@/navigator/index';
import { RootState } from '@/models/index';
import Touchable from '@/components/Touchable';
import PhotoSwiper from './PhotoSwiper';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['photo/queryPhotoDetail'],
  photoDetail: state.photo.photoDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<RootStackParamList, 'PhotoDetail'>;
  navigation: RootStackNavigation;
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
    this.props.navigation.navigate('UserDetail', { id });
  };

  render() {
    const { photoDetail } = this.props;
    // console.log(photoDetail);
    return (
      <View>
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

export default connector(PhotoDetail);
