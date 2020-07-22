import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '@/navigator/MainNavigation';
import Icon from '@/assets/iconfont';
import { RootState } from '@/models/index';
import { Touchable } from '@/components/index';
import { Navigator, getStatusBarHeight, getBottomSpace, screenWidth } from '@/utils/index';
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
        <View style={styles.head}>
          {
            route.params.modal &&
            <View style={styles.headBack}>
              <Touchable onPress={this.goBack}>
                <Icon name="icon-close" size={30} color="#fff" />
              </Touchable>
            </View>
          }
        </View>
        <View style={styles.body}>
          <PhotoSwiper images={photoDetail.images} style={styles.swiper} />
        </View>
        <View style={styles.foot}>

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
    height: 50,
    paddingHorizontal: 10,
    position: 'absolute',
    left: 0,
    top: getStatusBarHeight() + 3,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  headBack: {
    // marginHorizontal: Platform.OS === 'android' ? 0 : 8
  },
  body: {
    flex: 1
  },
  swiper: {
    flex: 1
  },
  foot: {
    width: screenWidth,
    height: 50,
    paddingHorizontal: 10,
    position: 'absolute',
    left: 0,
    bottom: getBottomSpace(),
    zIndex: 99,
    flexDirection: 'row',
    // backgroundColor: 'blue'
  }
});

export default connector(PhotoDetail);
