import React from 'react';
import {
  View,
  StyleSheet,
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
import { IArticlePublishForm } from '@/types/PublishTypes';
import { layout } from '@/theme/index';

import { Editor, Toast } from '@/components/index';
import { FormItem, InputText } from '@/components/Form/index';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('请输入标题')
    .min(2, '标题不能小于2位')
    .max(20, '标题不能超过6位'),
  content: Yup.string().trim().max(10000, '描述不能超过1万字')
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

  savePublishArticleForm = (payload: any) => {
    this.props.dispatch({
      type: 'publish/saveArticleFormValues',
      payload
    });
  };

  onChangeTitle = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.savePublishArticleForm({ title: nativeEvent.text });
  };

  onChangeDescription = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.savePublishArticleForm({ description: nativeEvent.text });
  };

  onChangeTags = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.savePublishArticleForm({ tags: nativeEvent.text });
  };

  onChangeContent = (html: string) => {
    console.log(html);
    this.savePublishArticleForm({ content: html });
  };

  onSubmit = (values: IArticlePublishForm) => {
    this.dispatchPublish(values);
  };

  onPublish = () => {
    const _this = this;
    const { articleFormValues } = this.props;
    validationSchema
      .validate(articleFormValues)
      .then(function (values: any) {
        _this.dispatchPublish(values);
      })
      .catch(function (err) {
        Toast.info(err.errors[0], 2);
      });
  };

  dispatchPublish = (values: IArticlePublishForm) => {
    const payload: any = {
      ...values
    };
    payload.content = `<div>${payload.content}</div>`;
    this.props.dispatch({
      type: 'publish/publishArticle',
      payload,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Toast.info(res.message);
          this.resetArticleFormValues();
          Navigator.goBack();
          Navigator.goPage('ArticleDetail', {
            article_id: res.data,
            modal: true
          });
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  resetArticleFormValues = () => {
    this.props.dispatch({
      type: 'publish/resetArticleFormValues'
    });
  };

  render() {
    const { articleFormValues } = this.props;
    const initialValues = {
      ...articleFormValues
    };
    return (
      <View style={styles.container}>
        <Formik
          ref="formikRef"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={this.onSubmit}>
          {() => {
            return (
              <View>
                <FormItem style={[styles.formItem, styles.title]}>
                  <Field
                    name="title"
                    placeholder="标题"
                    component={InputText}
                    onChange={this.onChangeTitle}
                  />
                </FormItem>
                <FormItem style={[styles.formItem, styles.content]}>
                  <Field
                    name="content"
                    placeholder="内容"
                    component={Editor}
                    onChange={this.onChangeContent}
                  />
                </FormItem>
              </View>
            );
          }}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    position: 'relative'
  },
  head: {
    alignItems: 'center'
  },
  title: {
    paddingHorizontal: 15
  },
  content: {
    paddingHorizontal: 5
  },
  body: {
    ...layout.margin(40, 0, 20, 0)
  },
  formItem: {
    marginBottom: 40
  }
});

export default connector(PublishArticle);
