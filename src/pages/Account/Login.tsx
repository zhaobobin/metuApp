import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik } from 'formik';

import { RootState } from '@/models/index';
import { ENV, Storage, Navigator, Encrypt } from '@/utils/index';
import { layout } from '@/theme/index';
import Touchable from '@/components/Touchable';
import Button from '@/components/Button';

import {
  FormItem,
  InputMobile,
  InputPassword,
  CheckBox
} from '@/components/Form/index';
import { IResponse } from '@/types/CommonTypes';

interface FormValues {
  mobile: string;
  password: string;
}

const initialValues = {
  mobile: '',
  password: ''
};

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['account/login']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  changeTabKey: () => void;
}

interface IState {
  title: string;
  loginType: 'psd' | 'sms';
  checked: boolean;
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: '密码登录',
      loginType: 'psd',
      checked: false
    };
  }

  goRegister = () => {
    Navigator.goPage('Register');
  };

  goBack = () => {
    Navigator.goBack();
  };

  // 手机号
  mobileCallback = (value: string, err?: string) => {
    if (err) {
    } else {
    }
  };

  // 密码
  passwordCallback = (value: string, err?: string) => {
    if (err) {
    } else {
    }
  };

  onSubmit = (values: FormValues) => {
    this.onLogin(values);
  };

  onLogin = (values: FormValues) => {
    const payload: any = values;
    if (this.state.checked) {
      Storage.set(ENV.storage.lastTel, payload.mobile);
    }
    if (payload.password) {
      payload.password = Encrypt(payload.mobile, payload.password);
    }
    if (payload.smscode) {
      payload.smscode = Encrypt(payload.mobile, payload.smscode);
    }
    payload.loginType = this.state.loginType;
    this.props.dispatch({
      type: 'account/login',
      payload: values,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Navigator.goBack();
        } else {
        }
      }
    });
  };

  toggleRemeber = () => {
    const checked = !this.state.checked;
    this.setState({
      checked
    });
  };

  toReset = () => {
    Navigator.goPage('ResetPassword');
  };

  render() {
    const { title, checked } = this.state;
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.head}>
          <Image source={require('@/assets/com/logo.png')} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.body}>
          <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
            {({ values, handleChange, handleBlur, handleSubmit }) => {
              return (
                <View>
                  <FormItem style={styles.formItem}>
                    <InputMobile
                      placeholder="手机号"
                      value={values.mobile}
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                    />
                  </FormItem>
                  <FormItem style={styles.formItem}>
                    <InputPassword
                      placeholder="密码"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                  </FormItem>
                  <FormItem>
                    <View style={styles.remeber}>
                      <View style={styles.check}>
                        <CheckBox
                          label="记住帐号"
                          checked={checked}
                          onClick={this.toggleRemeber}
                        />
                      </View>
                      <View style={styles.desc}>
                        <Text style={styles.link} onPress={this.toReset}>
                          忘记密码
                        </Text>
                      </View>
                    </View>
                  </FormItem>
                  <Button title="登录" type="primary" onPress={handleSubmit} />
                </View>
              );
            }}
          </Formik>
        </View>

        <View style={styles.foot}>
          <Touchable onPress={this.goRegister}>
            <Text style={styles.link}>注册新帐号</Text>
          </Touchable>
          <Touchable onPress={this.goBack}>
            <Text style={styles.link}>返回</Text>
          </Touchable>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 100,
    position: 'relative'
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
  remeber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...layout.margin(20, 0, 0, 0)
  },
  check: {
    width: '50%',
    height: 30,
    justifyContent: 'center'
  },
  desc: {
    height: 30,
    justifyContent: 'center'
  },
  btn: {
    ...layout.margin(20, 0, 0, 0)
  },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...layout.margin(20, 0, 0, 0)
  },
  link: {
    color: '#1890ff'
  }
});

export default connector(Login);
