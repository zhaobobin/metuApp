import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { Navigator, Storage, ENV } from '@/utils/index';
import { RootState } from '@/models/index';
import { GlobalStyles } from '@/theme/index';
import { IResponse } from '@/types/CommonTypes';
import { Loading } from '@/components/index';

import PhotoDetailHead from './PhotoDetailHead';
import PhotoSwiper from './PhotoSwiper';
import PhotoDetailFoot from './PhotoDetailFoot';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['photo/queryPhotoDetail'],
  photoDetail: state.photo.photoDetail,
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'PhotoDetail'>;
}

interface IState {
  isAuth: boolean;
  photo_id: string;
}

class PhotoDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAuth: props.isAuth,
      photo_id: props.photoDetail._id
    };
  }

  componentDidMount() {
    const { photo_id } = this.props.route.params;
    this.getPhotoDetail(photo_id);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'photo/clearPhotoDetail'
    });
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.route.params.photo_id !== prevState.photo_id) {
      return {
        photo_id: nextProps.route.params.photo_id
      };
    }
    if (nextProps.isAuth !== prevState.isAuth) {
      return {
        isAuth: nextProps.isAuth
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.state.photo_id !== prevState.photo_id) {
      this.getPhotoDetail(this.state.photo_id);
    }
    if (this.state.isAuth !== prevState.isAuth) {
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
    if (this.state.isAuth) {
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
    if (this.state.isAuth) {
      const { photoDetail } = this.props;
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
    if (this.state.isAuth) {
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
    if (this.state.isAuth) {
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
      routeName: 'PhotoDetail',
      routeParam: { photo_id: this.props.photoDetail._id, modal: true }
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
    const { photoDetail, route } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <PhotoDetailHead
            photoDetail={photoDetail}
            modal={route.params.modal}
            goBack={this.goBack}
            handleFollow={this.handleFollow}
          />
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
        {!photoDetail._id && <Loading theme="black" />}
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
    width: GlobalStyles.screenWidth,
    height: GlobalStyles.statusBarHeight + 50,
    paddingHorizontal: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: GlobalStyles.statusBarHeight,
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center'
  },
  body: {
    flex: 1
  },
  swiper: {
    flex: 1,
    backgroundColor: '#111'
  },
  foot: {
    width: GlobalStyles.screenWidth,
    height: GlobalStyles.bottomSpace + 50,
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingBottom: GlobalStyles.bottomSpace,
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,.7)'
  }
});

export default connector(PhotoDetail);
