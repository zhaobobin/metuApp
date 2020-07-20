import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { RootState } from '@/models/index';
import { Navigator } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { layout } from '@/theme/index';

import { Button, Toast } from '@/components/index';
import {
  FormItem,
  InputText
} from '@/components/Form/index';

interface FormValues {
  headline: string;
}

const validationSchema = Yup.object().shape({
  headline: Yup.string()
    .trim()
    .min(2, '简介不能小于2个字')
    .max(20, '简介不能超过20个字')
    .required('请输入简介')
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['account/changeHeadline'],
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class SettingProfileHeadline extends React.Component<IProps> {

  onSubmit = (values: FormValues) => {
    this.changeHeadline(values);
  };

  changeHeadline = (values: FormValues) => {
    this.props.dispatch({
      type: 'account/changeProfile',
      payload: {
        headline: values.headline
      },
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Navigator.goBack();
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  render() {
    const { loading, currentUser } = this.props;
    const initialValues = {
      headline: currentUser.headline || ''
    };
    return (
      <View style={styles.container}>
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={this.onSubmit}>
            {({ handleSubmit }) => {
              return (
                <View>
                  <FormItem style={styles.formItem}>
                    <Field
                      name="headline"
                      placeholder="简介"
                      component={InputText}
                    />
                  </FormItem>
                  <View style={styles.btn}>
                    <Button
                      title="保存"
                      type="primary"
                      disabled={loading}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#fff'
  },
  formItem: {
    marginBottom: 20
  },
  btn: {
    ...layout.margin(20, 0, 0, 0)
  }
});

export default connector(SettingProfileHeadline);
