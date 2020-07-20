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
import { FormItem, InputPassword } from '@/components/Form/index';

interface FormValues {
  oldPassword: string;
  newPassword: string;
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .trim()
    .min(6, '密码长度不能小于6位')
    .max(20, '密码长度不能大于20位')
    .required('请输入旧密码'),
  newPassword: Yup.string()
    .trim()
    .min(6, '密码长度不能小于6位')
    .max(20, '密码长度不能大于20位')
    .required('请输入新密码')
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['account/changePsd'],
  currentUser: state.account.currentUser
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class SettingProfilePassword extends React.Component<IProps> {
  onSubmit = (values: FormValues) => {
    this.changeHeadline(values);
  };

  changeHeadline = (values: FormValues) => {
    this.props.dispatch({
      type: 'account/changePsd',
      payload: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
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
    const { loading } = this.props;
    const initialValues = {
      oldPassword: '',
      newPassword: ''
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
                    name="oldPassword"
                    placeholder="旧密码"
                    component={InputPassword}
                  />
                </FormItem>
                <FormItem style={styles.formItem}>
                  <Field
                    name="newPassword"
                    placeholder="新密码"
                    component={InputPassword}
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
    );
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

export default connector(SettingProfilePassword);
