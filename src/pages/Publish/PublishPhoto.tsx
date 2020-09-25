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
import { Navigator } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { layout } from '@/theme/index';

import { Button, Touchable, Toast } from '@/components/index';
import { FormItem, InputText } from '@/components/Form/index';

interface FormValues {
  title: string;
  description?: string;
  tags: string;
  images: string[];
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, '标题不能小于2位')
    .max(20, '标题不能超过6位')
    .required('请输入标题'),
  description: Yup.string()
    .trim()
    .min(2, '描述不能小于2位')
    .max(6, '描述不能超过100位'),
  tags: Yup.string().trim().min(2, '标签不能小于2位')
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['publish/publishPhoto'],
  photoPublishForm: state.publish.photoPublishForm
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: AppStackNavigation;
  onRef?: (ref: any) => void;
  onSubmit: () => void;
}

class PublishPhoto extends React.Component<IProps> {
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    // console.log('PublishPhoto ---->', this.props.navigation)
    this.props.navigation.setParams({
      onPress: (values: FormValues) => {
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

  onSubmit = (values: FormValues) => {
    this.onPublish(values);
  };

  onPublish = (values: FormValues) => {
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
    const { loading, photoPublishForm } = this.props;
    const { title, description, tags, images } = photoPublishForm;
    const initialValues = {
      title: '',
      description: '',
      tags: '',
      images: []
    };

    return (
      <ScrollView style={styles.container}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={this.onSubmit}>
          {({ handleSubmit }) => {
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
                  {images.map((item, index) => (
                    <View key={index}>
                      <Image source={{
                        uri: `${item.url}`
                      }} style={styles.image} />
                    </View>
                  ))}
                  <FormItem style={styles.formItem}>
                    <Field
                      name="images"
                      placeholder="图片"
                      component={InputText}
                    />
                  </FormItem>
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
    backgroundColor: '#f9f9f9'
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

  },
  image: {

  }
});

export default connector(PublishPhoto);
