import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '@/navigator/MainNavigation';
import Icon from '@/assets/iconfont';
import { RootState } from '@/models/index';
import { Touchable, UserinfoBar } from '@/components/index';
import {
  Navigator,
  getStatusBarHeight,
  getBottomSpace,
  screenWidth
} from '@/utils/index';

import PhotoSwiper from './PhotoSwiper';
import PhotoDetailFoot from './PhotoDetailFoot';

const statusBarHeight = getStatusBarHeight();
const bottomSpace = getBottomSpace();

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
        <View style={styles.head}>
          <View style={styles.headBack}>
            {route.params.modal && (
              <Touchable onPress={this.goBack}>
                <Icon name="icon-close" size={30} color="#fff" />
              </Touchable>
            )}
          </View>
          <View style={styles.headCenter}>
            <UserinfoBar userInfo={photoDetail.author} />
          </View>
          <View style={styles.headRight}>
            <Icon name="icon-ellipsis" size={30} color="#fff" />
          </View>
        </View>
        <View style={styles.body}>
          <PhotoSwiper images={photoDetail.images} style={styles.swiper} />
        </View>
        <View style={styles.foot}>
          <PhotoDetailFoot />
        </View>

        {/* <Text>PhotoDetail</Text>
        <Text>标题: {photoDetail.title}</Text>
        <Text>id: {photoDetail._id}</Text>
        <Text>作者:</Text>
        <Touchable onPress={() => this.goUserPage(photoDetail.author._id)}>
          <Text>{photoDetail.author?.nickname}</Text>
        </Touchable> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative'
  },
  head: {
    width: screenWidth,
    height: statusBarHeight + 50,
    paddingHorizontal: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: statusBarHeight + 3,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  headBack: {
    // marginHorizontal: Platform.OS === 'android' ? 0 : 8
  },
  headCenter: {
    flex: 1,
    paddingHorizontal: 20
  },
  headRight: {},
  body: {
    flex: 1,
    backgroundColor: '#000'
  },
  swiper: {
    flex: 1,
    backgroundColor: '#111'
  },
  foot: {
    width: screenWidth,
    height: bottomSpace + 50,
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingBottom: bottomSpace,
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,.7)'
  }
});

export default connector(PhotoDetail);
