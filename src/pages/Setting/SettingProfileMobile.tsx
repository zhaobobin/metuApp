import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { RootState } from '@/models/index';
import { Navigator, Encrypt } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { layout } from '@/theme/index';

import { Button, Touchable, Toast } from '@/components/index';
import {
  FormItem,
  InputMobile,
  InputPassword,
  InputText,
  InputSmscode,
  CheckBox
} from '@/components/Form/index';

interface FormValues {
  mobile: string;
  password: string;
  smscode: string;
}

const initialValues = {
  mobile: '',
  password: '',
  smscode: ''
};

const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .trim()
    .length(11, '手机号格式有误')
    .required('请输入手机号'),
  password: Yup.string()
    .trim()
    .min(6, '密码长度不能小于6位')
    .max(20, '密码长度不能大于20位')
    .required('请输入密码'),
  smscode: Yup.string()
    .trim()
    .length(6, '验证码格式有误')
    .required('请输入验证码')
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['account/changeMobile']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class SettingProfileMobile extends React.Component<IProps> {
  onSubmit = (values: FormValues) => {
    this.onRegister(values);
  };

  onRegister = (values: FormValues) => {
    const payload: any = {
      ...values
    };
    if (!this.state.checked) {
      Toast.show('请勾选注册协议');
      return;
    }
    if (payload.password) {
      payload.password = Encrypt(payload.mobile, payload.password);
    }
    if (payload.smscode) {
      payload.smscode = Encrypt(payload.mobile, payload.smscode);
    }
    this.props.dispatch({
      type: 'account/changeMobile',
      payload,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Navigator.goPage('MainScreen');
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  toggleXieyi = () => {
    const checked = !this.state.checked;
    this.setState({
      checked
    });
  };

  toXieyi = () => {
    Navigator.goPage('RegisterXieyi');
  };

  goBack = () => {
    Navigator.goBack();
  };

  render() {
    const { loading } = this.props;
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
                    name="mobile"
                    placeholder="新手机号"
                    component={InputMobile}
                  />
                </FormItem>
                <FormItem style={styles.formItem}>
                  <Field
                    name="password"
                    placeholder="密码"
                    component={InputPassword}
                  />
                </FormItem>
                <FormItem style={styles.formItem}>
                  <Field
                    name="smscode"
                    render={(props: any) => (
                      <InputSmscode
                        {...props}
                        placeholder="验证码"
                        type="change"
                        mobile={props.form.values['mobile']}
                      />
                    )}
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
      </ScrollView>
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

export default connector(SettingProfileMobile);
