import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { screenWidth, Navigator } from '@/utils/index';
import { Touchable } from '@/components/index';
import { IResponse } from '@/types/CommonTypes';
import Icon from '@/assets/iconfont';
import { RootState } from '@/models/index';

export const itemWidth = (screenWidth - 20) / 5;
export const itemHeight = 50;

const mapStateToProps = (state: RootState) => ({
  photoDetail: state.photo.photoDetail,
  isAuth: state.account.isAuth,
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IState {
  favoring_state?: boolean;
  favor_number: number;
  comment_number: number;
  collecting_state?: boolean;
}

interface IProps extends ModelState {
  goLoginScreen: () => void;
}

class PhotoDetailFoot extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      favoring_state: props.photoDetail.favoring_state, // 点赞状态
      favor_number: 0, // 点赞数量
      comment_number: 0, // 评论数量
      collecting_state: props.photoDetail.collecting_state // 对应当前用户的收藏状态
    };
  }

  handleFavor = async () => {
    if (this.props.isAuth) {
      const { photoDetail } = this.props;
      const { favoring_state } = this.state;
      this.props.dispatch({
        type: 'photo/favorPhoto',
        payload: {
          photo_id: photoDetail._id,
          favoring_state: favoring_state
        },
        callback: (res: IResponse) => {
          this.setState({
            favoring_state: res.data.favoring_state
          });
        }
      });
    } else {
      this.props.goLoginScreen();
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
      const { collecting_state } = this.state;
      this.props.dispatch({
        type: 'photo/collectPhoto',
        payload: {
          photo_id: photoDetail._id,
          collecting_state: collecting_state
        },
        callback: (res: IResponse) => {
          this.setState({
            collecting_state: res.data.collecting_state
          });
        }
      });
    } else {
      this.props.goLoginScreen();
    }
  };

  handleShare = () => {
    if (this.props.isAuth) {
    } else {
      this.props.goLoginScreen();
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

  render() {
    const { favoring_state, collecting_state } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper} onPress={this.handleFavor}>
            <View style={styles.iconView}>
              <Icon
                name={favoring_state ? 'icon-favorites-fill' : 'icon-favorites'}
                size={30}
                color="#fff"
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>喜欢</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper} onPress={this.handleComment}>
            <View style={styles.iconView}>
              <Icon name="icon-comments" size={30} color="#fff" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>评论</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper} onPress={this.handleCollect}>
            <View style={styles.iconView}>
              <Icon
                name={
                  collecting_state ? 'icon-collection-fill' : 'icon-collection'
                }
                size={30}
                color="#fff"
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>收藏</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper} onPress={this.handleShare}>
            <View style={styles.iconView}>
              <Icon name="icon-share" size={30} color="#fff" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>分享</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper} onPress={this.handleNextPhotos}>
            <View style={styles.iconView}>
              <Icon name="icon-double-arro-right" size={30} color="#fff" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>下一组</Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  item: {
    width: itemWidth,
    height: itemHeight
  },
  itemWrapper: {
    flex: 1,
    marginHorizontal: 5,
    position: 'relative'
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footText: {
    color: '#fff',
    fontSize: 12
  }
});

export default connector(PhotoDetailFoot);