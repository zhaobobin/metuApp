import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { RouteProp } from '@react-navigation/native';
import { LoginStackParamList } from '@/navigator/LoginNavigation';
import { RootState } from '@/models/index';
import { Encrypt, Navigator } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { layout } from '@/theme/index';

import { Button, Toast } from '@/components/index';
import {
  FormItem,
  InputPassword
} from '@/components/Form/index';

interface FormValues {
  password: string;
  rpassword: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .min(6, '密码长度不能小于6位')
    .max(20, '密码长度不能大于20位')
    .required('请输入密码'),
  rpassword: Yup.string()
    .trim()
    .min(6, '密码长度不能小于6位')
    .max(20, '密码长度不能大于20位')
    .required('请输入密码')
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['account/reset']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<LoginStackParamList, 'ResetPasswordStep3'>;
}

interface IState {
}

class ResetPassword extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  onSubmit = (values: FormValues) => {
    const { route } = this.props;
    if (values.password !== values.rpassword) {
      Toast.show('两次输入的密码必须一致');
      return;
    }
    const payload = {
      mobile: route.params.mobile,
      smscode: route.params.smscode,
      password: Encrypt(route.params.mobile, values.password)
    };
    this.props.dispatch({
      type: 'account/resetPsd',
      payload,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Toast.show(res.message);
          Navigator.goPage('LoginScreen', { screen: 'Login' });
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  render() {
    const { loading } = this.props;
    const initialValues = {
      password: '',
      rpassword: ''
    };
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={this.onSubmit}>
          {({ handleSubmit }) => {
            return (
              <View>
                <FormItem style={styles.formItem}>
                  <Field
                    name="password"
                    placeholder="旧密码"
                    component={InputPassword}
                  />
                </FormItem>
                <FormItem style={styles.formItem}>
                  <Field
                    name="rpassword"
                    placeholder="新密码"
                    component={InputPassword}
                  />
                </FormItem>
                <View style={styles.btn}>
                  <Button
                    title="发送验证码"
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
    paddingHorizontal: 15,
    paddingTop: 100
  },
  head: {
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: '#333'
  },
  body: {
    ...layout.margin(40, 0, 20, 0)
  },
  formItem: {
    marginBottom: 20
  },
  btn: {
    ...layout.margin(20, 0, 0, 0)
  }
});

export default connector(ResetPassword);
