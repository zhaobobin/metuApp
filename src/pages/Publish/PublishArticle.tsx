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
import { IArticlePublishForm } from '@/types/publish/PublishState';
import { layout } from '@/theme/index';

import { Button, Touchable, Toast } from '@/components/index';
import { FormItem, InputText } from '@/components/Form/index';


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
  articleFormValues: state.publish.articleFormValues
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: AppStackNavigation;
  onRef?: (ref: any) => void;
  onSubmit: () => void;
}

class PublishArticle extends React.Component<IProps> {
  private formRef = React.createRef();

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    // console.log('PublishPhoto ---->', this.props.navigation)
    this.props.navigation.setParams({
      onPress: (values: IArticlePublishForm) => {
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

  onChangeContent = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.savePublishPhotoForm({ content: nativeEvent.text });
  };

  onSubmit = (values: IArticlePublishForm) => {
    this.dispatchPublish(values);
  };

  onPublish = () => {
    const { articleFormValues } = this.props
    validationSchema
      .validate(articleFormValues)
      .then(function (value) {
        console.log(value);
      })
      .catch(function (err) {
        Toast.info(err.errors[0], 2);
      });
    
  };

  dispatchPublish = (values: IArticlePublishForm) => {
    const payload: any = {
      ...values
    };
    this.props.dispatch({
      type: 'publish/publishArticle',
      payload,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          // todo
        } else {
          Toast.show(res.message);
        }
      }
    });
  }

  render() {
    const { loading, articleFormValues } = this.props;
    const { title, description, tags, content } = articleFormValues;
    const initialValues = {
      ...articleFormValues
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
                  <FormItem style={styles.formItem}>
                    <Field
                      name="content"
                      placeholder="内容"
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
  imageList: {},
  image: {}
});

export default connector(PublishArticle);
