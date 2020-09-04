import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { PhotoStackParamList } from '@/navigator/PhotoScreen';
import Icon from '@/assets/iconfont';
import { RootState } from '@/models/index';
import { Touchable, UserinfoBar } from '@/components/index';
import {
  Navigator,
  Storage,
  ENV,
  getStatusBarHeight,
  getBottomSpace,
  screenWidth
} from '@/utils/index';

import PhotoSwiper from './PhotoSwiper';
import PhotoDetailFoot from './PhotoDetailFoot';
import { IResponse } from '@/types/CommonTypes';

const statusBarHeight = getStatusBarHeight();
const bottomSpace = getBottomSpace();

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['photo/queryPhotoDetail'],
  photoDetail: state.photo.photoDetail,
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<PhotoStackParamList, 'PhotoDetail'>;
}

class PhotoDetail extends React.Component<IProps> {
  componentDidMount() {
    const { photo_id } = this.props.route.params;
    this.getPhotoDetail(photo_id);
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.route.params.photo_id !== this.props.route.params.photo_id) {
      this.getPhotoDetail(nextProps.route.params.photo_id);
    }
    if (nextProps.isAuth !== this.props.isAuth) {
      this.getPhotoState(this.props.photoDetail._id);
    }
  }

  getPhotoDetail = (photo_id: string) => {
    this.props.dispatch({
      type: 'photo/queryPhotoDetail',
      payload: {
        photo_id
      }
    });
  };

  getPhotoState = (photo_id: string) => {
    this.props.dispatch({
      type: 'photo/queryPhotoState',
      payload: {
        photo_id
      }
    });
  };

  updatePhotoState = (payload: any) => {
    this.props.dispatch({
      type: 'photo/updatePhotoDetail',
      payload
    });
  };

  handleFollow = () => {
    if (this.props.isAuth) {
      const { photoDetail } = this.props;
      this.props.dispatch({
        type: 'user/followUser',
        payload: {
          user_id: photoDetail.author._id,
          following_state: photoDetail.following_state
        },
        callback: (res: IResponse) => {
          this.updatePhotoState(res.data);
        }
      });
    } else {
      this.goLoginScreen();
    }
  };

  handleFavor = async () => {
    if (this.props.isAuth) {
      const { photoDetail } = this.props;
      console.log(this.props.isAuth);
      this.props.dispatch({
        type: 'photo/favorPhoto',
        payload: {
          photo_id: photoDetail._id,
          favoring_state: photoDetail.favoring_state
        }
      });
    } else {
      this.goLoginScreen();
    }
  };

  handleComment = () => {
    Navigator.goPage('CommentScreen', {
      id: this.props.photoDetail._id,
      type: 'photos'
    });
  };

  handleCollect = async () => {
    if (this.props.isAuth) {
      const { photoDetail } = this.props;
      this.props.dispatch({
        type: 'photo/collectPhoto',
        payload: {
          photo_id: photoDetail._id,
          collecting_state: photoDetail.collecting_state
        }
      });
    } else {
      this.goLoginScreen();
    }
  };

  handleShare = () => {
    if (this.props.isAuth) {
    } else {
      this.goLoginScreen();
    }
  };

  handleNextPhotos = () => {
    const { photoDetail } = this.props;
    this.props.dispatch({
      type: 'photo/nextPhoto',
      payload: {
        photo_id: photoDetail._id
      }
    });
  };

  goLoginScreen = async () => {
    const route = {
      routeName: 'PhotoScreen',
      routeParam: {
        screen: 'PhotoDetail',
        params: { photo_id: this.props.photoDetail._id, modal: true }
      }
    };
    await Storage.set(ENV.storage.loginRedirect, JSON.stringify(route));
    Navigator.goPage('LoginScreen');
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
            <UserinfoBar
              userInfo={photoDetail.author}
              following_state={photoDetail.following_state}
              handleFollow={this.handleFollow}
            />
          </View>
          <View style={styles.headRight}>
            <Icon name="icon-ellipsis" size={30} color="#fff" />
          </View>
        </View>
        <View style={styles.body}>
          <PhotoSwiper
            images={photoDetail.images}
            title={photoDetail.title}
            style={styles.swiper}
            pagination={false}
          />
        </View>
        <View style={styles.foot}>
          <PhotoDetailFoot
            photoDetail={photoDetail}
            handleFavor={this.handleFavor}
            handleComment={this.handleComment}
            handleCollect={this.handleCollect}
            handleShare={this.handleShare}
            handleNextPhotos={this.handleNextPhotos}
          />
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
    flex: 1
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
