import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { AppStackNavigation } from '@/navigator/AppNavigation';
import { RootState } from '@/models/index';
import { ENV, Storage, Navigator, screenWidth } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { IPhotoPublishForm } from '@/types/publish/PublishState';
import { IImagePickerResponse } from '@/types/CommonTypes';
import { layout } from '@/theme/index';

import { Button, Touchable, Toast } from '@/components/index';
import { FormItem, InputText } from '@/components/Form/index';
import PhotoPicker from '@/components/Photo/PhotoPicker';

export const parentWidth = screenWidth - 20;
export const itemWidth = parentWidth / 3;
export const itemHeight = itemWidth;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('请输入标题')
    .min(2, '标题不能小于2位')
    .max(20, '标题不能超过6位'),
  description: Yup.string().trim().max(100, '描述不能超过100位')
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['publish/publishPhoto'],
  currentUser: state.account.currentUser,
  photoFormValues: state.publish.photoFormValues,
  photoPickerImages: state.publish.photoPickerImages,
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: AppStackNavigation;
  onRef?: (ref: any) => void;
  onSubmit: () => void;
}

class PublishPhoto extends React.Component<IProps> {
  private formRef = React.createRef();

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    // console.log('PublishPhoto ---->', this.props.navigation)
    this.props.navigation.setParams({
      onPress: (values: IPhotoPublishForm) => {
        this.onSubmit(values);
      }
    });
  }

  savePublishPhotoForm = (payload: any) => {
    this.props.dispatch({
      type: 'publish/savePhotoPublishForm',
      payload
    });
  };

  onChangeTitle = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.savePublishPhotoForm({ title: nativeEvent.text });
  };

  onChangeDescription = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.savePublishPhotoForm({ description: nativeEvent.text });
  };

  onChangeTags = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.savePublishPhotoForm({ tags: nativeEvent.text });
  };

  onChangeImages = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.savePublishPhotoForm({ images: nativeEvent.text });
  };

  // 选择相册回调
  photoPickerCallback = async (images: IImagePickerResponse) => {
    const { photoPickerImages } = this.props;
    let ossToken = await Storage.get(ENV.storage.ossToken, 7200);
    if (!ossToken) {
      ossToken = await this.props.dispatch({
        type: 'oss/token'
      });
    }
    
  };

  uploadOss = async (image: IImagePickerResponse) => {
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
    this.props.dispatch({
      type: 'oss/upload',
      payload: {
        key,
        file: image.path,
        ossToken
      },
      callback: (url: string) => {
        console.log(url)
      }
    });
  };

  onSubmit = (values: IPhotoPublishForm) => {
    this.dispatchPublish(values);
  };

  onPublish = () => {
    const { photoFormValues } = this.props;
    validationSchema
      .validate(photoFormValues)
      .then(function (value) {
        console.log(value);
      })
      .catch(function (err) {
        Toast.info(err.errors[0], 2);
      });
  };

  dispatchPublish = (values: IPhotoPublishForm) => {
    const payload: any = {
      ...values
    };
    this.props.dispatch({
      type: 'publish/publishPhoto',
      payload,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          // todo
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  render() {
    const { loading, photoFormValues, photoPickerImages } = this.props;
    const { title, description, tags, images } = photoFormValues;
    const initialValues = {
      ...photoFormValues
    };
    // const pickerImages: any = [];
    // if (pickerImages.length > 0) {
    //   for(const image of photoPickerImages) {
    //     pickerImages.push({ path: require(image.path) });
    //   }
    // }
    
    return (
      <ScrollView style={styles.container}>
        <Formik
          ref="formikRef"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={this.onSubmit}>
          {() => {
            return (
              <View>
                <FormItem style={styles.formItem}>
                  <Field
                    name="title"
                    placeholder="标题"
                    component={InputText}
                    onChange={this.onChangeTitle}
                  />
                </FormItem>
                <FormItem style={styles.formItem}>
                  <Field
                    name="description"
                    placeholder="描述"
                    component={InputText}
                    onChange={this.onChangeDescription}
                  />
                </FormItem>
                <FormItem style={styles.formItem}>
                  <Field
                    name="tags"
                    placeholder="标签"
                    component={InputText}
                    onChange={this.onChangeTags}
                  />
                </FormItem>
                <View style={styles.imageList}>
                  {photoPickerImages.map((item: any, index: number) => (
                    <View key={index}>
                      <Image
                        source={{uri: item.path}}
                        style={styles.image}
                      />
                    </View>
                  ))}
                  <PhotoPicker
                    width={itemWidth}
                    height={itemHeight}
                    callback={this.photoPickerCallback}
                  />
                  {/* <FormItem style={styles.formItem}>
                    <Field
                      name="images"
                      placeholder="图片"
                      component={InputText}
                    />
                  </FormItem> */}
                </View>
                {/* <View style={styles.btn}>
                    <Button
                      title="发布"
                      type="primary"
                      disabled={loading}
                      onPress={handleSubmit}
                    />
                  </View> */}
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 50,
    backgroundColor: '#fff'
  },
  head: {
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    color: '#333'
  },
  body: {
    ...layout.margin(40, 0, 20, 0)
  },
  formItem: {
    marginBottom: 40
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: itemWidth,
    height: itemHeight
  }
});

export default connector(PublishPhoto);
