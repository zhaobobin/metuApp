import React from 'react';
import {
  View,
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
import { ENV, Storage, Navigator } from '@/utils/index';
import { IResponse, IImageFile } from '@/types/CommonTypes';
import { IPhotoPublishForm, IImageSchema } from '@/types/publish/PublishState';
import { layout, color, GlobalStyles } from '@/theme/index';

import { Toast } from '@/components/index';
import { FormItem, InputText } from '@/components/Form/index';
import PhotoPicker from '@/components/Photo/PhotoPicker';

export const parentWidth = GlobalStyles.screenWidth - 30;
export const itemWidth = parentWidth / 3 - 4;
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
  photoPickerImages: state.publish.photoPickerImages
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
    this.props.navigation.setParams({
      onPress: (values: IPhotoPublishForm) => {
        this.onSubmit(values);
      }
    });
  }

  savePublishPhotoForm = (payload: any) => {
    this.props.dispatch({
      type: 'publish/savePhotoFormValues',
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
    this.savePublishPhotoForm({ files: nativeEvent.text });
  };

  // 选择相册回调
  photoPickerCallback = async (files: IImageFile[]) => {
    let ossToken = await Storage.get(ENV.storage.ossToken, 7200);
    if (!ossToken) {
      ossToken = await this.props.dispatch({
        type: 'oss/token'
      });
    }
    for (const file of files) {
      this.uploadOss(file, ossToken);
    }
  };

  uploadOss = async (file: IImageFile, ossToken: any) => {
    const { photoPickerImages } = this.props;
    const option = {
      uid: this.props.currentUser._id,
      category: 'photo',
      unix: new Date().getTime(),
      type: file.mime.split('/')[1]
    };
    const key = `${option.uid}/${option.category}_${option.unix}.${option.type}`;
    const url: any = await this.props.dispatch({
      type: 'oss/upload',
      payload: {
        key,
        file: file.path,
        ossToken
      }
    });
    const image = {
      title: file.filename,
      description: '',
      tags: '',
      url,
      exif: {},
      width: file.width,
      height: file.height
    };
    const exif: any = await this.props.dispatch({
      type: 'oss/exif',
      payload: {
        url
      }
    });
    if (exif) {
      const exifInfo = {
        camera: {
          brand: exif.Model ? exif.Model.value.split(' ')[0] : '',
          brandName: exif.Model
            ? exif.Model.value.split(' ')[0].toLowerCase()
            : '',
          model: exif.Model ? exif.Model.value : '',
          modelName: exif.Model
            ? exif.Model.value.replace(/\s+/g, '-').toLowerCase()
            : ''
        },
        lens: {
          brand: exif.LensModel ? exif.LensModel.value.split(' ')[0] : '',
          brandName: exif.LensModel
            ? exif.LensModel.value.split(' ')[0].toLowerCase()
            : '',
          model: exif.LensModel ? exif.LensModel.value : '',
          modelName: exif.LensModel
            ? exif.LensModel.value.replace(/\s+/g, '-').toLowerCase()
            : ''
        },
        exposure: {
          FNumber: exif.FNumber ? exif.FNumber.value.split('/')[0] : '', // 光圈
          ExposureTime: exif.ExposureTime ? exif.ExposureTime.value : '', // 速度
          ISOSpeedRatings: exif.ISOSpeedRatings
            ? exif.ISOSpeedRatings.value
            : '' // iso
        }
      };
      image.exif = JSON.stringify(exifInfo);
    }

    photoPickerImages.push(image);
    this.savePhotoFormValues(photoPickerImages);
  };

  savePhotoFormValues = (images: IImageSchema[]) => {
    this.props.dispatch({
      type: 'publish/savePhotoFormValues',
      payload: {
        images
      }
    });
  };

  onSubmit = (values: IPhotoPublishForm) => {
    this.dispatchPublish(values);
  };

  onPublish = () => {
    const _this = this;
    const { photoFormValues } = this.props;
    if (photoFormValues.images.length > 0) {
      validationSchema
        .validate(photoFormValues)
        .then(function (values: any) {
          _this.dispatchPublish(values);
        })
        .catch(function (err) {
          Toast.info(err.errors[0], 2);
        });
    } else {
      Toast.info('请选择图片', 2);
    }
  };

  dispatchPublish = (values: IPhotoPublishForm) => {
    const payload: any = {
      ...values
    };
    if (!payload.thumb) {
      payload.thumb = {
        url: payload.images[0].url,
        width: payload.images[0].width,
        height: payload.images[0].height
      };
    }
    this.props.dispatch({
      type: 'publish/publishPhoto',
      payload,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Toast.info(res.message);
          this.resetPhotoFormValues();
          Navigator.goBack();
          Navigator.goPage('PhotoDetail', { photo_id: res.data, modal: true });
        } else {
          Toast.info(res.message);
        }
      }
    });
  };

  resetPhotoFormValues = () => {
    this.props.dispatch({
      type: 'publish/resetPhotoFormValues'
    });
  };

  render() {
    const { photoFormValues, photoPickerImages } = this.props;
    const initialValues = {
      ...photoFormValues
    };
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
                    <View key={index} style={styles.imageWrapper}>
                      <Image source={{ uri: item.url }} style={styles.image} />
                    </View>
                  ))}
                  <View style={styles.imageWrapper}>
                    <PhotoPicker
                      width={itemWidth}
                      height={itemHeight}
                      callback={this.photoPickerCallback}
                    />
                  </View>
                </View>
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
    paddingHorizontal: 15,
    marginBottom: 40
  },
  imageList: {
    marginHorizontal: -2,
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageWrapper: {
    margin: 2,
    borderColor: color.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    overflow: 'hidden'
  },
  image: {
    width: itemWidth,
    height: itemHeight
  }
});

export default connector(PublishPhoto);
