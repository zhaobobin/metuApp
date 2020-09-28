import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { selectPhotos } from '@/components/ImagePicker';
import { Touchable } from '@/components/index';
import { RouteProp } from '@react-navigation/native';
import { AppStackNavigation, AppStackParamList } from '@/navigator/AppNavigation';
import { IPublishType } from '@/types/publish/PublishState';
import { Navigator } from '@/utils/index';
import Icon from '@/assets/iconfont';

import HeaderRightButton from './HeaderRightButton';
import PublishArticle from './PublishArticle';
import PublishPhoto from './PublishPhoto';

const mapStateToProps = (state: RootState) => ({
  modalVisible: state.publish.modalVisible,
  publishType: state.publish.publishType
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: AppStackNavigation;
  route: RouteProp<AppStackParamList, 'PublishScreen'>;
}

interface IState { }

class Publish extends React.Component<IProps, IState> {
  private photoForm: any;
  private articleForm: any;
  constructor(props: IProps) {
    super(props);
    props.navigation.setOptions({
      headerRight: () => <HeaderRightButton onPress={this.submitPublish} />
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'publish/setState',
      payload: {
        modalVisible: true,
        publishType: null
      }
    })
  }

  changePublishType = (publishType: IPublishType) => {
    this.props.dispatch({
      type: 'publish/setState',
      payload: {
        modalVisible: false,
        publishType
      }
    })
  }

  openAlbum = async () => {
    const res = await selectPhotos();
    console.log(res)
  };

  // 打开图片发布
  openPhotoPublish = () => {

  }

  // 打开文章发布
  openArticlePublish = () => {

  }

  // 确定发布
  submitPublish = () => {
    const { publishType } = this.props;
    if (publishType === 'photo') {
      // console.log(this.props.photoPublishForm);
      this.photoForm.onPublish();
    } else {
      // this.articleForm.onPublish();
    }
  }

  goBack = () => {
    Navigator.goBack();
  }

  render() {
    const { navigation, modalVisible, publishType } = this.props;
    return (
      <View style={styles.container}>
        {
          publishType === 'article' &&
          <PublishArticle onSubmit={this.submitPublish} onRef={ref => this.articleForm = ref} navigation={navigation} />
        }
        {
          publishType === 'photo' &&
          <PublishPhoto onSubmit={this.submitPublish} onRef={ref => this.photoForm = ref} navigation={navigation} />
        }
        {
          modalVisible &&
          <View style={styles.modal}>
            <View style={styles.head}>
              <Touchable onPress={() => this.changePublishType('article')} style={styles.cate}>
                <Text>文章</Text>
              </Touchable>
              <Touchable onPress={() => this.changePublishType('photo')} style={styles.cate}>
                <Text>照片</Text>
              </Touchable>
            </View>
          </View>
        }
        <View style={styles.foot}>
          <Touchable onPress={this.goBack} style={styles.close}>
            <Icon name="icon-close" size={30} color="#666" />
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    ...StyleSheet.absoluteFillObject,
    zIndex: 88
  },
  head: {
    flexDirection: 'row'
  },
  cate: {
    margin: 50,
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  foot: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    zIndex: 99
  },
  close: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
})

export default connector(Publish);
