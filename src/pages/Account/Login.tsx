import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '@/models/index';
import { Navigator, Validator, Encrypt } from '@/utils/index';
import { layout } from '@/theme/index';
import Touchable from '@/components/Touchable';
import Button from '@/components/Button';

import { createForm, ValidateErrors, WrappedFormMethods } from 'rc-form';
import {
  FormItem,
  InputMobile,
  InputPassword,
  CheckBox
} from '@/components/Form/index';
import { IResponse } from '@/types/CommonTypes';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  form: WrappedFormMethods;
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

  // 手机号
  mobileCallback = (value: string, err?: string) => {
    if (err) {
      this.props.form.setFields({
        mobile: {
          value: value,
          errors: [new Error(err)]
        }
      });
    } else {
      this.props.form.setFieldsValue({ mobile: value });
    }
  };

  // 密码
  passwordCallback = (value: string, err?: string) => {
    if (err) {
      this.props.form.setFields({
        password: {
          value: value,
          errors: [new Error(err)]
        }
      });
    } else {
      this.props.form.setFieldsValue({ password: value });
    }
  };

  submit = () => {
    this.props.form.validateFields((error: ValidateErrors, values: any) => {
      if (error) return;
      if (values.password) {
        values.password = Encrypt(values.mobile, values.password);
      }
      if (values.smscode) {
        values.smscode = Encrypt(values.mobile, values.smscode);
      }
      values.loginType = this.state.loginType;
      this.onLogin(values);
    });
  };

  onLogin = (values: any) => {
    this.props.dispatch({
      type: 'account/login',
      payload: values,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Navigator.goBack();
        } else {
          this.props.form.setFields({
            [res.error_key]: {
              value: '',
              errors: [new Error(res.message)]
            }
          });
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
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldError,
      getFieldsError
    } = this.props.form;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <Image source={require('@/assets/com/logo.png')} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.body}>
          <FormItem style={styles.formItem}>
            {getFieldDecorator('mobile', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: '请输入手机号' },
                { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
              ]
            })(
              <InputMobile
                placeholder="手机号"
                error={getFieldError('mobile')}
                callback={this.mobileCallback}
              />
            )}
          </FormItem>

          <FormItem style={styles.formItem}>
            {getFieldDecorator('password', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: '请输入密码' },
                { min: true, message: '密码不能小于6位' },
                { max: true, message: '密码不能大于20位' }
              ]
            })(
              <InputPassword
                placeholder="密码"
                error={getFieldError('password')}
                callback={this.passwordCallback}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('remeber', {
              valuePropName: 'checked',
              initialValue: checked
            })(
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
            )}
          </FormItem>

          <View style={styles.btn}>
            <Button
              title="登录"
              type="primary"
              onPress={this.submit}
              // disabled={
              //   Validator.hasErrors(getFieldsError()) ||
              //   !getFieldValue('mobile') ||
              //   !getFieldValue('password')
              // }
            />
          </View>
        </View>

        <View style={styles.foot}>
          <Touchable onPress={this.goRegister}>
            <Text style={styles.link}>注册新帐号</Text>
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
    alignItems: 'flex-start',
    ...layout.margin(20, 0, 0, 0)
  },
  link: {
    color: '#1890ff'
  }
});

export default connector(createForm<IProps>()(Login));
